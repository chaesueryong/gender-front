<template>
    <div class="board_list">
        <div class="board_list_wrap">

            <div class="board_list_title">
                실시간 인기 게시물
            </div>

            <div style="border: 1px solid gray; padding: 5px">
                <table class="board_list_box">
                    <colgroup>
                        <col>
                        <col style="width: 100%">
                        <col>
                        <col>
                        <col>
                    </colgroup>
                    <thead>
                        <tr style="background-color: #405269; color: white; font-size: 12px">
                            <th scope="col">No</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Name</th>
                            <th scope="col">Read</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <BoardItem v-for="(item, index) in boardList" :key="index"
                           :info="item"
                        />

                    </tbody>
                </table>
            </div>

            <PageNation />

        </div>
    </div>
</template>

<script setup>
import BoardItem from "../../components/BoardItem";
import PageNation from "../../components/PageNation";
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";
import {useStore} from "vuex";

const route = useRoute();
const store = useStore();

const boardList = computed(() => store.state.boardStore.boardList);

onMounted( () => {
    store.dispatch('boardStore/getBoardList', {
        clickedPage: route.query.page
    })
})

</script>


<style>
.board_list {}

.board_list_wrap {}

.board_list_title{
    border: 1px solid gray;
    font-size: 22px;
    font-weight: 1000;
    padding: 10px 20px;
    margin-bottom: 10px;
}

.board_list_box {
    border: 1px solid gray;
}

table {
    width: 100%;
    border-collapse: collapse;
}

td, th {
    text-align: center;
}

tr:nth-child(even) {
    background-color: #eeede8;
}

tr:hover {
    background-color: #e5ead2;
}

</style>