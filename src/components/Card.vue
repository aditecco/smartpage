<template>
  <article class="card">
    <a :href="url" :title="label">
      <div class="card-content">
        <span>{{ extractDomains(url).charAt(0).toUpperCase() }}</span>
      </div>
    </a>

    <div class="card-controls">
      <button type="button" @click="onUpdate(id)">
        <span>Edit</span>
      </button>

      <button type="button" @click="onDelete(id)">
        <span> Delete </span>
      </button>

      <button type="button" @click="onCopy(id)">
        <span> Copy</span>
      </button>
    </div>
  </article>
</template>

<script>
import { extractDomains } from "@/utils";

export default {
  name: "Card",
  props: ["id", "url", "label", "onUpdate", "onDelete", "onCopy"],
  methods: {
    extractDomains,
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px 6px rgba(0, 0, 0, 0.025);
  flex-grow: 1;
}

a {
  flex-grow: 1;
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-content {
  padding: 0 1rem;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
}

.card-content span {
  text-align: center;
  font-weight: lighter;
  word-wrap: break-word;
  font-size: 60px;
  color: #dedede;
  position: relative;
  bottom: -6px;
}

.card-controls {
}

.card-controls button {
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

.card-controls button span {
  border-bottom: 2px solid transparent;
}

.card-controls button span:hover {
  border-bottom: 2px solid lightcoral;
}

.card-controls button + button {
  border-left: 1px solid antiquewhite;
}
</style>
