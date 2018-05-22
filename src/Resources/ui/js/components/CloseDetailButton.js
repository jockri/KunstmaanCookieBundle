import Component from './Component';
import {dispatch, SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PREFERENCES} from '../state';

import {CLOSE_DETAIL_BUTTON_IDENTIFIER} from '../config/closeDetailButton.config';
import {COOKIE_MODAL_VISIBILITY_SCOPE_DETAIL} from '../state/state.config';


class CloseDetailButton extends Component {
    constructor() {
        super({
            identifier: CLOSE_DETAIL_BUTTON_IDENTIFIER,
            eventListeners: {
                click: 'handleCloseDetail'
            }
        })
    }

    handleCloseDetail(e) {

        e.preventDefault();
        dispatch(SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PREFERENCES);
    }
}

export default CloseDetailButton;