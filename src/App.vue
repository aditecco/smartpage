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

  <FloatingButton :on-click="handleToggleModal" icon="add" />

  <Footer>
    <a
      href="https://github.com/aditecco/smartpage"
      title="SmartPage"
      target="_blank"
      rel="noopener"
      >SmartPage</a
    >
  </Footer>

  <div class="input-modal" v-if="toggleModal">
    <button class="input-modal-close-button" @click="handleToggleModal">
      <i class="material-icons">close</i>
    </button>

    <div class="container">
      <form action="#">
        <label for="modalHrefInput">{{
          this.editMode ? "Edit URL" : "URL"
        }}</label>

        <input
          id="modalHrefInput"
          type="text"
          :value="hrefInput"
          @change="handleChange"
          placeholder="https://example.com"
          required
        />

        <label for="modalLabelInput">{{
          this.editMode ? "Edit label" : "Label"
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
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Footer, FloatingButton },
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
      if (this.hrefInput || this.labelInput) this.resetFields();

      this.toggleModal = !this.toggleModal;
    },

    handleChange(e) {
      if (e.currentTarget.id === "modalHrefInput") {
        this.hrefInput = e.currentTarget.value;
      } else if (e.currentTarget.id === "modalLabelInput") {
        this.labelInput = e.currentTarget.value;
      }
    },

    handleSubmit() {
      function Item(href, label) {
        this.id = Date.now();
        this.href = href;
        this.label = label;
      }

      if (!this.hrefInput) return;

      if (this.editMode) {
        const i = this.items.findIndex((item) => item.id === this.editMode.id);

        this.items[i] = {
          ...this.items[i],
          href: this.hrefInput,
          label: this.labelInput,
        };

        this.editMode = false;
      }

      //
      else {
        this.items.push(new Item(this.hrefInput, this.labelInput));
      }

      this.resetFields();
      this.toggleModal = false;
      this.persistItems();
    },

    handleUpdateItem(id) {
      this.editMode = { editing: true, id };
      const which = this.items.find((item) => item.id === id);

      this.toggleModal = true;
      this.hrefInput = which.href;
      this.labelInput = which.label;
    },

    handleDeleteItem(id) {
      const which = this.items.findIndex((item) => item.id === id);

      this.items.splice(which, 1);

      this.persistItems();
    },

    handleCopyItemData(id) {
      console.log(id);
    },

    resetFields() {
      this.hrefInput = "";
      this.labelInput = "";
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
@import url(~@fontsource/varela-round/index.css);

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: "Varela Round", "system-ui", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  /* TODO Safari fix */
  height: 100vh;
}

.item-container {
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
    /*
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: 204px;
    justify-content: initial;
    */
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
  position: relative;
  bottom: -6px;
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
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  padding: 1rem 0;
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
