import Component from "./Component";
import cookies from '../services/cookies';

import {MODAL_CLOSE_BUTTON_IDENTIFIER} from '../config/modalCloseButton.config';
import {
    dispatch,
    SET_VISIBILITY_SCOPE_TO_COOKIE_BAR,
    SET_VISIBILITY_SCOPE_TO_NONE
} from '../state';
import {COOKIE_MODAL_VISIBILITY_SCOPE} from '../state/state.config';

class CloseCookieModalButton extends Component {
    constructor({configuration}) {
        super({
            identifier: MODAL_CLOSE_BUTTON_IDENTIFIER,
            configuration,
            eventListeners: {
                click: 'closeCookieModal'
            }
        });
    }

    closeCookieModal() {
        dispatch((this.configuration.isOnCookiePage || typeof cookies.getKmccCookies() !== 'undefined') ? SET_VISIBILITY_SCOPE_TO_NONE : SET_VISIBILITY_SCOPE_TO_COOKIE_BAR);
    }
}

export default CloseCookieModalButton;