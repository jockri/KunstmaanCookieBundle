import {COLLAPSIBLE_CONTENT_IDENTIFIER} from '../config/collapsibleContent.config';
import {COOKIE_MODAL_TRIGGER_IDENTIFIER} from '../config/cookieModalTrigger.config';
import {TAB_IDENTIFIER} from '../config/tab.config';
import {TOGGLE_BUTTON_CLASS_IDENTIFIER} from '../config/toggleButton.config';
import {TOGGLE_LINK_IDENTIFIER} from '../config/toggleLink.config';

import CollapsibleContent from '../components/ToggleButton';
import CookieModalTrigger from '../components/CookieModalTrigger';
import Tab from '../components/Tab';
import ToggleButton from '../components/ToggleButton';
import ToggleLink from '../components/ToggleLink';

export default class AsyncDomInitiator {
    static init({nodeTree}) {
        if (!nodeTree instanceof HTMLElement) {
            throw new Error('Please send a HTMLElement to be analyzed and initialized.');
        }

        let identifiersAndComponentsMap = {
            [COLLAPSIBLE_CONTENT_IDENTIFIER]: CollapsibleContent,
            [COOKIE_MODAL_TRIGGER_IDENTIFIER]: CookieModalTrigger,
            [TAB_IDENTIFIER]: Tab,
            [TOGGLE_BUTTON_CLASS_IDENTIFIER]: ToggleButton,
            [TOGGLE_LINK_IDENTIFIER]: ToggleLink
        };
        
        let identifiersArray = Object.keys(identifiersAndComponentsMap).map((key) => key);
        identifiersArray.forEach((identifier) => {
            // Check if element itself has class.
            if (nodeTree.classList.contains(identifier)) {

                identifiersAndComponentsMap[identifier]({vdom: nodeTree});
            }

            // Check if subtree has class that needs to be initialized.
            let uninitializedComponents = Array.prototype.slice.call(nodeTree.querySelectorAll(identifier));

            if (uninitializedComponents !== null || uninitializedComponents.length > 0) {
                for (let i = 0; i < uninitializedComponents.length; i++) {
                    new identifiersAndComponentsMap[identifier]({vdom: uninitializedComponents[i]}); // This is actually a class.
                }
            }
        });
    }
}