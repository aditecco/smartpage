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
                <span>{{
                  extractDomains(item.href).charAt(0).toUpperCase()
                }}</span>
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

          <div class="span item-label">
            {{ item.label || extractDomains(item.href) }}
          </div>
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
        <label for="modalHrefInput">{{
          this.editMode ? "Edit entry" : "URL"
        }}</label>

        <input
          id="modalHrefInput"
          type="text"
          :value="hrefInput"
          @change="handleChange"
          placeholder="https://example.com"
        />

        <label for="modalLabelInput">{{
          this.editMode ? "Edit entry" : "Label"
        }}</label>

        <input
          id="modalLabelInput"
          type="text"
          :value="labelInput"
          @change="handleChange"
          placeholder="A label describing this entry"
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
// import { slugToDesc } from "@/utils";
import { STORAGE_DATA_KEY, URL_FILTER } from "@/constants";

export default {
  name: "App",
  components: {},
  data() {
    return {
      toggleModal: false,
      editMode: false,
      hrefInput: "",
      labelInput: "",
      items: JSON.parse(localStorage.getItem("SMARTPAGE_ITEMS")) || [],
    };
  },
  methods: {
    handleToggleModal() {
      this.toggleModal = !this.toggleModal;
    },

    handleChange(e) {
      this.hrefInput = e.currentTarget.value;
    },

    handleSubmit() {
      function Item(input, label) {
        this.id = Date.now();
        this.href = input;
        this.label = label;
      }

      if (!this.hrefInput) return;

      if (this.editMode) {
        const i = this.items.findIndex((item) => item.id === this.editMode.id);

        this.items[i] = { ...this.items[i], href: this.hrefInput };

        this.editMode = false;
      } else {
        this.items.push(new Item(this.hrefInput));
      }

      this.hrefInput = "";
      this.toggleModal = false;
      this.persistItems();
    },

    handleUpdateItem(id) {
      this.editMode = { editing: true, id };
      const which = this.items.find((item) => item.id === id);

      this.toggleModal = true;
      this.hrefInput = which.href;
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
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(this.items));
    },

    extractDomains(s) {
      return s.replace(URL_FILTER, "").split("/").slice(0, 1).toString();
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
  grid-auto-rows: 184px;
  grid-column-gap: 18px;
  grid-row-gap: 24px;
  list-style: none;
  justify-content: center;
}

@media (min-width: 600px) {
  .item-grid {
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: 204px;
    //justify-content: initial;
  }
}

.item {
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
}

.item a {
  flex-grow: 1;
  display: block;
  text-decoration: none;
  color: inherit;
}

.item-content {
  padding: 0 1rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
}

.item-content span {
  text-align: center;
  font-weight: lighter;
  word-wrap: break-word;
  font-size: 60px;
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

.item-label {
  text-transform: uppercase;
  color: #777;
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
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
  transform: translateY(-4px) scale(1.05);
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

label[for="modalLabelInput"] {
  margin-top: 16px;
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
  margin-top: 28px;
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