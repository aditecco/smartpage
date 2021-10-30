<template>
  <div class="input-container" v-if="toggleModal">
    <form action="#">
      <input type="text" @change="handleChange" />

      <button type="submit" @click.prevent="handleSubmit">Add</button>
    </form>
  </div>

  <ul>
    <li v-for="(item, i) in items" :key="i">{{ item.title }}</li>
  </ul>

  <button type="button" @click="handleClick">Add an item</button>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      toggleModal: false,
      input: "",
      items: [],
    };
  },
  methods: {
    handleClick(e) {
      console.log("click ", e);
      this.toggleModal = !this.toggleModal;
    },
    handleChange(e) {
      console.log("change ", e);
      this.input += e.currentTarget.value;
    },
    handleSubmit(e) {
      console.log("submit ", e);
      this.items.push({ title: this.input });
      this.input = "";
      this.toggleModal = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input-container {
  padding: 2rem 1rem;
  margin: 1rem;
  border-radius: 4px;
  border: 1px solid #777;
}

button {
  box-sizing: border-box;
  border: none;
  padding: 20px;
  line-height: 20px;
  border-radius: 10px;
  background: whitesmoke;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}
</style>
