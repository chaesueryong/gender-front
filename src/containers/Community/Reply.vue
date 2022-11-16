<template>
    <div class="reply">
        <div class="reply_wrap">

            <div class="reply_best">
                <Comment v-for="(item, index) in replies.best" :key="index" :info="item" :best="true" />
            </div>

            <div class="reply_info">
                <span>댓글이 </span>
                <span style="font-weight: 1000; color: orange">{{replies.allReply.length}}</span>
                <span> 개 달렸습니다.</span>
            </div>

            <div class="reply_list">
                <Comment v-for="(item, index) in replies.common" :key="index" :info="item" :allReply="replies.allReply" :best="false" />
            </div>


            <ReplyInputBox v-show="userAccessToken !== ''"  />

        </div>
    </div>
</template>

<script setup>
import Comment from "../../components/Comment";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import ReplyInputBox from "../../components/ReplyInputBox";

const route = useRoute();
const store = useStore();
const userAccessToken = computed(() => store.state.userStore.userAccessToken);

const replies = computed(() => store.getters["replyStore/getReplyList"]);

onMounted(() => {
    if(route.query.no !== undefined) {
        store.dispatch('replyStore/getReplyList', {
            board_number: route.query.no
        })
    }
})

</script>


<style>
.reply {

}

.reply_wrap {

}

.reply_best {
    margin: 10px auto;
    border: 1px solid gray;
}

.reply_info {
    margin: 0 auto;
    border: 1px solid gray;
    padding: 10px;

    font-size: 14px;
}

.reply_list {
    margin: 0 auto 10px auto;
    border: 1px solid gray;
}

</style>