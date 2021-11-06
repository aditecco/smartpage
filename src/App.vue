<template>
  <section class="item-container">
    <div class="blank-slate" v-show="!items.length">
      <span>No items. Add one!</span>
    </div>

    <Container mw="initial" v-show="items.length">
      <ul class="item-grid">
        <li v-for="(item, i) in [...items].reverse()" :key="i" class="item">
          <Card
            :id="item.id"
            :url="item.href"
            :label="item.label"
            :on-update="handleUpdateItem"
            :on-delete="handleDeleteItem"
            :on-copy="handleCopyItemData"
          />

          <div class="span item-label">
            {{ item.label || extractDomains(item.href) }}
          </div>
        </li>
      </ul>
    </Container>
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

  <Modal :show="toggleModal" :on-close="handleToggleModal">
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
  </Modal>
</template>

<script>
// import { slugToDesc } from "@/utils";
import { STORAGE_DATA_KEY } from "@/constants";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { extractDomains } from "@/utils";
import Modal from "@/components/Modal";

export default {
  name: "App",
  components: { Modal, Card, Container, Footer, FloatingButton },
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

    extractDomains,
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

.modal label {
  padding: 1rem 0;
  display: block;
  font-weight: bold;
}

label[for="modalLabelInput"] {
  margin-top: 16px;
}

.modal input {
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
