<template>
  <div class="modal" v-if="show">
    <button class="modal-close-button" @click="onClose">
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

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2;
  padding: 80px 1rem 2rem;
  color: whitesmoke;
}

button {
  position: absolute;
  right: 16px;
  top: 16px;
  color: white;
}
</style>
