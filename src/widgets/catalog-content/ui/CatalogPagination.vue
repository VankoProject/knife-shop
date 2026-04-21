<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'changePage', value: number): void
}>()

const pages = computed(() => {
  return Array.from({ length: props.totalPages }, (_, index) => index + 1)
})

function onChangePage(page: number): void {
  if (page < 1 || page > props.totalPages) return
  emit('changePage', page)
}
</script>

<template>
  <nav class="catalog-pagination" aria-label="Catalog pagination">
    <button
      type="button"
      class="catalog-pagination__button"
      :disabled="props.currentPage === 1"
      @click="onChangePage(props.currentPage - 1)"
    >
      Prev
    </button>

    <button
      type="button"
      v-for="page in pages"
      :key="page"
      class="catalog-pagination__button"
      :class="{
        'catalog-pagination__button--active': page === props.currentPage
      }"
      @click="onChangePage(page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="catalog-pagination__button"
      :disabled="props.currentPage === props.totalPages"
      @click="onChangePage(props.currentPage + 1)"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
.catalog-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.catalog-pagination__button {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;

  border-radius: 8px;
  border: 1px solid var(--border);

  background: var(--bg-surface);
  color: var(--text-primary);

  cursor: pointer;
  transition: all 0.2s ease;
}

.catalog-pagination__button:hover {
  background: var(--bg-surface-secondary);
}

.catalog-pagination__button--active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}

.catalog-pagination__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
