<template>
  <div class="input-modal" v-if="show">
    <button class="input-modal-close-button" @click="onClose">
      <i class="material-icons">close</i>
    </button>

    <Container>
      <slot />
    </Container>
  </div>
</template>

<script>
import Container from "@/components/Container";

export default {
  name: "Modal",
  props: ["show", "onClose"],
  components: { Container },
};
</script>

<style scoped></style>
