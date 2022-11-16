<template>
    <div class="email">
        <div class="email_wrap">
            <div style="margin: 0 0 15px 0">이메일 인증</div>
            <div style="margin: 0 0 15px 0">
                <input v-model="emailId" placeholder="아이디"/>
                <span style="margin: 0 0 5px 0">@</span>
                <select v-model="emailHost">
                    <option value="naver.com">naver.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                </select>
            </div>
            <div style="margin: 0 0 5px 0">입력하신 이메일 주소로 가입 인증 메일을 발송합니다.</div>
            <div style="margin: 0 0 30px 0">올바른 이메일 주소 입력 후 발송된 메일의 지침에 따라 다음단계를 진행해주세요.</div>
            <button @click="sendJoinEmail">인증번호 전송</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const emailId = ref('');
const emailHost = ref('naver.com');

const sendJoinEmail = () => {
    if (emailId.value === ''){
        alert('아이디를 입력해주세요');
        return;
    }

    store.dispatch('userStore/sendJoinEmail', {
        emailId: emailId.value,
        emailHost: emailHost.value
    })

}
</script>

<style>
.email {
    border: 1px solid black;
    padding: 40px;
    box-sizing: border-box;
}

.email_wrap {
    margin-left: 10px;
}

.email_box {
    width: 50%;
    height: 100px;
    border: 1px solid black;
}
</style>