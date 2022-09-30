<template>
    <div class="board">
        <div class="board_wrap">

            <div class="board_top">
                <div style="display: flex; align-items: center; background-color: orange; padding: 5px 0; color: white">
                    <div style="font-size: 12px; margin: 0 10px">{{ boardInfo.id }}</div>
                    <div style="font-size: 16px; font-weight: 1000">{{ boardInfo.board_title }}</div>
                </div>
                <div style="display: flex; padding: 5px 0; background-color: #eeeeee">
                    <img style="width: 40px; height: 30px; margin: 0 10px 0 0; background-color: blue" src="">
                    <div style="flex: auto;">
                        <div style="display: flex; justify-content: space-between; align-items: start">
                            <div style="flex: auto">{{boardInfo.user.user_nickname}}</div>

                            <div style="font-size: 10px; white-space: nowrap">
                                <span style="font-weight: 1000">DATE</span>
                                <span> : </span>
                                <span>{{ boardInfo.createdAt }}</span>

                                <span> / </span>

                                <span style="font-weight: 1000">READ</span>
                                <span> : </span>
                                <span>{{ boardInfo.board_view_count }}</span>
                            </div>

                        </div>
                        <div style="font-size: 12px;">
                            <span>Minerals</span>
                            <span> : </span>
                            <span>{{boardInfo.user.userStatus.user_status_point}}</span>

                            <span> / </span>

                            <span>Level</span>
                            <span> : </span>
                            <span>{{boardInfo.user.userStatus.user_status_level}}</span>

                        </div>
                    </div>
                </div>
                <div style="border-bottom: 1px solid orange"></div>
            </div>

            <div class="ad" style="margin: 20px auto; width: 700px; height: 100px; background-color: gray"></div>

            <div class="board_body" v-html="boardInfo.board_contents"></div>

            <div class="ad" style="margin: 20px auto ; width: 700px; height: 100px; background-color: gray"></div>

            <div class="board_bottom">
                <div style="display: flex; justify-content: center; margin: 20px auto; font-size: 16px">
                    <div class="evaluate-good" @click="evaluateBoard('good')" style="padding: 5px 15px; background-color: #2c4601; color: white; margin: 0 10px">추천 {{boardInfo.board_good_count}}</div>
                    <div class="evaluate-bad" @click="evaluateBoard('bad')" style="padding: 5px 15px; background-color: grey; color: white; margin: 0 10px">비추 {{boardInfo.board_bad_count}} </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const store = useStore();

const boardInfo = computed(() => store.state.boardStore.boardInfo)
const userAccessToken = computed(() => store.state.userStore.userAccessToken);

onMounted(() => {
    // 댓글 인덱스 초기화
    store.commit('replyStore/setParentReplyId', undefined);

    if(route.query.no !== undefined) {
        store.dispatch('boardStore/getBoardInfo', {
            board_number: route.query.no
        })
    }
})

const evaluateBoard = (evaluateType) => {
    if(userAccessToken.value === '') {
        alert('로그인 해주세요');
        return;
    }

    store.dispatch('boardStore/evaluateBoard', {
        evaluateType: evaluateType
    })
}

</script>


<style>
.board {
    border: 1px solid gray;
}

.board_wrap {
    width: 98%;
    margin: 10px auto;

}

.evaluate-good {
    cursor: pointer;
}

.evaluate-bad {
    cursor: pointer;
}
</style>