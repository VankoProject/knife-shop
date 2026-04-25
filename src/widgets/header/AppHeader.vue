<script setup lang="ts">
import { useLoginStore } from '@/features/login/model/store.ts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()

function goTo(path: string) {
  router.push(path)
}

function isActive(path: string): boolean {
  return route.path === path
}

async function logout() {
  await loginStore.logout()
  await router.replace('/login')
}
</script>

<template>
  <header class="app-header">
    <div class="app-header_container">
      <div class="app-header_left">
        <div class="app-header_appName">Knife Shop</div>

        <nav class="app-header_nav" aria-label="Main navigation">
          <button
            class="nav-button"
            :class="{ 'nav-button--active': isActive('/catalog') }"
            @click="goTo('/catalog')"
          >
            Catalog
          </button>

          <button
            class="nav-button"
            :class="{ 'nav-button--active': isActive('/cart') }"
            @click="goTo('/cart')"
          >
            Cart
          </button>
        </nav>
      </div>

      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--text-primary);
}

.app-header_container {
  width: 100%;
  max-width: 1200px;
  min-height: 64px;
  margin: 0 auto;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.app-header_left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.app-header_nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-button,
.logout-button {
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: 0.2s ease;
}

.app-header_appName {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-button:hover,
.logout-button:hover {
  background: var(--accent-hover);
}

.nav-button--active {
  background: var(--accent);
}

.logout-button {
  background: var(--bg-surface-secondary);
}
</style>
