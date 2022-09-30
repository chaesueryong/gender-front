<template>
    <tr>
        <td class="board_item_id">{{props.info.id}}</td>
        <td class="board_item_title" style="text-align: left; word-break: break-all" @click="moveBoardToNumber(props.info.id)">{{props.info.board_title}}</td>
        <td class="board_item_nickname" style="padding: 3px 10px; white-space:nowrap">{{props.info.user.user_nickname}}</td>
        <td class="board_item_read" style="padding: 3px 10px; white-space:nowrap">{{props.info.board_view_count}}</td>
        <td class="board_item_date" style="padding: 3px 10px; white-space:nowrap">{{props.info.createdAt.split('T')[0]}}</td>
    </tr>
</template>

<script setup>
import { defineProps } from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
    info: Object
})

const moveBoardToNumber = (number) => {
    if(route.query.no === number.toString()){
        router.go();
    }else {
        router.push(`/community?board=${route.query.board}&page=${route.query.page}&no=${number}`);
    }
}

</script>


<style>
.board_item_id {
    font-size: 12px;
}

.board_item_title {
    font-size: 12px;
}

.board_item_title:hover {
    color: red;
    text-decoration: underline red;
    cursor: pointer;
}

.board_item_nickname {
    font-size: 12px;
}

.board_item_read {
    font-size: 10px;
}

.board_item_date {
    font-size: 10px;
}
</style>