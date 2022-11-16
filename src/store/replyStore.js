import ReplyApi from "../api/Reply";
import router from "../router/index";

export default {
    namespaced: true,
    state: () => (
        {
            replyList: [],
            comment: '',
            parentReplyId: undefined,
            selectedReplyId: undefined,
            replyDepth: 0
        }
    ),
    getters: {
        getReplyList(state) {
            let replies = state.replyList;

            replies.sort((a, b) => b.reply_good_list.length - a.reply_good_list.length);

            let bestReplies = [];

            let bestCount = 0;
            for(let i = 0; i < replies.length; i++){
                if(replies[i].reply_good_list.length >= 1 && bestCount < 3){
                    bestReplies.push({
                        ...replies[i],
                        best: true
                    });
                    bestCount++;

                    replies[i] = {
                        ...replies[i],
                        best: true
                    };

                    continue;
                }

                replies[i] = {
                    ...replies[i],
                    best: false
                };
            }

            return {
                allReply: replies.sort((a, b) => a.id - b.id),
                common: replies.sort((a, b) => a.id - b.id).filter(e => e.reply_depth === 0),
                best: bestReplies
            };
        }
    },
    mutations: {
        setDefaultStatus(state) {
            state.comment = '';
            state.parentReplyId = undefined;
            state.selectedReplyId = undefined;
            state.replyDepth = 0;
        },

        setReplyList(state, value) {
            state.replyList = value;
        },

        setParentReplyId(state, value) {
            state.parentReplyId = value;
        },

        setSelectedReplyId(state, value) {
            state.selectedReplyId = value;
        },

        setComment(state, value) {
            state.comment = value;
        },

        setReplyDepth(state, value) {
            state.replyDepth = value;
        }
    },
    actions: {
        getReplyList: async ({commit}, payload) => {
            try {
                const { board_number } = payload;

                const { replyList } = await ReplyApi.getReplyList(board_number);

                commit('setReplyList', replyList);
            } catch (e) {
                console.error(e)
                alert(e)
            }
        },

        // eslint-disable-next-line no-unused-vars
        saveReply: async ({ state, commit, dispatch }) => {
            try {
                if(state.comment === ''){
                    alert('문자를 입력해주세요');
                    return;
                }

                const board_number = router.currentRoute.value.query.no;
                const comment = state.comment;
                const reply_depth = state.replyDepth;
                const parent_reply_id = state.parentReplyId;
                const prev_reply_id = state.selectedReplyId;

                await ReplyApi.writeReply(
                    board_number,
                    comment,
                    reply_depth,
                    parent_reply_id,
                    prev_reply_id
                );

                commit('setDefaultStatus');

                dispatch('getReplyList', {
                    board_number: board_number
                })

            } catch (e) {
                console.error(e)
                alert(e)
            }
        },

        // eslint-disable-next-line no-unused-vars
        evaluateReply: async ({ rootState, commit, dispatch }, payload) => {
            try {
                const { reply_number, evaluateType } = payload;

                await ReplyApi.evaluateReply(reply_number, evaluateType);

                dispatch('getReplyList', { board_number: rootState.boardStore.boardInfo.id });
            } catch (e) {
                console.error(e)
                alert(e)
            }
        },
    }
}