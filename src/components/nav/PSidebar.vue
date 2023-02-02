<template>
    <transition name="fade">
        <div class="mask" v-if="on" @click="$emit('toggle')"></div>
    </transition>

    <div class="sidebar" :class="{ ltr: on, rtl: !on }">
        <header>
            <RoundButton :on="on" @click="$emit('toggle')"></RoundButton>
            <PLogo></PLogo>
        </header>
        <h2>
            画质调节<small>(仅对图片详情生效)</small>
            <br />
            <small> 当前: {{ quality }} </small>
        </h2>
        <ul>
            <li @click="setQuality('thumb_mini')">thumb_mini</li>
            <li @click="setQuality('small')">small</li>
            <li @click="setQuality('regular')">regular</li>
            <li @click="setQuality('original')">original</li>
        </ul>

        <br />
        <br />
        <h2>
            图片代理
            <br />
            <small class="pximg">
                <input v-model="pximg" type="url" /><button @click="setPximg">
                    确定
                </button></small
            >
        </h2>
    </div>
</template>

<script>
import RoundButton from "./ToggleButton.vue";
import PLogo from "./PLogo.vue";
import { pximg } from "../../assets/config";
export default {
    name: "PSidebar",
    props: {
        on: Boolean,
    },
    emits: ["toggle"],
    components: {
        RoundButton,
        PLogo,
    },
    data() {
        return {
            quality: window.localStorage.getItem("quality") || "regular",
            pximg,
        };
    },
    methods: {
        setQuality(q) {
            window.localStorage.setItem("quality", q);
            this.quality = q;
            location.reload();
        },
        setPximg() {
            localStorage.setItem("pximg", this.pximg.trim());
            location.reload();
        },
    },
};
</script>

<style scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 15rem;
    box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2);
    background: #fff;
    transition: all 0.3s;
    z-index: 3;
}
.ltr {
    transform: translateX(0);
}
.rtl {
    transform: translateX(-100%);
}
header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 1vw;
    height: 3.5rem;
}

.mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
}

ul {
    display: flex;
    flex-flow: column;
    margin: 0px;
    padding: 0px;
    list-style: none;
}
li {
    padding: 12px 0 12px 24px;
    transition: all 0.2s ease 0s;
}
li:hover {
    background: rgba(0, 0, 0, 0.04);
}
h2 {
    margin-left: 24px;
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
    color: rgb(133, 133, 133);
}
.pximg input,
.pximg button {
    border: none;
    box-sizing: border-box;
    height: 2em;
    border-radius: 2px;
    vertical-align: bottom;
}
.pximg input {
    width: 10em;
    background-color: #f2f2f2;
}
.pximg input:focus {
    outline: none;
}
.pximg button {
    cursor: pointer;
    margin-left: 2px;
}

@import url("../../assets/transiton.css");
</style>
