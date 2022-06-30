<script>
import PImgList from "./PImgList.vue";
export default {
  components: {
    PImgList,
  },
  created() {
    this.fetchData(this.$route.params.id);
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        console.log(toParams, previousParams);
        this.data = null; // flush
        this.fetchData(toParams.id);
      }
    );
  },
  data() {
    return {
      data: null,
      isMobile: Boolean(document.body.offsetWidth < 480),
      // only init value
    };
  },
  methods: {
    async fetchData(id) {
      this.data = null; // re-flush
      this.data = await fetch(`https://pixiv.js.org/ajax/illust/${id}`).then(
        (res) => res.json()
      );
      document.title = this.data.alt;
      console.log(this.data);
    },
    proxy(url) {
      if (!url) return "";
      return url.replace("/-/", "https://pximg.deno.dev/");
    },
  },
};
</script>

<template>
  <div v-if="!data" class="loading" style="width: 100%; height: 100vh"></div>
  <main v-if="data">
    <div class="flex">
      <div class="container">
        <figure>
          <img :src="proxy(data?.urls?.regular)" nohover class="loading" />
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
          :api="data.userIllusts"
          :height="5"
          :noscroll="false"
          :small="true"
          :rate="0.5"
        ></PImgList>
      </div>
    </div>
    <PImgList
      :api="`https://pixiv.js.org/ajax/illust/${this.$route.params.id}/recommend/init?limit=18`"
      :height="isMobile ? 8 : 12"
      :noscroll="true"
      :small="false"
      :gap="1"
      title="相关作品"
    ></PImgList>
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
    padding: 0 8rem;
  }
}

figure {
  background: #fafafa;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 20vh;
  transition: all 0.4s;
}

figure > img {
  max-height: 100vh;
  display: block;
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
}
</style>