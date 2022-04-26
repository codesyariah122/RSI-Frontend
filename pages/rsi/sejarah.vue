<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    <rsiSejarah
      :path="path"
      :lists="lists"
      :part1="part1"
      :list_history="list_history"
    />
  </div>
</template>

<script>
export default {
  name: "rsi-testimoni",
  layout: "default",

  data() {
    return {
      path: this.$route.name,
    };
  },

  async asyncData({ $axios }) {
    const lists = await $axios.$get("/web/sejarah");
    const splits = lists.result.description.split(
      ".",
      lists.result.description.split(".").length - 1
    );

    const part1 = splits[0].concat(splits[1]);

    let list_history = [];

    for (let i = 2; i <= splits.length - 1; i++) {
      list_history.push(splits[i]);
    }

    return {
      part1,
      lists,
      list_history,
    };
  },
};
</script>