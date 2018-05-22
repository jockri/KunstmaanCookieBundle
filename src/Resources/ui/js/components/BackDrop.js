import Component from "./Component";
import cookies from '../services/cookies';

import { KEYCODE_ESCAPE } from '../config/keycodes.config';
import {
    BACKDROP_IDENTIFIER,
    CLASSES
} from "../config/backdrop.config"
import {
    dispatch,
    select,
    SET_VISIBILITY_SCOPE_TO_COOKIE_BAR,
    SET_VISIBILITY_SCOPE_TO_NONE,
    SELECT_VISIBILITY_SCOPE
} from '../state';
import {
    COOKIE_MODAL_VISIBILITY_SCOPE,
    COOKIE_MODAL_VISIBILITY_SCOPE_DETAIL
} from '../state/state.config';

class BackDrop extends Component {
    constructor({configuration}) {
        super({
            identifier: BACKDROP_IDENTIFIER,
            configuration: Object.assign(configuration, {
                visibilityScopes: {
                    [COOKIE_MODAL_VISIBILITY_SCOPE]: [CLASSES.VISIBLE],
                    [COOKIE_MODAL_VISIBILITY_SCOPE_DETAIL]: [CLASSES.VISIBLE]
                }
            }),
            eventListeners: {
                click: 'backToBasicModal'
            }
        });

        this.backToBasicModalBound = this.backToBasicModal.bind(this);
    }

    addAllEventListeners() {
        let {visibilityScope} = select(SELECT_VISIBILITY_SCOPE);
        if (!this.hasEventsConfigured && Object.keys(this.configuration.visibilityScopes).indexOf(visibilityScope) >= 0) {
            super.addAllEventListeners();

            window.addEventListener('keyup', this.backToBasicModalBound);
            this.hasEventsConfigured = true;
        }
    }

    removeAllEventListeners() {
        super.removeAllEventListeners();

        window.removeEventListener('keyup', this.backToBasicModalBound);
        this.hasEventsConfigured = false;
    }

    backToBasicModal(e) {
        if ((e.type === 'keyup' && e.keyCode === KEYCODE_ESCAPE) || e.type === 'click') {
            dispatch((this.configuration.isOnCookiePage || typeof cookies.getKmccCookies() !== 'undefined') ? SET_VISIBILITY_SCOPE_TO_NONE : SET_VISIBILITY_SCOPE_TO_COOKIE_BAR);
        }
    }
}

export default BackDrop;
