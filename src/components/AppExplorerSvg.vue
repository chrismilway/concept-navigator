<template>
  <div v-html="data" />
</template>

<script>
export default {
  name: 'app-explorer-svg',
  props: {
    data: String,
  },
};
</script>

<style>

</style>
