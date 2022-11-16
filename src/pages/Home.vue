<template>
    <div class="home">
        <div class="home_wrap">
            <div class="home_left">
                <div class="home_left_up_box"></div>
                <div class="home_left_down_box"></div>
            </div>
            <div class="home_right">
                <Snb/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Snb from "../containers/Home/Snb.vue";
</script>

<style>
.home {

}

.home_wrap {
    display: flex;
    justify-content: space-between;
}

.home_left {
    width: 80%;
}

.home_right {
    width: 19%;
}

.home_left_up_box {
    height: 400px;
    border: 1px solid black;
}

.home_left_down_box {
    height: 1500px;
    margin-top: 10px;
    border: 1px solid black;
}
</style>