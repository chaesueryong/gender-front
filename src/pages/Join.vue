<template>
    <div class="join center_box">
        <div class="join_wrap">
            <div class="join_text">회원가입</div>
            <div class="join_bar"></div>
            <Agree v-if="step === '0'" />
            <Email v-else-if="step === '1'" />
            <InputJoin v-else-if="step === '2' && id !== undefined" />
            <Agree v-else />
        </div>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted} from 'vue';
import Agree from "../containers/Join/Agree.vue";
import Email from "../containers/Join/Email.vue";
import InputJoin from "../containers/Join/InputJoin.vue";
import {useStore} from "vuex";
import Auth from "../api/Auth";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { step, id } = route.params;


const verifyJoinToken = async (token) => {
    try {
        const {user_email} = await Auth.verifyToken(token);

        // 이메일 저장
        store.commit('userStore/setUserJoinEmail', user_email);
    } catch (e) {
        await router.push('/join/0');
        alert(e);
    }
}

onMounted(() => {
    if(step === '2' && id !== undefined){
        verifyJoinToken(id);
    } else if(step === '2'){
        router.push('/join/0');
    }
});


</script>

<style>
.join {

}

.join_text {
    color: black;
    font-weight: bold;
    font-size: 32px;
}

.join_bar {
    margin: 10px 0;
    border-bottom: 1px solid grey;
}
</style>