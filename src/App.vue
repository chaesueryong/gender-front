<template>
    <div class="app">
        <Header/>
        <Gnb/>
        <UserBar/>

        <router-view class="center" :key="$route.fullPath"/>

        <Footer/>
    </div>
</template>

<script setup>
import Header from "./containers/App/Header.vue";
import Gnb from "./containers/App/Gnb.vue";
import UserBar from "./containers/App/UserBar.vue";
import Footer from "./containers/App/Footer.vue";
</script>

<style>
html, body {
    margin: 0;
    padding: 0;
}

div {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

input:focus {
    outline: none;
}

a:-webkit-any-link {
    cursor: pointer;
    text-decoration: none;
}

a:link {
    color: black;
    text-decoration: none;
}

a:visited {
    color: black;
    text-decoration: none;
}

a:hover {
    color: black;
    text-decoration: none;
}

a:active {
    color: black;
    text-decoration: none;
}

.center {
    width: 975px;
    margin: 10px auto;
}
</style>
