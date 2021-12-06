<template>
  <section class="card-container">
    <Spinner v-show="loading" />

    <div class="blank-slate" v-if="!cards.length">
      <span>No items. Add one!</span>
    </div>

    <Container mw="initial" v-if="cards.length">
      <ul class="card-grid">
        <li
          v-for="(card, i) in [...cards].slice(0, 10).reverse()"
          :key="i"
          class="card-wrapper"
        >
          <Card
            :id="card.id"
            :url="card.url"
            :label="card.label"
            :favicon="card.favicon"
            :on-update="handleUpdateCard"
            :on-delete="handleDeleteCard"
            :on-copy="handleCopyCardData"
          />

          <div class="span card-label">
            {{ card.label || extractDomains(card.url) }}
          </div>
        </li>
      </ul>

      <ol class="table">
        <li
          v-for="(card, i) in [...cards].slice(10).reverse()"
          :key="i"
          class="row-wrapper"
        >
          <Row
            :id="card.id"
            :url="card.url"
            :label="card.label"
            :favicon="card.favicon"
            :on-update="handleUpdateCard"
            :on-delete="handleDeleteCard"
            :on-copy="handleCopyCardData"
          />
        </li>
      </ol>
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
    <form class="form" action="#" @submit.prevent="handleSubmit">
      <label for="URLinput">{{ this.editMode ? "Edit URL" : "URL" }}</label>

      <input
        class="form-url-input"
        id="URLinput"
        type="text"
        v-model="URLinput"
        placeholder="https://example.com"
        required
      />

      <label for="labelInput">{{
        this.editMode ? "Edit label" : "Label"
      }}</label>

      <input
        class="form-label-input"
        id="labelInput"
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
import { LAMBDA_LOCATION, STORAGE_DATA_KEY } from "@/constants";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Card from "@/components/Card";
import { extractDomains } from "@/utils";
import Modal from "@/components/Modal";
import { Card as __Card__ } from "./models/Card";
import Spinner from "@/components/Spinner";
import Row from "@/components/Row";

export default {
  name: "App",
  components: { Row, Spinner, Modal, Card, Container, Footer, FloatingButton },
  data() {
    return {
      loading: false,
      error: false,
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

    async handleSubmit() {
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

      // Card creation
      else {
        this.toggleModal = false;
        this.loading = true;
        const favicon = await this.fetchFavicon(this.URLinput);

        this.cards.push(new __Card__(this.URLinput, this.labelInput, favicon));
        this.loading = false;
      }

      this.resetFields();
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

    async handleCopyCardData(id) {
      console.log(id);
    },

    async fetchFavicon(url, size = 48) {
      try {
        // TODO use axios
        const faviconData = await fetch(
          `/${LAMBDA_LOCATION}fetchFavicons?domain=https://${this.extractDomains(
            url
          )}&size=${size}`
        );

        if (faviconData.status === 200) {
          return faviconData?.text();
        }

        //
        else {
          // Will trigger v-if="!favicon" in Card.vue
          // TODO return a default favicon stored in the app
          return "";
        }
      } catch (err) {
        console.error("@fetchFavicon: ", err);
        return "";
      }
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
  padding: 60px 5%;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 140px);
  grid-auto-rows: 164px;
  grid-column-gap: 48px;
  grid-row-gap: 44px;
  list-style: none;
  justify-content: center;
}

.table {
  list-style: none;
  padding: 60px 5%;
}

.row-wrapper:last-child .row {
  border-bottom: 1px solid #ccc;
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

.form label {
  padding: 1rem 0;
  display: block;
  font-weight: bold;
}

label[for="labelInput"] {
  margin-top: 16px;
}

.form input {
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
