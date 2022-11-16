<template>
    <div class="community">
        <div class="community_wrap">
            <div style="border: 1px solid gray; margin-bottom: 10px; height: 200px"></div>

            <div v-if="route.query.no" class="board_info">
                <Board />

                <Reply />

                <div style="display: flex; justify-content: space-between; margin: 20px auto">
                    <button>목록</button>
                    <button>글쓰기</button>
                </div>

                <div class="ad" style="margin: 20px auto; width: 700px; height: 100px; background-color: gray"></div>
            </div>

            <BoardList />

            <div class="ad" style="margin: 20px auto; width: 700px; height: 100px; background-color: gray"></div>

        </div>
    </div>
</template>

<script setup>
import Board from "../containers/Community/Board";
import Reply from "../containers/Community/Reply";
import BoardList from "../containers/Community/BoardList";
import {useRoute} from "vue-router";

const route = useRoute();

</script>

<style>
.community {

}

.community_wrap {

}

</style>