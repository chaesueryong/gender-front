<template>
    <div class="gnb">
        <div class="gnb_bar">
<!--            <router-link to="/community?board=1&page=0" class="gnb_link_text">전체게시물</router-link>-->
            <router-link to="/community?board=2&page=1" class="gnb_link_text">일반게시물</router-link>
<!--            <router-link to="/community?board=3&page=0" class="gnb_link_text">토론방</router-link>-->
<!--            <router-link to="/community?board=4&page=0" class="gnb_link_text">상담</router-link>-->
            <router-link to="/write" class="gnb_link_text">write</router-link>
            <router-link to="/community?board=0&page=1" class="gnb_link_text" style="margin-left: auto">공지사항</router-link>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.gnb {
    width: 975px;
    height: 45px;
    margin: 0 auto;
    background-color: #3b4890;
}

.gnb_bar {
    display: flex;
    height: 100%;
    justify-content: start;
    align-items: center;
}

.gnb_link_text {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 16px;
    padding: 0 20px;
    text-align: center;
    color: white !important;
}

.gnb_link_text:hover {
    background-color: grey;
}

</style>