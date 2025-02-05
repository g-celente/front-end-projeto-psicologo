<script setup>
const props = defineProps({
  label: String,
  customCLick: Function,
  disabled: Boolean,
});
</script>

<template>
  <button
    :class="props.disabled ? 'disabled' : ''"
    :disabled="props.disabled"
    @click="props.customCLick"
  >
    {{ props.label }}
  </button>
</template>

<style>
button {
  padding: 0.3rem 1rem;
  background-color: #636363;
  border-radius: 8px;
  color: #fff;

  &:hover {
    background-color: #E5E5E5;
    transition: 0.3s;
  }
}

.disabled {
  opacity: 0.3;
  background-color: #2D2D2D !important;

  &:hover {
    background-color: #2D2D2D;
  }
}
</style>