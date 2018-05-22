<?php

namespace Kunstmaan\CookieBundle\Helper;

use Doctrine\ORM\EntityManagerInterface;
use Kunstmaan\CookieBundle\Entity\CookieLog;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class LegalCookieHelper
 */
class LegalCookieHelper
{
    const LEGAL_COOKIE_NAME = 'legal_cookie';

    const FUNCTIONAL_COOKIE_NAME = 'functional_cookie';

    /** @var array */
    private $legalCookie;

    /** @var EntityManagerInterface */
    private $em;

    /** @var string */
    private $adminFirewallName;

    /**
     * LegalCookieHelper constructor.
     *
     * @param EntityManagerInterface $em
     * @param string                 $adminFirewallName
     */
    public function __construct(EntityManagerInterface $em, $adminFirewallName)
    {
        $this->em = $em;
        $this->adminFirewallName = $adminFirewallName;
    }

    /**
     * @param Request $request
     *
     * @return array|mixed
     */
    public function findOrCreateLegalCookie(Request $request)
    {
        if (null === $this->legalCookie) {
            $cookies = [];
            if (!$request->cookies->has(self::LEGAL_COOKIE_NAME)) {
                $types = $this->em->getRepository('KunstmaanCookieBundle:CookieType')->findAll();
                foreach ($types as $type) {
                    if ($type->isAlwaysOn()) {
                        $cookies['cookies'][$type->getInternalName()] = 'true';
                    } else {
                        $cookies['cookies'][$type->getInternalName()] = 'undefined';
                    }
                }
            }
            $this->legalCookie = $request->cookies->get(self::LEGAL_COOKIE_NAME, json_encode($cookies));
        }

        return json_decode($this->legalCookie, true);
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getLegalCookie(Request $request)
    {
        if (null === $this->legalCookie) {
            $this->legalCookie = $request->cookies->get(self::LEGAL_COOKIE_NAME);
        }

        return json_decode($this->legalCookie, true)['cookies'];
    }

    /**
     * @param Request $request
     * @param array   $legalCookie
     *
     * @return Cookie
     */
    public function saveLegalCookie(Request $request, array $legalCookie)
    {
        $log = new CookieLog();
        $log->setIpAddress($request->getClientIp());
        $log->setCreated(new \DateTime('now'));

        $this->em->persist($log);
        $this->em->flush();

        $legalCookie['cookie_log_id'] = $log->getId();

        return new Cookie(
            self::LEGAL_COOKIE_NAME,
            json_encode($legalCookie),
            time() + (10 * 365 * 24 * 60 * 60),
            '/',
            null,
            $request->isSecure(),
            false
        );
    }

    /**
     * @param Request $request
     *
     * @return bool
     */
    public function isGrantedForCookieBundle(Request $request)
    {
        $authenticated = false;

        $cookieConfig = $this->em->getRepository('KunstmaanCookieBundle:CookieConfig')->find(1);
        $session = $request->getSession();

        if (null !== $cookieConfig) {
            if ($cookieConfig->isCookieBundleEnabled()) {
                return true;
            }
        }

        /** @var PostAuthenticationGuardToken $token */
        if ($session->has(sprintf('_security_%s', $this->adminFirewallName))) {
            $token = unserialize($session->get(sprintf('_security_%s', $this->adminFirewallName)));
            $authenticated = $token->isAuthenticated();
        }

        return $authenticated;
    }
}
