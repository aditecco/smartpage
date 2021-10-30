<template>
  <ul>
    <li v-for="(item, i) in items" :key="i" data-item="{{item.id}}">
      <a title="{{ item.href }}">
        <article>
          <span>{{ item.href }}</span>

          <div class="item-controls">
            <button type="button" @click="handleUpdateItem(item.id)">
              Edit
            </button>

            <button type="button" @click="handleDeleteItem(item.id)">
              Delete
            </button>

            <button type="button" @click="handleCopyItemData(item.id)">
              Copy URL
            </button>
          </div>
        </article>
      </a>
    </li>
  </ul>

  <button type="button" @click="handleClick">Add an item</button>

  <div class="input-container" v-if="toggleModal">
    <form action="#">
      <input type="text" :value="input" @change="handleChange" />

      <button type="submit" @click.prevent="handleSubmit">
        {{ this.editMode ? "Edit" : "Add" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      toggleModal: false,
      editMode: false,
      input: "",
      items: [],
    };
  },
  methods: {
    handleClick() {
      this.toggleModal = !this.toggleModal;
    },

    handleChange(e) {
      this.input = e.currentTarget.value;
    },

    handleSubmit() {
      function Item(input) {
        this.id = Date.now();
        this.href = input;
      }

      if (!this.input) return;

      if (this.editMode) {
        const i = this.items.findIndex((item) => item.id === this.editMode.id);

        this.items[i] = { ...this.items[i], href: this.input };

        this.editMode = false;
      } else {
        this.items.push(new Item(this.input));
      }

      this.input = "";
      this.toggleModal = false;
    },

    handleUpdateItem(id) {
      this.editMode = { editing: true, id };
      const which = this.items.find((item) => item.id === id);

      this.toggleModal = true;
      this.input = which.href;
    },

    handleDeleteItem(id) {
      const which = this.items.findIndex((item) => item.id === id);

      this.items.splice(which, 1);
    },

    handleCopyItemData(id) {
      console.log(id);
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
