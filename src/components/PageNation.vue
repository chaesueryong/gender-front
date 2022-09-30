<template>
    <div style="display: flex; justify-content: center; margin: 10px 0">
        <div class="pagination">
            <a @click="clickPrev">&#60;</a>

            <a v-for="i in range(startPage, endPage)" :class="renderPage === i ? 'active' : ''" :key="i" @click="clickPage(i)">
                {{ i }}
            </a>

            <a @click="clickNext">&#62;</a>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const startPage = computed(() => store.state.boardStore.startPage);
const endPage = computed(() => store.state.boardStore.endPage);
const renderPage = computed(() => store.state.boardStore.renderPage);

const range = (start, end) => {
    let list = [];
    for (let i = start; i <= end; i++) list.push(i);
    return list;
}

const clickPage = (index) => {
    router.push(`/community?board=${route.query.board}&page=${index}`);
}

const clickPrev = () => {
    if(renderPage.value % 10 === 0){
        router.push(`/community?board=${route.query.board}&page=${renderPage.value - 10}`);
    }else {
        router.push(`/community?board=${route.query.board}&page=${renderPage.value - (renderPage.value % 10)}`);
    }
}

const clickNext = () => {
    if(renderPage.value % 10 === 0){
        router.push(`/community?board=${route.query.board}&page=${renderPage.value + 1}`);
    }else {
        router.push(`/community?board=${route.query.board}&page=${renderPage.value - (renderPage.value % 10) + 11}`);
    }}

</script>


<style>
.pagination {
    display: inline-block;
    font-size: 14px;
    font-weight: 1000;
}

.pagination a {
    cursor: pointer;
    color: black;
    float: left;
    padding: 4px 8px;
    text-decoration: none;
}

.pagination a.active {
    color: red;
    border-radius: 5px;
    pointer-events: none;
}

.pagination a:hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
}
</style>