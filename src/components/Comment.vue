<template>
    <div class="comment">
        <div class="comment_wrap">

            <div style="width: 20%; font-weight: 1000; font-size: 14px; color: #1A4C89">{{ props.info.user.user_nickname }}</div>

            <div style="flex: 1; min-width: 0;">
                <div style="font-size: 14px">
                    <span v-html="props.info.reply_content"></span>
                    <span v-if="props.info.best" style="margin: 0 10px; padding: 1px 3px; white-space: nowrap; background-color: orange">베스트 댓글</span>
                    <span v-show="props.best === false" style="margin-left: 10px; color: orange; cursor: pointer;" @click="selectReply">답글</span>
                </div>
                <div style="font-size: 14px; color: grey">
                    <span>{{props.info.createdAt}} </span>

                    <span></span>
                    <span> | </span>
                    <span>신고</span>
                </div>
            </div>

            <div v-if="!props.best" style="display: flex; justify-content: center; font-size: 16px">
                <div class="comment-evaluate-good" @click="evaluateReply('good')" style="align-self: flex-start; padding: 7px 15px; font-size: 14px; background-color: greenyellow; color: white; margin: 0 10px">추천 {{props.info.reply_good_list.length}}</div>
                <div class="comment-evaluate-bad" @click="evaluateReply('bad')" style="align-self: flex-start; padding: 7px 15px; font-size: 14px; background-color: grey; color: white; margin: 0 10px">비추 {{props.info.reply_bad_list.length}}</div>
            </div>

        </div>
    </div>

    <SubReplyInputBox :replyId="props.info.id"/>

<!--    베플에 랜더링된 애들은 서브리플 랜더링 방지-->
    <div v-if="props.best === false">
        <SubComment v-for="(item, index) in subReplies" :key="index" :parentReplyId="props.info.id" :info="item" ></SubComment>
    </div>

</template>

<script setup>
import {computed, defineProps} from "vue";
import {useStore} from "vuex";
import SubComment from "./SubComment";
import SubReplyInputBox from "./SubReplyInputBox";

const store = useStore();
const userAccessToken = computed(() => store.state.userStore.userAccessToken);
const storeSelectedReplyId = computed(() => store.state.replyStore.selectedReplyId);

const props = defineProps({
    info: Object,
    best: Boolean,
    allReply: Array
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
    const replyId = props.info.id;
    const parentReplyDepth = props.info.reply_depth;

    if(userAccessToken.value === ''){
        store.commit('replyStore/setParentReplyId', undefined);
        store.commit('replyStore/setSelectedReplyId', undefined);
        store.commit('replyStore/setReplyDepth', 0);
        alert('로그인 해주세요');
        return;
    }

    if(props.info.id === storeSelectedReplyId.value){
        store.commit('replyStore/setParentReplyId', undefined);
        store.commit('replyStore/setSelectedReplyId', undefined);
        store.commit('replyStore/setReplyDepth', 0);
        return;
    }

    store.commit('replyStore/setParentReplyId', replyId);
    store.commit('replyStore/setSelectedReplyId', replyId);
    store.commit('replyStore/setReplyDepth', parentReplyDepth + 1);
}

const subReplies = computed(() => {
    let renderSubReplies = [];

    for(let i = 0; i < props.info.reply_sub_list.length; i++){
        for(let j = 0; j < props.allReply.length; j++){
            if(props.info.reply_sub_list[i] === props.allReply[j].id){
                renderSubReplies.push(props.allReply[j]);
            }
        }
    }

    return renderSubReplies;
})
</script>


<style>
.comment {

}

.comment_wrap {
    display: flex;
    align-items: start;
    padding: 10px;
}

.comment_wrap:nth-child(2n-1) {
    /*background-color: #1A4C89;*/
}

.comment-evaluate-good {
    cursor: pointer;
}

.comment-evaluate-bad {
    cursor: pointer;
}

</style>