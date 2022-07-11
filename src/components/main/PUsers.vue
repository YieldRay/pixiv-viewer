<template>
  <div v-if="!user" class="loading" style="width: 100%; height: 100vh"></div>
  <header v-if="user">
    <div class="background">
      <img
        v-if="user.background && !user.background.isPrivate"
        :src="proxy(user.background.url)"
        :alt="user.userId"
      />
    </div>
    <article>
      <img :src="proxy(user.imageBig)" :alt="user.name" class="avatar" />
      <div class="user">
        <div class="flex">
          <div class="left">
            <h2>
              {{ user.name }}
            </h2>
          </div>
          <div class="right">
            <!-- space for buttons... -->
          </div>
        </div>
        <div
          class="comment"
          v-html="user.commentHtml"
          :style="isOpen ? 'max-height:150vh' : 'max-height:4rem'"
        ></div>
        <div
          v-if="user.commentHtml.includes('<br />')"
          @click="isOpen = !isOpen"
          class="fold"
        >
          {{ isOpen ? "收起" : " 展开" }}
        </div>
      </div>
    </article>
  </header>
  <main v-if="artwork">
    <PImgList
      :object="artwork?.illusts"
      :height="isMobile ? 8 : 12"
      :noscroll="true"
      :small="false"
      :gap="1"
      :hideUser="true"
    ></PImgList>
  </main>
</template>

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
        this.fetchUser(this.$route.params.id);
        this.fetchArtwork(this.$route.params.id);
      }
    );
  },
  mounted() {
    this.fetchUser(this.$route.params.id);
    this.fetchArtwork(this.$route.params.id);
  },
  data() {
    return {
      user: null,
      artwork: null,
      isOpen: false,
      isMobile: Boolean(document.body.offsetWidth < 480),
      quality: window.localStorage.getItem("quality") || "regular",
    };
  },
  methods: {
    proxy,
    async fetchUser(id) {
      this.user = null;
      this.user = await fetch(
        `https://pixiv.js.org/ajax/user/${id}?full=1`
      ).then((res) => res.json());
      this.user.name && (document.title = this.user.name);
    },
    async fetchArtwork(id) {
      this.artwork = null;
      this.artwork = await fetch(
        `https://pixiv.js.org/ajax/user/${id}/profile/top`
      ).then((res) => res.json());
    },
  },
};
</script>

<style scoped>
@import url("../../assets/loading.css");
@import url("../../assets/transiton.css");

.background {
  min-height: 12rem;
  background: #fafafa;
}
.background img {
  width: 100%;
  max-height: 50vh;
  /* 我们这里设置为最多半屏高度，不过pixiv上面是大概12rem */
  object-fit: cover;
  object-position: top;
  /* 背景图片显示位置 */
}
.flex {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
article {
  padding: 0 6vw;
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 1rem;
  word-break: break-all;
}
.comment {
  overflow: hidden;
  transition: all 0.5s;
}
.fold {
  color: rgba(0, 0, 0, 0.3);
}
.avatar {
  border-radius: 50%;
  position: relative;
  top: calc(-96px / 2);
  width: 96px;
  height: 96px;
  object-fit: cover;
  object-position: top;
  border: 2px solid #fff;
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

main {
  margin-top: 2rem;
}
</style>