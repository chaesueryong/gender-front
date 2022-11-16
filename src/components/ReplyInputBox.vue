<template>
    <div class="reply_input">
        <div class="reply_input_wrap">
            <div style="font-weight: 1000; color: #1A4C89; white-space: nowrap">{{userInfo.user_nickname}}</div>
            <textarea v-model="comment" style="flex: auto; margin: 0 20px; resize: vertical"></textarea>
            <div style="display: flex; flex-direction: column; gap: 10px">
                <button @click="saveReply">댓글입력</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref} from "vue";

const store = useStore();
const comment = ref('');
const userInfo = computed(() => store.state.userStore.userInfo);

const saveReply = () => {
    store.commit('replyStore/setComment', comment.value.replaceAll(/(\n|\r\n)/g, "<br>"))
    comment.value = '';
    store.commit('replyStore/setReplyDepth', 0);

    store.dispatch('replyStore/saveReply')
}

</script>


<style>
.reply_input {

}

.reply_input_wrap {
    display: flex;
    min-height: 100px;
    margin: 0 auto;
    border: 1px solid gray;
    padding: 10px;

    font-size: 14px;
}

</style>