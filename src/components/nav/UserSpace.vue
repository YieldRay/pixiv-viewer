<template>
    <div>
        <slot>
            <small @click="isOpen = true" style="cursor: pointer"> ⛏关于 </small>
        </slot>
    </div>

    <teleport to="body">
        <transition name="fade">
            <div class="popup" v-if="isOpen">
                <div class="flex">
                    <strong>关于</strong>
                    <span class="close" @click="isOpen = false"> [关闭] </span>
                </div>
                <p>
                    <a href="https://github.com/YieldRay/pixiv-viewer">source code</a>
                </p>
                <p>
                    实现了Pixiv的简单操作，API来自
                    <a href="https://pixiv.js.org/" target="_blank">pixiv.js.org</a>
                    项目
                </p>
            </div>
        </transition>
    </teleport>
</template>

<script>
export default {
    data() {
        return { isOpen: false };
    },
};
</script>

<style scoped>
@import url("../../assets/transiton.css");

div {
    min-width: 40vw;
    max-width: 100%;
}
@media screen and (max-width: 32rem) {
    div {
        min-width: 10vw;
    }
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1rem;
    width: 50vw;
    min-height: 50vh;
    background: #fff;
}
.popup a {
    color: cadetblue;
    transition: all 0.3s;
}

.popup a:hover {
    text-decoration: underline;
}

.close {
    cursor: pointer;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
