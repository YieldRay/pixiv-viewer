<script>
import PImgList from "./PImgList.vue";
import { api } from "../../assets/config.js";

export default {
  components: { PImgList },
  mounted() {
    document.title = "Pixiv";
  },
  methods: {
    api,
  },
};
</script>

<template>
  <main>
    <PImgList
      :api="api('/ajax/illust/discovery?mode=all&max=18')"
      :height="12"
      title="发现"
      attr="illusts"
    ></PImgList>

    <PImgList
      :api="api('/api/ranking')"
      :height="18"
      :title="`${new Date().getMonth() + 1}月${new Date().getDate()}日的排行榜`"
      subtitle="每日排行榜"
      attr="contents"
      :ranking="true"
    ></PImgList>
  </main>
</template>

