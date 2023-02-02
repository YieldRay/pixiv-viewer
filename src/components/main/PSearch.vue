// this is search result, not search bar // 60 img per page

<template>
    <div v-if="!data" class="loading" style="width: 100%; height: 100vh"></div>
    <main v-if="data">
        <h1 class="center">
            <small>搜索结果：</small>{{ this.$route.params.search }}
        </h1>
        <PImgList
            :array="data.popular.recent"
            :height="isMobile ? 8 : 12"
            :small="false"
            :gap="1"
            title="热门作品·Recent"
        ></PImgList>
        <PImgList
            :array="data.popular.permanent"
            :height="isMobile ? 8 : 12"
            :small="false"
            :gap="1"
            title="热门作品·Permanent"
        ></PImgList>
        <PImgList
            :array="data.illustManga.data"
            :height="isMobile ? 8 : 12"
            :noscroll="true"
            :small="false"
            :gap="1"
            :title="`插画·漫画  (${data.illustManga.total})`"
        ></PImgList>
        <PPagination
            :max="Math.ceil(data.illustManga.total / 60)"
            :current="Number(this.$route.params.page || 1)"
            :url="`/search/${this.$route.params.search}`"
        ></PPagination>
    </main>
</template>

<script>
import { proxy, api } from "../../assets/config.js";
import PImgList from "./PImgList.vue";
import PPagination from "./PPagination.vue";
export default {
    components: {
        PImgList,
        PPagination,
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                // watch changes of path
                console.log(toParams, previousParams);
                this.fetchData(
                    this.$route.params.search,
                    this.$route.params.page
                );
            }
        );
    },
    mounted() {
        document.title =
            this.$route.params.search + " | " + (this.$route.params.page || 1);
        this.fetchData(this.$route.params.search, this.$route.params.page);
    },
    data() {
        return {
            data: null,
            isMobile: Boolean(document.body.offsetWidth < 480),
            quality: window.localStorage.getItem("quality") || "regular",
        };
    },
    methods: {
        proxy,
        async fetchData(search, page = 1) {
            if (!page || page < 0) page = 1;
            this.data = null;
            this.data = await fetch(
                api(`/ajax/search/artworks/${search}?p=${page}`)
            ).then((res) => res.json());
        },
    },
};
</script>

<style scoped>
@import url("../../assets/loading.css");

PPagination {
    margin-top: 1rem;
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
