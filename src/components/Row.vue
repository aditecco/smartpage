<template>
  <article class="row">
    <a :href="url" :title="label">
      <img
        v-if="favicon"
        class="row-content-favicon"
        :data-favicon-id="'fvc-' + id"
        :src="favicon"
        :alt="`Favicon for ${extractDomains(url)}`"
      />

      <div class="row-content-label">
        {{ label || extractDomains(url) }}
      </div>
    </a>

    <div class="row-controls">
      <button type="button" @click="onUpdate(id)">
        <span>Edit</span>
      </button>

      <button type="button" @click="onDelete(id)">
        <span>Delete</span>
      </button>

      <button type="button" @click="onCopy(id)">
        <span>Copy</span>
      </button>
    </div>
  </article>
</template>

<script>
import { extractDomains } from "@/utils";

export default {
  name: "Row",
  props: ["id", "url", "label", "onUpdate", "onDelete", "onCopy", "favicon"],
  methods: {
    extractDomains,
  },
};
</script>

<style scoped>
.row {
  display: flex;
  border-top: 1px solid #ccc;
  padding: 0.25rem 1rem;
}

a {
  display: flex;
  text-decoration: none;
  color: inherit;
  flex: 1 1 0;
  align-items: center;
  justify-content: flex-start;
}

.row-content-favicon {
  width: 22px;
}

.row-content-label {
  text-transform: uppercase;
  color: #777;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 1rem;
}

.row-controls {
  margin-left: 1rem;
  flex: 0 0 20%;
}

.row-controls button {
  display: inline-block;
  width: calc(100% / 3);
  border-radius: 0;
  box-shadow: none;
  background: none;
  border: none;
  padding: 12px 4px 10px;
  font-size: small;
  cursor: pointer;
  color: #777;
}

.row-controls button span {
  border-bottom: 2px solid transparent;
}

.row-controls button span:hover {
  border-bottom: 2px solid lightcoral;
}
</style>
