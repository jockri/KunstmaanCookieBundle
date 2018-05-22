import {post} from './xhr';
import datalayers from './datalayers';
import {select, SELECT_COOKIE_SETTINGS} from '../state';

const COOKIE_NAME = 'legal_cookie';

class cookies {
    static get() {
        let cookies = {};
        document.cookie.split(';')
            .map((line) => {
                let [key, value] = line.split('=');
                cookies[key.trim()] = decodeURIComponent(value);
            });

        return cookies;
    }

    static getKmccCookies() {
        let cookieString = cookies.get()[COOKIE_NAME];
        return typeof cookieString !== 'undefined' ? JSON.parse(cookieString).cookies : undefined;
    }

    static hasAllowedDataLayers() {
        let kmccCookies = cookies.getKmccCookies();
        return typeof kmccCookies !== 'undefined' ? kmccCookies['analyzing_cookie'] : false;
    }

    static toggleAll(url) {
        return post(url).then(() => { // TODO: Why the post? What does this do?
            cookies.sendActivateCookiesEventToGTM();
        });
    }

    static toggleSome(url, data) {
        let dataString = '';
        Object.keys(data).forEach((key, i) => {
            if (i>0) {
                dataString += '&';
            }
            dataString += `${key}=${data[key]}`;
        });

        return post(url, dataString).then(() => {
            cookies.sendActivateCookiesEventToGTM();
        })
    }

    static sendActivateCookiesEventToGTM() {
        // This is an object of the form: {"cookies":{"functional_cookie":"true","analyzing_cookie":"true","marketing_cookie":"true"}}
        // all of these subcookies need ot be sent to GA to activate the responding cookies.
        const legalCookieContent = cookies.get().hasOwnProperty(COOKIE_NAME) ? JSON.parse(cookies.get()[COOKIE_NAME]).cookies : select(SELECT_COOKIE_SETTINGS);
        datalayers.sendEnableCookieEvent(legalCookieContent);
    }
}

export default cookies;