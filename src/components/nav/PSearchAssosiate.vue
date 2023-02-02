<template>
    <transition name="fade">
        <div class="assosiate" v-if="on">
            <div class="history">
                <strong>历史记录</strong>
                <small style="cursor: pointer" @click="$emit('clearHistory')"
                    >清除历史记录</small
                >
            </div>
            <div class="list">
                <ul v-if="history">
                    <transition-group name="list">
                        <li
                            v-for="item in history"
                            :key="item"
                            @click="$emit('search', item)"
                        >
                            {{ item }}
                        </li>
                    </transition-group>
                </ul>
            </div>
            <small
                style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            >
                输入数字时，查询ID；否则，执行普通搜索
            </small>
        </div>
    </transition>
</template>

<script>
export default {
    name: "PSearchAssosiate",
    props: {
        on: Boolean,
        history: Array,
    },
    emits: ["toggle", "clearHistory", "search"],
};
</script>

<style scoped>
@import url("../../assets/transiton.css");

.assosiate {
    position: absolute;
    overflow-y: auto;
    background: #fff;
    height: calc(100vh - 5rem);
    min-width: 20rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    left: 30%;
    width: 35vw;
    top: 3.6rem;
    z-index: 2;
}

@media screen and (max-width: 64rem) {
    .assosiate {
        left: 20vw;
        width: 24rem;
    }
}

@media screen and (max-width: 32rem) {
    .assosiate {
        left: 5vw;
        width: 85vw;
    }
}

.history {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem 1.5rem;
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
</style>
