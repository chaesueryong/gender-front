import BoardApi from "../api/Board";
import router from "../router";
import axios from "axios";

export default {
    namespaced: true,
    state: () => (
        {
            boardList: [],
            renderPage: 1,
            startPage: 1,
            endPage: 1,
            boardInfo: {
                id: 0,
                board_contents: "",
                board_good_list: [],
                board_good_count: 0,
                board_bad_list: [],
                board_bad_count: 0,
                board_report_list: [],
                board_report_count: 0,
                board_status: true,
                board_title: "",
                board_type: "",
                board_view_count: 0,
                createdAt: "",
                updatedAt: "",
                user: {
                    user_email: "",
                    user_gender: "",
                    user_id: "",
                    user_nickname: "",
                    user_profile: null,
                    userStatus: {
                        user_status_level: 0,
                        user_status_point: 0,
                        user_status_suspension: null,
                        user_status_withdrawal: false
                    }
                }
            }
        }
    ),
    getters: {
    },
    mutations: {
        setBoardList(state, value) {
            state.boardList = value;
        },

        setRenderPage(state, value) {
            state.renderPage = value;
        },

        setStartPage(state, value) {
            state.startPage = value;
        },

        setEndPage(state, value) {
            state.endPage = value;
        },

        setBoardInfo(state, value) {
            state.boardInfo = value;
        },

    },
    actions: {
        getBoardList: async ({state, commit}, payload) => {
            try {
                const { clickedPage } = payload;

                const { boardList, startPage, endPage, renderPage } = await BoardApi.getBoardList(state.boardType, clickedPage);

                commit('setBoardList', boardList);

                commit('setRenderPage', renderPage);

                commit('setStartPage', startPage);
                commit('setEndPage', endPage);

            } catch (e) {
                console.error(e)
                alert(e)
            }
        },

        getBoardInfo: async ({commit}, payload) => {
            try {
                const { board_number } = payload;

                const { board } = await BoardApi.getBoard(board_number);
                const board_contents = await axios.get(board.board_contents_url);

                commit('setBoardInfo', { board_contents: board_contents.data, ...board});
            } catch (e) {
                console.error(e)
            }
        },

        // eslint-disable-next-line no-unused-vars
        saveBoard: async ({store, dispatch, commit }, payload) => {
            try {
                const { type, title, contents } = payload;

                await BoardApi.saveBoard(type, title, contents);

                await router.push(`/community?board=1&page=0`);
            } catch (e) {
                switch (e){
                    case 'expired accessToken':
                        // 리프레시 토큰 확인하고 다시 요청
                        store.commit('userStore/setDefaultData');
                        alert('다시 로그인 해주세요');
                        break;
                }
                console.log(e);
            }
        },

        // eslint-disable-next-line no-unused-vars
        evaluateBoard: async ({ commit, dispatch }, payload) => {
            try {
                const { evaluateType } = payload;

                const board_number = router.currentRoute.value.query.no;

                await BoardApi.evaluateBoard(board_number, evaluateType);

                dispatch('getBoardInfo', {board_number});
            } catch (e) {
                console.error(e)
                alert(e)
            }
        },

    }
}