<template>
    <div class="input_join">
        <div class="input_join_wrap">
            <div class="input_join_box">
                <input v-model="userId" placeholder="아이디"/>
                <span>5글자 이상 20자 미만, 영어 대소문자, 숫자 사용가능</span>
            </div>

            <div class="input_join_box">
                <input v-model="userNickname" placeholder="닉네임"/>
            </div>

            <div class="input_join_box">
                <input :value="userJoinEmail" disabled/>
            </div>

            <div class="input_join_box">
                <input v-model="userPassword" placeholder="비빌번호"/>
            </div>

            <div class="input_join_box">
                <input v-model="userRePassword" placeholder="비빌번호 확인"/>
            </div>

            <div class="input_join_box">
                <input type="radio" name="gender" @click="selectGender('male')" />
                <span>남</span>
                <input type="radio" name="gender" @click="selectGender('female')" />
                <span>여</span>
            </div>

            <button style="margin: 0 10px 0 0" @click="join">회원가입 완료</button>
            <router-link to="/">
                <button>회원가입 취소</button>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import InputCheck from "../../common/Utils/InputCheck";

const store = useStore();
const route = useRoute();

const { id } = route.params;

const userId = ref('');
const userNickname = ref('');
const userPassword = ref('');
const userRePassword = ref('');
const userGender = ref(null);
const userJoinEmail = computed(() => store.state.userStore.userJoinEmail);

const selectGender = (gender) => {
    userGender.value = gender;
}

const join = () => {
    if(!InputCheck.userId(userId.value)) return;
    if(!InputCheck.userNickname(userNickname.value)) return;
    if(!InputCheck.userPassword(userPassword.value)) return;
    if(!InputCheck.userRePassword(userPassword.value, userRePassword.value)) return;

    if(userGender.value === null) {
        alert('체크해주세요');
        return;
    }

    store.dispatch('userStore/join', {
        id: id,
        userId: userId.value,
        userNickname: userNickname.value,
        userPassword: userPassword.value,
        userRePassword: userRePassword.value,
        userGender: userGender.value
    });
}

</script>


<style>
.input_join {

}

.input_join_wrap {
    border: 1px solid black;
    padding: 40px;
    box-sizing: border-box;
}

.input_join_box {
    margin: 10px 0;
}

.gol {
    margin: 0 5px;
}
</style>