<template>
    <div class="user_bar">
        <div class="user_bar_wrap">

            <div class="user_info_bar" v-if="userAccessToken !== '' ? true : false">
                <div style="margin-right: 5px">Lv.</div>
                <div style="margin-right: 15px">{{ userInfo.userStatus.user_status_level }}</div>
                <div style="margin-right: 20px">
                    {{userInfo.user_nickname}}
                </div>

                <button style="margin-right: 10px">마이페이지</button>
                <button @click="logout">로그아웃</button>
            </div>

            <div v-else class="login_bar">
                <input style="width: 150px; margin-left: 30px" v-model="userId" placeholder="아이디"/>
                <input style="width: 150px; margin-left: 10px" v-model="userPassword" placeholder="비밀번호"/>
                <button style="margin-left: 10px" @click="login">로그인</button>
                <input style="margin-left: 10px" type="checkbox"/>
                <div style="margin-left: 10px">자동로그인</div>
                <router-link style="margin-left: 10px" to="/join/0">
                    <button>회원가입</button>
                </router-link>
                <button style="margin-left: 10px">
                    <span>아이디</span>
                    /
                    <span>비밀번호 찾기</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const userId = ref('');
const userPassword = ref('');
const userInfo = computed(() => store.state.userStore.userInfo);
const userAccessToken = computed(() => store.state.userStore.userAccessToken);

onMounted(()=>{
    store.dispatch('userStore/persistLogin');
})

const login = () => {
    if(userId.value === '' || userPassword.value === '') {
        alert('입력해 주세요');
        return;
    }

    store.dispatch('userStore/login', {
        user_id: userId.value,
        user_password: userPassword.value
    })
}

const logout = () => {
    store.dispatch('userStore/logout')
}

</script>

<style>
.user_info_bar {
    display: flex;
}

.user_bar {
    width: 975px;
    height: 45px;
    margin: 0 auto;
    background-color: #eeeeee;
}

.user_bar_wrap {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 10px;
}

.login_bar {
    display: flex;
    height: 100%;
    justify-content: start;
    align-items: center;
}
</style>