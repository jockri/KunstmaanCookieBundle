import {
    COOKIE_BAR_VISIBILITY_SCOPE,
    COOKIE_MODAL_VISIBILITY_SCOPE,
    NOTIFICATION_VISIBILITY_SCOPE,
    VISIBILITY_SCOPE_NONE,
    TAB_SCOPE_PREFERENCES,
    TAB_SCOPE_PRIVACY,
    COOKIE_MODAL_VISIBILITY_SCOPE_DETAIL,
    TAB_SCOPE_CONTACT
} from './state.config';

export const SET_VISIBILITY_SCOPE_TO_NONE = 'SET_VISIBILITY_SCOPE_TO_NONE';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_BAR = 'SET_VISIBILITY_SCOPE_TO_COOKIE_BAR';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL = 'SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PRIVACY = 'SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PRIVACY';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PREFERENCES = 'SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_COOKIE_PREFERENCES';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_CONTACT = 'SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_CONTACT';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_DETAIL = 'SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_DETAIL';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PRIVACY = 'SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PRIVACY';
export const SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PREFERENCES = 'SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PREFERENCES';
export const SET_VISIBILITY_SCOPE_TO_NOTIFICATION = 'SET_VISIBILITY_SCOPE_TO_NOTIFICATION';
export const UPDATE_COOKIE_SETTING_VALUE = 'UPDATE_COOKIE_SETTING_VALUE';
export const LOAD_COOKIE_VALUE_TO_STATE = 'LOAD_COOKIE_VALUE_TO_STATE';
export const SET_TAB_SCOPE_PREFERENCES = 'SET_TAB_SCOPE_PREFERENCES';
export const SET_TAB_SCOPE_PRIVACY = 'SET_TAB_SCOPE_PRIVACY';
export const SET_TAB_SCOPE_CONTACT = 'SET_TAB_SCOPE_CONTACT';

export const SELECT_COOKIE_SETTINGS = 'SELECT_COOKIE_SETTINGS';
export const SELECT_VISIBILITY_SCOPE = 'SELECT_VISIBILITY_SCOPE';
export const SELECT_COOKIE_MODAL_DETAIL_CONTENT = 'SELECT_COOKIE_MODAL_DETAIL_CONTENT';
export const SELECT_TAB_SCOPE = 'SELECT_TAB_SCOPE';

const listeners = [];
// Todo: reload after initial set.
let state = {
    visibilityScope: COOKIE_BAR_VISIBILITY_SCOPE,
    tabScope: TAB_SCOPE_PRIVACY,
    cookieModalDetailPageContent: null,
    cookieSettings: { // names where given by backend.
        functional_cookie: true,
        analyzing_cookie: false,
        marketing_cookie: false
    }
};

const stateActions = {
    [SET_VISIBILITY_SCOPE_TO_NONE]: () => {
        return Object.assign(state, {visibilityScope: VISIBILITY_SCOPE_NONE});
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_BAR]: () => {
        return Object.assign(state, {visibilityScope: COOKIE_BAR_VISIBILITY_SCOPE});
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL]: () => {
        return Object.assign(state, {visibilityScope: COOKIE_MODAL_VISIBILITY_SCOPE});
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PREFERENCES]: () => {
        return Object.assign(state, {
            visibilityScope: COOKIE_MODAL_VISIBILITY_SCOPE,
            tabScope: TAB_SCOPE_PREFERENCES
        });
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_PRIVACY]: () => {
        return Object.assign(state, {
            visibilityScope: COOKIE_MODAL_VISIBILITY_SCOPE,
            tabScope: TAB_SCOPE_PRIVACY
        });
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_CONTACT]: () => {
        return Object.assign(state, {
            visibilityScope: COOKIE_MODAL_VISIBILITY_SCOPE,
            tabScope: TAB_SCOPE_CONTACT
        });
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_MODAL_DETAIL]: ({content}) => {
        return Object.assign(state, {
            visibilityScope: COOKIE_MODAL_VISIBILITY_SCOPE_DETAIL,
            cookieModalDetailPageContent: content
        });
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PRIVACY]: () => {
        return Object.assign(state, {
            visibilityScope: VISIBILITY_SCOPE_NONE,
            tabScope: TAB_SCOPE_PRIVACY
        });
    },
    [SET_VISIBILITY_SCOPE_TO_COOKIE_PAGE_PREFERENCES]: () => {
        return Object.assign(state, {
            visibilityScope: VISIBILITY_SCOPE_NONE,
            tabScope: TAB_SCOPE_PREFERENCES
        });
    },
    [SET_VISIBILITY_SCOPE_TO_NOTIFICATION]: () => {
        return Object.assign(state, {visibilityScope: NOTIFICATION_VISIBILITY_SCOPE});
    },
    [UPDATE_COOKIE_SETTING_VALUE]: ({type, value}) => {
        return Object.assign(state, {cookieSettings: Object.assign(state.cookieSettings, {[type]: value})});
    },
    [LOAD_COOKIE_VALUE_TO_STATE]: (payload) => {
        return Object.assign(state, {cookieSettings: payload});
    },
    [SET_TAB_SCOPE_CONTACT]: () => {
        return Object.assign(state, {tabScope: TAB_SCOPE_CONTACT});
    },
    [SET_TAB_SCOPE_PREFERENCES]: () => {
        return Object.assign(state, {tabScope: TAB_SCOPE_PREFERENCES});
    },
    [SET_TAB_SCOPE_PRIVACY]: () => {
        return Object.assign(state, {tabScope: TAB_SCOPE_PRIVACY});
    }
};

const selectActions = {
    [SELECT_COOKIE_SETTINGS]: () => {
        return Object.assign({}, state.cookieSettings);
    },
    [SELECT_VISIBILITY_SCOPE]: () => {
        return Object.assign({}, {visibilityScope: state.visibilityScope});
    },
    [SELECT_COOKIE_MODAL_DETAIL_CONTENT]: () => {
        return Object.assign({}, {cookieModalDetailPageContent: state.cookieModalDetailPageContent});
    },
    [SELECT_TAB_SCOPE]: () => {
        return Object.assign({}, {tabScope: state.tabScope});
    }
}

export function dispatch(action, payload) {
    if (stateActions.hasOwnProperty(action)) {
        state = stateActions[action](payload);
        // console.log('New state:', state);
        broadcast();
    } else {
        throw new Error('Action dispatched was not configured as a state action.');
    }
}

export function select(selector) {
    if (selectActions.hasOwnProperty(selector)) {
        return selectActions[selector]();
    } else {
        throw new Error('Selector was not available as a select action.');
    }
}

export function listen(callback) {
    listeners.push(callback);
    broadcast(); // To get an initial state in all components
}

function broadcast() {
    listeners.forEach(callback => {
        callback(state);
    });
}