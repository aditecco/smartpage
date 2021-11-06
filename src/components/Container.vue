<template>
  <div class="container" :style="{ maxWidth: mw || '800px' }">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container",
  props: ["mw"],
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}
</style>
