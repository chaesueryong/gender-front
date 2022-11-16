<template>
    <div class="sub_comment">
        <div class="sub_comment_wrap">

            <div style="margin-right: 20px">-></div>

            <div style="width: 20%; font-weight: 1000; font-size: 14px; color: #1A4C89">{{ props.info.user.user_nickname }}</div>

            <div style="flex: 1; min-width: 0;">
                <div style="font-size: 14px">
                    <span v-html="props.info.reply_content"></span>
                    <span v-if="props.info.best" style="margin: 0 10px; padding: 1px 3px; white-space: nowrap; background-color: orange">베스트 댓글</span>
                    <span style="margin-left: 10px; color: orange; cursor: pointer;" @click="selectReply">답글</span>
                </div>
                <div style="font-size: 12px; color: grey">
                    <span>{{props.info.createdAt}} </span>

                    <span></span>
                    <span> | </span>
                    <span>신고</span>
                </div>
            </div>

            <div style="display: flex; justify-content: center; font-size: 16px">
                <div class="sub_comment-evaluate-good" @click="evaluateReply('good')" style="align-self: flex-start; padding: 7px 15px; font-size: 14px; background-color: greenyellow; color: white; margin: 0 10px">추천 {{props.info.reply_good_list.length}}</div>
                <div class="sub_comment-evaluate-bad" @click="evaluateReply('bad')" style="align-self: flex-start; padding: 7px 15px; font-size: 14px; background-color: grey; color: white; margin: 0 10px">비추 {{props.info.reply_bad_list.length}}</div>
            </div>

        </div>
    </div>

    <SubReplyInputBox :replyId="props.info.id"/>

</template>

<script setup>
import {computed, defineProps} from "vue";
import {useStore} from "vuex";
import SubReplyInputBox from "./SubReplyInputBox";

const store = useStore();
const userAccessToken = computed(() => store.state.userStore.userAccessToken);
const storeSelectedReplyId = computed(() => store.state.replyStore.selectedReplyId);

const props = defineProps({
    info: Object,
    best: Boolean,
    parentReplyId: Number
})

const evaluateReply = (evaluateType) => {
    if(userAccessToken.value === '') {
        alert('로그인 해주세요');
        return;
    }

    store.dispatch('replyStore/evaluateReply', {
        reply_number: props.info.id,
        evaluateType: evaluateType
    })
}

const selectReply = () => {
    const seletedReplyId = props.info.id;
    const parentReplyId = props.parentReplyId;
    const replyDepth = props.info.reply_depth;

    if(userAccessToken.value === ''){
        store.commit('replyStore/setParentReplyId', undefined);
        store.commit('replyStore/setSelectedReplyId', undefined);
        store.commit('replyStore/setReplyDepth', 0);
        alert('로그인 해주세요');
        return;
    }

    if(seletedReplyId === storeSelectedReplyId.value){
        store.commit('replyStore/setParentReplyId', undefined);
        store.commit('replyStore/setSelectedReplyId', undefined);
        store.commit('replyStore/setReplyDepth', 0);
        return;
    }

    store.commit('replyStore/setParentReplyId', parentReplyId);
    store.commit('replyStore/setSelectedReplyId', seletedReplyId);
    store.commit('replyStore/setReplyDepth', replyDepth);
}

</script>


<style>
.sub_comment {

}

.sub_comment_wrap {
    display: flex;
    padding: 10px 10px 10px 20px;
    justify-content: space-between;
}

.sub_comment-evaluate-good {
    cursor: pointer;
}

.sub_comment-evaluate-bad {
    cursor: pointer;
}


</style>