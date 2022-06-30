// props
// height, api, title, subtitle, attr 是api返回数组的键名
// ranking:Boolean
<script>
import PSlider from "./PSlider.vue";
import PImg from "./PImg.vue";
export default {
  components: { PSlider, PImg },
  data() {
    return { data: null };
  },
  computed: {
    skeletonStyle() {
      return { width: this.height + "rem", height: this.height + "rem" };
    },
  },
  props: ["api", "title", "subtitle", "height", "attr", "ranking"],
  methods: {
    proxy(url) {
      if (!url) return "";
      return url.replace("/-/", "https://pximg.deno.dev/");
    },
    async load() {
      this.data = await fetch(this.api).then((res) => res.json());
      this.data[this.attr] = this.data[this.attr].filter((e) => e.url);
      console.log(this.data[this.attr]);
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<template>
  <div class="head">
    <small> {{ subtitle }} </small>
    <h2>{{ title }}</h2>
  </div>
  <div class="body">
    <PSlider
      :loaded="Boolean(data && data[attr || 'illusts'])"
      :height="height"
    >
      <template v-if="data && data[attr || 'illusts']">
        <div
          class="illust"
          :style="{ width: height + 'rem' }"
          v-for="(illust, index) in data[attr || 'illusts']"
          :key="illust.illustId || illust.id"
        >
          <div class="pic" :style="skeletonStyle">
            <PImg :src="proxy(illust.url)" :alt="illust.title" />
            <span v-if="ranking">{{ index + 1 }}</span>
          </div>
          <div class="title">{{ illust.title }}</div>
          <div class="user">
            <img
              :src="proxy(illust.profileImg || illust.profileImageUrl)"
              :alt="illust.userName"
            />
            <span>{{ illust.userName }} </span>
          </div>
        </div>
      </template>
    </PSlider>
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
.pic > span {
  position: absolute;
  top: 0;
  left: 0;
}
.pic > span {
  transform: translate(50%, 50%);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
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
