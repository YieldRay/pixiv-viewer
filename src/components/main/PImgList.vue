// props // height, title, subtitle, attr 是api返回数组的键名 // api/attr or
object or array // small:Boolean 不显示文本 // noscroll:Boolean 切换为非滚动模式
// gap rate hideUser
<script>
import { proxy } from "../../assets/config.js";

import PSlider from "./PSlider.vue";
import PList from "./PList.vue";
import PImg from "./PImg.vue";
export default {
    components: { PImg, PSlider, PList },
    data() {
        return { data: null };
    },
    computed: {
        skeletonStyle() {
            return { width: this.height + "rem", height: this.height + "rem" };
        },
        arrayData() {
            if (this.api) return this.data;
            if (Array.isArray(this.array))
                return this.array.filter((e) => e && e.url);

            // for object data
            return Object.values(this.object).filter((e) => e && e.url); // 无需键名
        },
    },
    props: [
        "api", //  need fetch
        "object",
        "array",
        "title",
        "subtitle",
        "height",
        "attr",
        "ranking",
        "small",
        "noscroll",
        "gap",
        "rate",
        "hideUser",
    ],
    methods: {
        proxy,
    },
    async mounted() {
        if (typeof this.api === "string" && this.api.length > 0) {
            this.data = (await fetch(this.api).then((res) => res.json()))[
                this.attr || "illusts" // 默认键名
            ].filter((e) => e && e.url);
        }
    },
};
</script>

<template>
    <div class="head">
        <small> {{ subtitle }} </small>
        <h2>{{ title }}</h2>
    </div>
    <div class="body">
        <component
            :is="
                noscroll
                    ? $options.components.PList
                    : $options.components.PSlider
            "
            :loaded="Boolean(arrayData)"
            :height="height"
            :gap="gap"
            :rate="rate"
        >
            <template v-if="arrayData">
                <!-- 下面的是图片容器 -->

                <transition-group name="list">
                    <div
                        :class="{ illust: !noscroll }"
                        :style="{ width: height + 'rem' }"
                        v-for="(illust, index) in arrayData"
                        :key="illust.illustId || illust.id"
                    >
                        <template v-if="illust">
                            <router-link
                                :to="`/artwork/${
                                    illust.illust_id || illust.id
                                }`"
                            >
                                <div class="pic" :style="skeletonStyle">
                                    <PImg
                                        :src="proxy(illust.url)"
                                        :alt="illust.title"
                                        :height="height"
                                    />
                                    <span class="rank" v-if="ranking">{{
                                        index + 1
                                    }}</span>
                                    <span
                                        class="page-count"
                                        v-if="illust.pageCount > 1"
                                    >
                                        <svg viewBox="0 0 9 10" size="9">
                                            <path
                                                d="M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 L3,10
    C2.44771525,10 2,9.55228475 2,9 L6,9 C7.1045695,9 8,8.1045695 8,7 L8,3 Z M1,1 L6,1
    C6.55228475,1 7,1.44771525 7,2 L7,7 C7,7.55228475 6.55228475,8 6,8 L1,8 C0.44771525,8
    0,7.55228475 0,7 L0,2 C0,1.44771525 0.44771525,1 1,1 Z"
                                            ></path>
                                        </svg>
                                        {{ illust.pageCount }}
                                    </span>
                                </div>
                            </router-link>
                        </template>
                        <template v-if="!this.small">
                            <div class="title">{{ illust.title }}</div>
                            <router-link
                                :to="`/users/${
                                    illust.user_id || illust.userId
                                }`"
                            >
                                <div class="user" v-if="!hideUser">
                                    <img
                                        :src="
                                            proxy(
                                                illust.profile_img ||
                                                    illust.profileImageUrl
                                            )
                                        "
                                        :alt="illust.user_id || illust.userId"
                                    />
                                    <span
                                        >{{
                                            illust.user_name || illust.userName
                                        }}
                                    </span>
                                </div>
                            </router-link>
                        </template>
                    </div>
                </transition-group>
            </template>
        </component>
    </div>
</template>

<style scoped>
small {
    font-size: 14px;
    line-height: 22px;
    font-weight: normal;
    color: rgb(133, 133, 133);
}
h2 {
    font-size: 20px;
    line-height: 28px;
    color: rgb(71, 71, 71);
    font-weight: bold;
    margin: 0px;
}

.illust {
    margin-right: 1vw;
    display: inline-block;
}
/* this!!! */
.body,
.head {
    margin: 1vh 4vw;
}

.head,
.illust:first-child {
    padding-left: 4vw;
}

@media screen and (max-width: 48rem) {
    .body,
    .head {
        margin: 1vh 2vw;
    }
    .head,
    .illust:first-child {
        padding-left: 2vw;
    }
}
.pic {
    position: relative;
}

.pic > PImg,
.pic > .rank,
.pic > .page-count {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pic > .rank {
    transform: translate(50%, 50%);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.pic > .page-count {
    top: 0.2rem;
    right: 0.4rem;
    width: 2rem;
    height: 1.25rem;
    border-radius: 1.25rem;
    font-size: 50%;
    background: rgba(0, 0, 0, 0.32);
    color: #fff;
    font-weight: bold;
}

.page-count > svg {
    stroke: none;
    fill: currentcolor;
    width: 9px;
    line-height: 0;
    font-size: 0px;
    vertical-align: middle;
    padding-right: 2px;
}

.title,
.user {
    margin-top: 4px;
    max-width: 100%;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: rgb(31, 31, 31);
}
.user {
    color: rgb(71, 71, 71);
    font-weight: lighter;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.user > img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
}
</style>
