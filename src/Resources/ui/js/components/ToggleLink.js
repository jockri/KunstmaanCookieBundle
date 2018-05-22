import Component from "./Component";
import {get} from '../services/xhr';

import {dispatch, SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_DETAIL} from '../state';
import {COOKIE_MODAL_VISIBILITY_SCOPE} from '../state/state.config';
import {TOGGLE_LINK_IDENTIFIER} from '../config/toggleLink.config';

class ToggleLink extends Component {
    constructor({vdom}) {
        super({
            vdom,
            eventListeners: {
                click: 'handleShowDetailView'
            }
        });
        
        this.detailContent = this.loadRespondingContent();
    }

    loadRespondingContent() {

        return new Promise((resolve, reject) => {
            if (this.vdom.hasAttribute('href')) {
                let detailContentUrl = this.vdom.href;
                get(detailContentUrl).then((res) => {
                    resolve(res.response);
                });
            } else {
                reject('No href attribute specified.');
            }
        });
    }

    handleShowDetailView(e) {
        e.preventDefault();
        
        this.detailContent.then((content) => {        
            dispatch(SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_DETAIL, {content});
        }).catch((e) => {
            throw new Error(e);
        });
    }
}

export default ToggleLink;