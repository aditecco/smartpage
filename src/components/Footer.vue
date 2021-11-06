<template>
  <footer>
    <Container mw="initial">
      <slot />
    </Container>
  </footer>
</template>

<script>
import Container from "@/components/Container";
export default {
  name: "Footer",
  components: { Container },
};
</script>
<!-- TODO a styles not working -->
<style>
footer {
  padding: 1rem;
  background: whitesmoke;
}

footer a {
  text-decoration: none;
  color: inherit;
  padding: 2px 4px;
  font-size: small;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
}

footer a:hover {
  color: black;
  border-bottom: 2px solid black;
}
</style>
