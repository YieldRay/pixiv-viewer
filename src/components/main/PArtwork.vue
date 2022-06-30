<script>
import { proxy } from "../../assets/config.js";
import PImgList from "./PImgList.vue";
export default {
  components: {
    PImgList,
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // watch changes of path
        console.log(toParams, previousParams);
        this.data = null; // flush
        this.fetchData(toParams.id);
        this.recommendList = []; // flush
        this.fetchRecommend();
      }
    );
  },
  mounted() {
    this.fetchData(this.$route.params.id);
    this.fetchRecommend();
  },
  data() {
    return {
      data: null,
      isMobile: Boolean(document.body.offsetWidth < 480),
      recommendList: [], // ! need init
      recommendData: [], // ! is an array
      // only init value
      pagesData: [], // for pages
      quality: window.localStorage.getItem("quality") || "regular",
    };
  },
  methods: {
    async fetchData(id) {
      this.data = null; // re-flush
      this.data = await fetch(`https://pixiv.js.org/ajax/illust/${id}`).then(
        (res) => res.json()
      );
      document.title = this.data.alt;
    },
    async fetchRecommend() {
      // init
      const count = 9; // 一次获取的推荐图片数量
      if (!this.recommendList || this.recommendList.length === 0) {
        const { illusts, nextIds } = await fetch(
          `https://pixiv.js.org/ajax/illust/${this.$route.params.id}/recommend/init?limit=18`
        ).then((res) => res.json());
        this.recommendData = illusts;
        this.recommendList = nextIds;
        return;
      }
      // get more
      const buildURL = (ids) => {
        let api = "https://pixiv.js.org/ajax/illust/recommend/illusts?";
        ids.forEach((id) => (api += `illust_ids=${id}&`));
        return api;
      };
      const ids = this.recommendList.splice(0, count); // pop from top
      const { illusts } = await fetch(buildURL(ids)).then((res) => res.json());
      this.recommendData.push(...illusts);
    },
    async fetchMore() {
      this.pagesData = await fetch(
        `https://pixiv.js.org/ajax/illust/${this.$route.params.id}/pages`
      ).then((res) => res.json());
    },
    proxy,
  },
};
</script>

<template>
  <div v-if="!data" class="loading" style="width: 100%; height: 100vh"></div>
  <main v-if="data">
    <div class="flex">
      <div class="container">
        <figure>
          <img
            :src="proxy(data?.urls?.[quality])"
            nohover
            class="loading"
            :class="data.width > data.height ? 'fit-x' : 'fit-y'"
            v-if="pagesData.length === 0"
          />
          <div class="center">
            <button
              @click="fetchMore"
              v-if="data.pageCount > 1 && pagesData.length === 0"
              class="btn"
            >
              加载剩余{{ data.pageCount - 1 }}张图片
            </button>
          </div>

          <!-- 分页 -->
          <transition-group name="list">
            <img
              v-for="(page, i) in pagesData"
              :key="i"
              :src="proxy(page?.urls?.[quality])"
              nohover
              class="loading"
              :class="data.width > data.height ? 'fit-x' : 'fit-y'"
            />
          </transition-group>
        </figure>
        <section>
          <figcaption>
            <h1>
              {{ data?.title }}
            </h1>
            <ul v-if="data">
              <li v-for="one in data.tags.tags" :key="one.tag">
                <template v-if="one">
                  <span> #{{ one.tag }} </span>
                  <small>{{ one?.translation?.en }}</small>
                </template>
              </li>
            </ul>
          </figcaption>
        </section>
      </div>
      <!-- 两个container，桌面时flex布局 -->
      <div class="container">
        <!-- <img :src="proxy(data.profileImageUrl)" :alt="data.userAccount" /> -->
        <h2>
          {{ data.userName }}
        </h2>
        <button class="btn">JUST A BUTTON~</button>
        <p style="margin: 1rem; font-size: 0.8rem; font-weight: bolder">
          其他作品
        </p>
        <PImgList
          :object="data.userIllusts"
          :height="5"
          :noscroll="false"
          :small="true"
          :rate="0.5"
        ></PImgList>
      </div>
    </div>
    <template v-if="recommendData">
      <PImgList
        :array="recommendData"
        :height="isMobile ? 8 : 12"
        :noscroll="true"
        :small="false"
        :gap="1"
        title="相关作品"
      ></PImgList>
      <div class="center">
        <button v-if="recommendData" class="btn" @click="fetchRecommend">
          加载更多
        </button>
      </div>
    </template>
  </main>
</template>



<style scoped>
main {
  background: #f5f5f5;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

@import url("../../assets/loading.css");
@import url("../../assets/transiton.css");

.container {
  margin: 2vh 4vw;
  /* this!!! */
  box-shadow: 0 1px 1rem 2px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  overflow: hidden;
}
section {
  padding: 1rem;
}
@media screen and (min-width: 48rem) {
  /* for PC */
  .flex {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .container {
    margin: 1rem;
  }
  .container:first-child {
    margin-left: 3rem;
  }
  .container:last-child {
    margin-right: 3rem;
    max-width: 20rem;
  }
  section {
    padding: 4rem 8rem;
  }
}

figure {
  background: #fafafa;
  margin: 0 auto;
  overflow: hidden;
  min-height: 30vh;
  transition: all 0.4s;
}

figure > img {
  max-width: 100%;
  max-height: 100vh;
  margin: auto;
  display: block;
}
img.fit-x {
  /* 宽图 */
  width: 100%;
  height: auto;
}

img.fit-y {
  /* 高图 */
  height: 100%;
  width: auto;
}

section {
  background: #fff;
}

h1,
h2 {
  margin: 0px 0px 8px;
  color: rgb(31, 31, 31);
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
}

h2 {
  font-size: 18px;
}

ul {
  margin: 0px -6px 0px 0px;
  list-style: none;
  padding-left: 0px;
  word-break: break-all;
}

li {
  display: inline;
  margin: 0px 12px 0px 0px;
}
li > span {
  color: rgb(61, 118, 153);
}
li > small {
  display: inline-block;
  color: rgb(173, 173, 173);
  font-size: 12px;
  margin: 0px 0px 0px 4px;
  padding: 0px;
  word-break: break-word;
}
.btn {
  width: 16rem;
  border: none;
  padding: 0.5rem;
  border-radius: 1rem;
  color: inherit;
  background: #fff;
  position: relative;
  cursor: pointer;
}
.center {
  display: flex;
  justify-content: center;
}
</style>