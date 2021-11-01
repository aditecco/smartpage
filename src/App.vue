<template>
  <section class="item-container">
    <div class="blank-slate" v-show="!items.length">
      <span>No items. Add one!</span>
    </div>

    <div class="container" v-show="items.length">
      <ul class="item-grid">
        <li v-for="(item, i) in [...items].reverse()" :key="i" class="item">
          <article class="item-body">
            <a :href="item.href" :title="item.href">
              <div class="item-content">
                <span>{{ item.href.slice(0, 1).toUpperCase() }}</span>
              </div>
            </a>

            <div class="item-controls">
              <button type="button" @click="handleUpdateItem(item.id)">
                <span>Edit</span>
              </button>

              <button type="button" @click="handleDeleteItem(item.id)">
                <span> Delete </span>
              </button>

              <button type="button" @click="handleCopyItemData(item.id)">
                <span> Copy</span>
              </button>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>

  <div class="floating-button">
    <button type="button" @click="handleToggleModal">
      <i class="material-icons">add</i>
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
  padding: 60px 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-auto-rows: 160px;
  grid-gap: 18px;
  list-style: none;
  justify-content: center;
}

@media (min-width: 600px) {
  .item-grid {
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: 180px;
    //justify-content: initial;
  }
}

.item {
  transition: transform 0.2s ease-in-out;
}

.item:hover {
  transform: scale(1.025);
}

.item-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px 6px rgba(0, 0, 0, 0.025);
}

.item a {
  flex-grow: 1;
  display: block;
  text-decoration: none;
  color: inherit;
}

.item-content {
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
}

.item-content span {
  //color: #4141fd;
  //word-wrap: break-word;
  font-size: 60px;
  text-align: center;
  font-weight: lighter;
  display: block;
  color: #dedede;
}

.item-controls {
}

.item-controls button {
  display: inline-block;
  width: calc(100% / 3);
  border-radius: 0;
  box-shadow: none;
  background: none;
  border: none;
  padding: 12px 4px 10px;
  border-top: 1px solid antiquewhite;
  font-size: small;
  cursor: pointer;
  color: #777;
}

.item-controls button span {
  border-bottom: 2px solid transparent;
}

.item-controls button span:hover {
  border-bottom: 2px solid lightcoral;
}

.item-controls button + button {
  border-left: 1px solid antiquewhite;
}

.floating-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1;
}

.floating-button button {
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
  color: black;
  font-weight: normal;
}

button {
  border: none;
  outline: none;
  background: none;
}
</style>
