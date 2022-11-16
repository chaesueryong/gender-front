<template>
    <div class="write">
        <div class="write_wrap">
            <input class="title" v-model="title" placeholder="제목">
            <div class="quill">
                <quill-editor
                    theme="snow"
                    :options="state.editorOption"
                    @change="onEditorChange"
                />
<!--                @blur="onEditorBlur"-->
<!--                @focus="onEditorFocus"-->
<!--                @ready="onEditorReady"-->
            </div>
            <div class="button_box">
                <button class="cancel_button" @click="backButton">나가기</button>
                <button class="complete_button" @click="saveBoard">저장</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { quillEditor } from 'vue3-quill'
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore();
const router = useRouter();
const title = ref('');
const contents = ref('');
const state = reactive({
    dynamicComponent: null,
    content: '',
    _content: '',
    editorOption: {
        placeholder: '',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                // [{ header: 1 }, { header: 2 }],
                // [{ list: 'ordered' }, { list: 'bullet' }],
                // [{ script: 'sub' }, { script: 'super' }],
                // [{ indent: '-1' }, { indent: '+1' }],
                // [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [
                    { color: [] },
                    { background: []}
                ],
                [{ font: [] }],
                [{ align: [] }],
                // ['clean'],
                [
                    // 'link',
                    'image',
                    // 'video'
                ]
            ],
            // other moudle options here
        }
        // more options
    },
    disabled: false
})

const backButton = () => {
    router.go(-1);
}

const saveBoard = async () => {
    await store.dispatch('boardStore/saveBoard', {
        type: '1',
        title: title.value,
        contents: contents.value
    })
}

// const onEditorBlur = (quill) => {
//     console.log('editor blur!', quill)
// }
// const onEditorFocus = (quill) => {
//     console.log('editor focus!', quill)
// }
// const onEditorReady = (quill) => {
//     console.log('editor ready!', quill)
// }

const onEditorChange = ({ html }) => {
    contents.value = html;
}

</script>

<style>
.write {

}

.write_wrap {
    border: 1px solid #eeeeee;
}

.title {
    width: 800px;
    display: block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px auto;
}

.quill {
    width: 800px;
    height: 300px;
    margin: 20px auto 42px auto;
}

.button_box {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 86px;
    margin: 50px 0;
}

.complete_button {
    display: block;
}

.cancel_button {
    display: block;
}
</style>