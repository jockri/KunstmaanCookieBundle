import Component from './Component';

import {dispatch, UPDATE_COOKIE_SETTING_VALUE} from '../state';
import {COOKIE_MODAL_VISIBILITY_SCOPE} from '../state/state.config';

class ToggleButton extends Component {
    constructor({vdom, configuration}) { // {configuration: {stateIdentifier: String}}
        super({
            vdom,
            configuration,
            eventListeners: {
                click: 'updateStateValueForToggle'
            }
        });
    }

    updateStateValueForToggle() {
        let value = this.vdom.checked;
        dispatch(UPDATE_COOKIE_SETTING_VALUE, {type: this.configuration.stateIdentifier, value});
    }
}

export default ToggleButton;