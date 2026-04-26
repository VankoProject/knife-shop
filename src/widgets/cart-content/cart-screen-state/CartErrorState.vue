<script setup lang="ts">

import { AppErrorState } from '@/shared/ui'

interface Props {
  message: string
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'retry'): void
}>()
</script>

<template>
  <AppErrorState
    title="Cart loading failed"
    :message="message"
    button-label="Try again"
    @retry="emit('retry')"
  />
</template>
