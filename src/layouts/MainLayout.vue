<script setup lang="ts">
</script>

<template>
 <div>
    <header>
        <nav>
            <router-link to="/login">Login</router-link> |
  <router-link to="/catalog">Catalog</router-link> |
  <router-link to="/cart">Cart</router-link>
        </nav>
    </header>

    <main>
        <router-view />
    </main>
 </div>
</template>