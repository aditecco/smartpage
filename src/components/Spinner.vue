<template>
  <div class="spinner">
    <div class="spinner-inner"></div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped>
/* inspired by: https://codepen.io/alexanderkaran/pen/BaNmmRV?editors=0100 */

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: #00000040;
}

.spinner-inner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 7px solid #dadada;
  border-top-color: blueviolet;
  box-shadow: 0 2px 40px #00000017;
  background-color: transparent;

  /*
  longhand:

  animation-duration
  animation-timing-function
  animation-delay
  animation-iteration-count
  animation-direction
  animation-fill-mode
  animation-play-state
  animation-name
  */

  animation: 900ms infinite spin;
  animation-duration: 900ms;
}
</style>
