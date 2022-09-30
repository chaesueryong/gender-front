import {createStore} from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import userStore from "./userStore";
import stateStore from "./stateStore";
import boardStore from "./boardStore";
import replyStore from "./replyStore";

export default createStore({
    // plugins: [
    //     createPersistedState({
    //         paths: ['stateStore']
    //     })
    // ],
    modules: {
        stateStore,
        userStore,
        boardStore,
        replyStore
    }
})
