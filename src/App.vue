<template>
  <section class="card-container">
    <div class="blank-slate" v-if="!cards.length">
      <span>No items. Add one!</span>
    </div>

    <Container mw="initial" v-if="cards.length">
      <ul class="card-grid">
        <li
          v-for="(card, i) in [...cards].reverse()"
          :key="i"
          class="card-wrapper"
        >
          <Card
            :id="card.id"
            :url="card.url"
            :label="card.label"
            :on-update="handleUpdateCard"
            :on-delete="handleDeleteCard"
            :on-copy="handleCopyCardData"
          />

          <div class="span card-label">
            {{ card.label || extractDomains(card.url) }}
          </div>
        </li>
      </ul>
    </Container>
  </section>

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
    <form action="#" @submit.prevent="handleSubmit">
      <label for="modalURLinput">{{
        this.editMode ? "Edit URL" : "URL"
      }}</label>

      <input
        id="modalURLinput"
        type="text"
        v-model="URLinput"
        placeholder="https://example.com"
        required
      />

      <label for="modalLabelInput">{{
        this.editMode ? "Edit label" : "Label"
      }}</label>

      <input
        id="modalLabelInput"
        type="text"
        v-model="labelInput"
        placeholder="A label describing this entry"
      />

      <button type="submit" class="submit-button">
        {{ this.editMode ? "Save" : "Create" }}
      </button>
    </form>
  </Modal>

  <FloatingButton :on-click="handleToggleModal" icon="add" />
</template>

<script>
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
      URLinput: "",
      labelInput: "",
      cards: JSON.parse(localStorage.getItem(STORAGE_DATA_KEY)) || [],
    };
  },
  methods: {
    handleToggleModal() {
      if (this.URLinput || this.labelInput) this.resetFields();

      this.toggleModal = !this.toggleModal;
    },

    handleSubmit() {
      function Card(url, label) {
        this.id = Date.now();
        this.url = url;
        this.label = label;
      }

      if (!this.URLinput) return;

      if (this.editMode) {
        const i = this.cards.findIndex((card) => card.id === this.editMode.id);

        this.cards[i] = {
          ...this.cards[i],
          url: this.URLinput,
          label: this.labelInput,
        };

        this.editMode = false;
      }

      //
      else {
        this.cards.push(new Card(this.URLinput, this.labelInput));
      }

      this.resetFields();
      this.toggleModal = false;
      this.persistCards();
    },

    handleUpdateCard(id) {
      this.editMode = { editing: true, id };
      const which = this.cards.find((card) => card.id === id);

      this.toggleModal = true;
      this.URLinput = which.url;
      this.labelInput = which.label;
    },

    handleDeleteCard(id) {
      const which = this.cards.findIndex((card) => card.id === id);

      this.cards.splice(which, 1);

      this.persistCards();
    },

    handleCopyCardData(id) {
      console.log(id);
    },

    resetFields() {
      this.URLinput = "";
      this.labelInput = "";
    },

    persistCards() {
      localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(this.cards));
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

button {
  border: none;
  outline: none;
  background: none;
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

.blank-slate {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container {
  background: whitesmoke;
  flex-grow: 1;
}

.card-grid {
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
  .card-grid {
    /*
    grid-template-columns: repeat(auto-fill, 180px);
    grid-auto-rows: 204px;
    justify-content: initial;
    */
  }
}

.card-wrapper {
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.card-wrapper:hover {
  transform: scale(1.025);
}

.card-label {
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

.submit-button {
  float: right;
  margin-top: 28px;
  padding: 12px 32px;
  background: whitesmoke;
  border-radius: 4px;
  color: black;
  font-weight: normal;
}
</style>
