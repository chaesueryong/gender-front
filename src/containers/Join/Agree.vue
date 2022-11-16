<template>
    <div class="agree">
        <div class="agree_wrap">
            <div style="display: flex; flex-direction: column">
                <div style="margin: 0 0 15px 0">
                    <div style="margin: 0 0 10px 0">이용약관</div>
                    <div class="agree_box"></div>
                    <input type="checkbox" :checked="checked[0]" @click="check1"/>
                    <span>이용약관 동의하기</span>
                </div>
                <div style="margin: 0 0 15px 0">
                    <div style="margin: 0 0 10px 0">개인정보이용정보</div>
                    <div class="agree_box"></div>
                    <input type="checkbox" :checked="checked[1]" @click="check2"/>
                    <span>개인정보이용정보 동의하기</span>
                </div>
            </div>

            <div style="margin: 20px 0 0 0">
                <input type="checkbox" :checked="checked[0] === true && checked[1] === true" @click="checkAll"/>
                <span>전체 동의</span>

                <button style="margin: 0 0 0 250px" @click="nextJoin">계속하기</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";
// import { useMobileDetection } from "vue3-mobile-detection";
// const { isMobile } = useMobileDetection();
//
// console.log(isMobile());

const router = useRouter();
const checked = ref([false, false]);

const checkAll = (event) => {
    checked.value = [event.target.checked, event.target.checked];
};

const check1 = (event) => {
    checked.value[0] = event.target.checked;
};

const check2 = (event) => {
    checked.value[1] = event.target.checked;
};

const nextJoin = async () => {
    if (checked.value[0] === true && checked.value[1] === true) {
        await router.push('/join/1');
    } else {
        alert('동의 확인바랍니다')
    }
}
</script>

<style>
.agree {
    border: 1px solid black;
    padding: 40px;
    box-sizing: border-box;
}

.agree_wrap {
    margin-left: 10px;
}

.agree_box {
    width: 50%;
    height: 100px;
    border: 1px solid #bbbbbb;
}
</style>