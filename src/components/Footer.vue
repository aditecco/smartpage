<template>
  <footer>
    <div class="container">
      <slot />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<!-- TODO a styles not working -->
<style scoped>
footer {
  padding: 1rem;
  background: whitesmoke;
}

a {
  text-decoration: none;
  color: inherit;
  padding: 2px 4px;
  font-size: small;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
}

a:hover {
  color: black;
  border-bottom: 2px solid black;
}
</style>
