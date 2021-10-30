<template>
  <section class="item-container">
    <div class="blank-slate" v-show="!items.length">
      <span>No items. Add one!</span>
    </div>

    <div class="container" v-show="items.length">
      <ul class="item-grid">
        <li
          v-for="(item, i) in items"
          :key="i"
          data-item="{{item.id}}"
          class="item"
        >
          <article class="item-body">
            <a href="{{item.href}}" title="item.href">
              <div class="item-meta">
                <span>{{ item.href }}</span>
              </div>
            </a>

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
        </li>
      </ul>
    </div>
  </section>

  <div class="floating-button">
    <button type="button" @click="handleToggleModal">
      <i class="material-icons">add_circle_outline</i>
    </button>
  </div>

  <footer>
    <div class="container">
      <a
        href="https://github.com/aditecco/smartpage"
        title="SmartPage"
        target="_blank"
        rel="noopener"
        >SmartPage</a
      >
    </div>
  </footer>

  <div class="input-modal" v-if="toggleModal">
    <button class="input-modal-close-button" @click="handleToggleModal">
      <i class="material-icons">close</i>
    </button>

    <div class="container">
      <form action="#">
        <label for="modalInput">{{
          this.editMode ? "Edit entry" : "Add a new URL"
        }}</label>

        <input
          id="modalInput"
          type="text"
          :value="input"
          @change="handleChange"
          placeholder="https://example.com"
        />

        <button
          type="submit"
          @click.prevent="handleSubmit"
          class="input-modal-submit-button"
        >
          {{ this.editMode ? "Save" : "Create" }}
        </button>
      </form>
    </div>
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

.item-container,
footer {
  background: whitesmoke;
}

.blank-slate {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  //max-width: ;
  padding: 0 1rem;
  margin: 0 auto;
}

.item-container {
  flex-grow: 1;
}

.item-grid {
  padding: 1rem 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 30px;
  list-style: none;
}

.item {
  transition: transform 0.3s ease-in-out;
}

.item:hover {
  transform: scale(1.025);
}

.item a {
  height: 100%;
  display: block;
  text-decoration: none;
  color: inherit;
}

.item-body {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px 6px rgba(0, 0, 0, 0.05);
}

.item-controls {
  display: flex;
  justify-content: space-between;
}

.item-controls button {
  border-radius: 0;
  box-shadow: none;
  background: none;
  border: none;
  padding: 10px;
  flex-basis: 33.3%;
  border-top: 1px solid antiquewhite;
  font-size: small;
  cursor: pointer;
}

.item-controls button + button {
  border-left: 1px solid antiquewhite;
}

.item-meta {
  padding: 60px 20px;
}

.floating-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 1;
}

.floating-button button {
  border-radius: 16px;
  box-shadow: 0 2px 30px 10px rgba(0, 0, 0, 0.15);
  width: 60px;
  height: 60px;
  background: blueviolet;
  color: whitesmoke;
  font-size: 24px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.floating-button button i {
  font-size: 32px;
  position: relative;
  bottom: -2px;
}

.floating-button button:hover {
  transform: translateY(-4px) scale(1.025);
}

.input-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1;
  padding: 80px 1rem 2rem;
  color: whitesmoke;
}

.input-modal .container {
  max-width: 800px;
}

.input-modal-close-button {
  position: absolute;
  right: 16px;
  top: 16px;
  color: white;
}

.input-modal form {
}

.input-modal label {
  padding: 1rem 12px;
  display: block;
  font-weight: bold;
}

.input-modal input {
  width: 100%;
  padding: 12px 10px;
  font-size: 18px;
  background-color: transparent;
  color: inherit;
  border: 1px solid whitesmoke;
  border-radius: 4px;
  outline: none;
}

.input-modal-submit-button {
  float: right;
  margin-top: 20px;
  padding: 12px 32px;
  background: whitesmoke;
  border-radius: 4px;
}

button {
  border: none;
  outline: none;
  background: none;
}
</style>
