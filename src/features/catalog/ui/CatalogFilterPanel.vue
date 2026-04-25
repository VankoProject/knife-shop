<script setup lang="ts">
import type {
  ProductFilters,
  ProductSort
} from '@/entities/product/model/filters'
import {
  PRODUCT_RARITIES,
  type Rarity
} from '@/entities/product/model/types.ts'

interface Props {
  filters: ProductFilters
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'change', filters: Partial<ProductFilters>): void
  (event: 'reset'): void
}>()

function onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('change', { q: target.value || undefined })
}

function onMinInput(event: Event): void {
  const target = Number((event.target as HTMLInputElement).value)
  emit('change', {
    min: target >= 0 ? target : undefined
  })
}

function onMaxInput(event: Event): void {
  const target = Number((event.target as HTMLInputElement).value)
  emit('change', {
    max: target >= 0 ? target : undefined
  })
}

function onInStockChange(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('change', {
    inStock: target.checked ? true : undefined
  })
}

function onRarityChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('change', {
    rarity: target.value ? (target.value as Rarity) : undefined
  })
}

function onSortChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  emit('change', {
    sort: target.value ? (target.value as ProductSort) : undefined
  })
}
</script>

<template>
  <section class="catalog-filters">
    <input
      class="catalog-filters__input"
      type="text"
      placeholder="Search products"
      :value="filters.q ?? ''"
      @input="onSearchInput"
    />

    <input
      class="catalog-filters__input"
      type="number"
      min="0"
      placeholder="Min price"
      :value="filters.min ?? ''"
      @keydown.enter="onMinInput"
      @blur="onMinInput"
    />

    <input
      class="catalog-filters__input"
      type="number"
      min="0"
      placeholder="Max price"
      :value="filters.max ?? ''"
      @keydown.enter="onMaxInput"
      @blur="onMaxInput"
    />

    <label class="catalog-filters__checkbox">
      <input
        type="checkbox"
        :checked="filters.inStock === true"
        @change="onInStockChange"
      />
      In stock
    </label>

    <select
      class="catalog-filters__select"
      :value="filters.rarity ?? ''"
      @change="onRarityChange"
    >
      <option value="">All rarities</option>

      <option v-for="rarity in PRODUCT_RARITIES" :key="rarity" :value="rarity">
        {{ rarity }}
      </option>
    </select>

    <select
      class="catalog-filters__select"
      :value="filters.sort ?? ''"
      @change="onSortChange"
    >
      <option value="">Default sort</option>
      <option value="price_asc">Price: low to high</option>
      <option value="price_desc">Price: high to low</option>
    </select>

    <button class="catalog-filters__reset" type="button" @click="emit('reset')">
      Reset
    </button>
  </section>
</template>

<style scoped>
.catalog-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.catalog-filters__input,
.catalog-filters__checkbox,
.catalog-filters__select,
.catalog-filters__reset {
  min-height: 48px;
  padding: 0 14px;

  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;

  background: var(--bg-surface);
  color: var(--text-primary);
}

.catalog-filters__input:focus,
.catalog-filters__select:focus {
  outline: none;
  border-color: var(--accent);
}

.catalog-filters__input,
.catalog-filters__checkbox,
.catalog-filters__select {
  border: 1px solid var(--accent);
}

.catalog-filters__input::placeholder {
  color: var(--text-secondary);
  font-weight: 500;
}

.catalog-filters__select {
  padding: 0 16px;
}

.catalog-filters__checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}

.catalog-filters__checkbox input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--accent);
}

.catalog-filters__reset {
  border: none;
  background: var(--accent);
  cursor: pointer;
}

.catalog-filters__reset:hover {
  background: var(--accent-hover);
}
</style>
