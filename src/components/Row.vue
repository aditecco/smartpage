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
  flex-direction: column;
  padding: 0.25rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.15rem 0;
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
  margin-top: 10px;
  min-width: 180px;
  border-top: 1px solid #ccc;
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

.row-controls button:nth-child(1) {
  border-right: 1px solid #ccc;
}

.row-controls button:nth-child(3) {
  border-left: 1px solid #ccc;
}

.row-controls button span {
  border-bottom: 2px solid transparent;
}

.row-controls button span:hover {
  border-bottom: 2px solid lightcoral;
}

@media (min-width: 600px) {
  .row {
    flex-direction: row;
    border-width: 1px 0 0 0;
    border-radius: 0;
  }

  a {
    flex: 1 1 0;
    justify-content: flex-start;
    padding: 0;
  }

  .row-controls {
    margin-top: 0;
    margin-left: 1rem;
    border: 0;
  }

  .row-controls button:nth-child(n) {
    border: 0;
  }
}
</style>
