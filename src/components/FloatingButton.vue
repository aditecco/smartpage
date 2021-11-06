<template>
  <div class="floating-button">
    <button type="button" @click="onClick">
      <i class="material-icons">{{ icon }}</i>
    </button>
  </div>
</template>

<script>
export default {
  name: "FloatingButton",
  props: ["onClick", "icon"],
};
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1;
}

button {
  box-shadow: 0 2px 30px 10px rgba(0, 0, 0, 0.15);
  background: blueviolet;
  color: whitesmoke;
  font-size: 24px;
  transition: transform 0.2s ease;
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  padding: 0;
  text-align: center;
}

button:hover {
  transform: translateY(-4px) scale(1.05);
}

i {
  font-size: 32px;
  position: relative;
  bottom: -2px;
}
</style>
