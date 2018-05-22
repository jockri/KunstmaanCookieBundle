<?php

namespace Kunstmaan\CookieBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class CookieAdminType
 *
 * @package Kunstmaan\CookieBundle\Form
 */
class CookieConfigType extends AbstractType
{
    /**
     * Builds the form.
     *
     * This method is called for each type in the hierarchy starting form the
     * top most type. Type extensions can further modify the form.
     *
     * @see FormTypeExtensionInterface::buildForm()
     *
     * @param FormBuilderInterface $builder The form builder
     * @param array                $options The options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
            'clientIpAddresses',
            TextType::class,
            [
                'required' => false,
                'label' => 'kuma.cookie.config.client_ip',
            ]
        );
        $builder->add(
            'internalIpAddresses',
            TextType::class,
            [
                'required' => false,
                'label' => 'kuma.cookie.config.internal_ip',
            ]
        );
        $builder->add(
            'cookieBundleEnabled',
            CheckboxType::class,
            [
                'required' => false,
                'label' => 'kuma.cookie.config.enabled',
            ]
        );
    }

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getBlockPrefix()
    {
        return 'kunstmaancookiebundle_cookie_config';
    }
}
