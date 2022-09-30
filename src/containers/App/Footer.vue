<template>
    <div class="footer">
        <div class="footer_wrap">
            <a href="javascript:void(0);" class="footer_link_text">광고,제휴안내</a>
            <a href="javascript:void(0);" class="footer_link_text">이용약관</a>
            <a href="javascript:void(0);" class="footer_link_text">개인정보처리방침</a>
            <a href="javascript:void(0);" class="footer_link_text">청소년보호정책</a>
            <a href="javascript:void(0);" class="footer_link_text">이메일주소무단수집거부</a>
            <a href="javascript:void(0);" class="footer_link_text">고객센터</a>
        </div>
    </div>
</template>

<script setup>

</script>


<style>
.footer {
    width: 975px;
    height: 100px;
    margin: 0 auto;
    background-color: #eeeeee;
    border-top: 1px solid black;
}

.footer_wrap {
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: start;
}


.footer_link_text {
    color: black;
}

.footer_link_text:hover{
    color: #8d0000;
}

</style>