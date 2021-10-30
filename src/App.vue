<template>
  <section class="item-container">
    <ul class="item-grid">
      <li
        v-for="(item, i) in items"
        :key="i"
        data-item="{{item.id}}"
        class="item"
      >
        <a href="{{item.href}}" title="item.href">
          <article class="item-body">
            <div class="item-meta">
              <span>{{ item.href }}</span>
            </div>

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
  </section>

  <div class="floating-button">
    <button type="button" @click="handleToggleModal">
      <i class="material-icons">add</i>
    </button>
  </div>

  <footer></footer>

  <div class="input-modal" v-if="toggleModal">
    <button class="input-modal-close-button" @click="handleToggleModal">
      <i class="material-icons">close</i>
    </button>

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
      items: JSON.parse(localStorage.getItem("SMARTPAGE_ITEMS")) || [],
    };
  },
  methods: {
    handleToggleModal() {
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
      this.persistItems();
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

      this.persistItems();
    },

    handleCopyItemData(id) {
      console.log(id);
    },

    persistItems() {
      localStorage.setItem("SMARTPAGE_ITEMS", JSON.stringify(this.items));
    },
  },
};
</script>

<style>
@import url(~normalize.css/normalize.css);
@import url(~@fontsource/material-icons/index.css);

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  /* TODO Safari fix */
  height: 100vh;
}

.item-container {
  flex-grow: 1;
}

.item-grid {
  padding: 0;
  margin: 0;
  display: grid;
}

.item {
}

.item-body {
}

.item-controls {
}

.item-meta {
}

.floating-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 1;
}

.floating-button button {
}

.input-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  //width: 100vw;
  //height: 100vh;
  z-index: 1;
  padding: 2rem 1rem;
}

.input-modal form {
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
