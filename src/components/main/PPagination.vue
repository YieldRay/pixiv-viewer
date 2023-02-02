<template>
    <div class="pagination">
        <router-link :to="`${url}/${current - 1}`" v-if="current > 1">
            <button><span class="go-left"></span></button>
        </router-link>
        <router-link :to="`${url}/${i}`" :key="i" v-for="i in pages">
            <button :class="{ active: current === i }" class="page">
                {{ i }}
            </button>
        </router-link>
        <router-link :to="`${url}/${current + 1}`" v-if="current < max">
            <button><span class="go-right"></span></button>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        max: Number, // 最后一页的大小
        current: Number, // 当前页
        amount: {
            // 至多显示多少个按钮，奇数
            type: Number,
            default: 7,
        },
        // TODO
        // 若页面数小于
        // 从 5 页开始出现省略号 1 ... 4 (5) 6 7 8
        // 当前页后面有 3 个按钮
        url: String, // '/search/搜索的内容'
    },
    computed: {
        pages() {
            const amount = this.amount;
            const current = this.current > 0 ? this.current : 1;
            const max = this.max;
            const half = Math.floor(amount / 2);
            if (current <= half)
                return new Array(Math.min(amount, max))
                    .fill(0)
                    .map((_, i) => i + 1);
            else if (current + half >= max)
                return new Array(amount)
                    .fill(max - amount)
                    .map((_, i) => _ + i);
            else
                return new Array(amount)
                    .fill(current - half)
                    .map((_, i) => _ + i);
        },
    },
};
</script>

<style scoped>
button {
    background: transparent;
    font-size: 1rem;
    line-height: calc(1em + 8px);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    cursor: pointer;
    font-weight: bolder;
    transition: all 0.3s;
}

button.page:not(.active):hover {
    background: rgba(0, 0, 0, 0.04);
    color: rgb(128, 128, 128);
}

button.active {
    background-color: rgba(0, 0, 0, 0.88);
    color: rgb(255, 255, 255);
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin: 1rem 0;
}

.go-left,
.go-right {
    position: relative;
    box-sizing: border-box;
    transform: scale(0.75);
}
.go-left:after,
.go-right:after {
    content: "";
    width: 1rem;
    height: 1rem;
    position: absolute;
    border-left: 4px solid #000;
    border-bottom: 4px solid #000;
    transform: translate(0, -50%) rotate(-135deg);
}
.go-left {
    transform: rotate(180deg) scale(0.75);
}
</style>
