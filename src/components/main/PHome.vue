<script>
import PImgList from "./PImgList.vue";
export default {
  components: { PImgList },
};
</script>

<template>
  <main>
    <PImgList
      api="https://pixiv.js.org/ajax/illust/discovery?mode=all&max=18"
      :height="12"
      title="发现"
      attr="illusts"
    ></PImgList>

    <PImgList
      api="https://pixiv.js.org/api/ranking"
      :height="18"
      :title="`${new Date().getMonth() + 1}月${new Date().getDate()}日的排行榜`"
      subtitle="每日排行榜"
      attr="contents"
      :ranking="true"
    ></PImgList>
  </main>
</template>

