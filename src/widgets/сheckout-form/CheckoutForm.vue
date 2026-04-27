<script setup lang="ts">
import { ActionButton, type ButtonState } from '@/shared/ui'

interface Props {
  name: string
  comment: string
  errorMessage: string | null
  buttonState: ButtonState
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:name', value: string): void
  (event: 'update:comment', value: string): void
  (event: 'submit'): void
}>()

function onNameInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:name', target.value)
}

function onCommentInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement
  emit('update:comment', target.value)
}

function onSubmit(): void {
  emit('submit')
}
</script>

<template>
  <form class="checkout-form" @submit.prevent="onSubmit">
    <h2 class="checkout-form__title">Checkout</h2>

    <div class="checkout-form__field">
      <label>Name</label>
      <input
        class="checkout-form__input"
        type="text"
        maxlength="20"
        :value="props.name"
        placeholder="Enter your name"
        @input="onNameInput"
      />
    </div>

    <div class="checkout-form__field">
      <label>Comment</label>
      <textarea
        class="checkout-form__textarea"
        :value="props.comment"
        placeholder="Leave a comment"
        @input="onCommentInput"
      />
    </div>

    <p v-if="props.errorMessage" class="checkout-form__error">
      {{ props.errorMessage }}
    </p>

    <ActionButton
      label="Place order"
      :state="props.buttonState"
      type="submit"
    />
  </form>
</template>

<style scoped>
.checkout-form {
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: var(--bg-primary);

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkout-form__title {
  font-size: 20px;
  font-weight: 600;
}

.checkout-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.checkout-form__input,
.checkout-form__textarea {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--accent);
  font-size: 14px;
}

.checkout-form__textarea {
  min-height: 80px;
  resize: vertical;
}

.checkout-form__error {
  color: var(--error);
  font-size: 14px;
}
</style>
