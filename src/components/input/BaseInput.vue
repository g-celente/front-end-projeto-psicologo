<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
});
</script>

<template>
  <input
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :disabled="props.disabled"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  border-radius: 5px;
  padding: 0.15rem 0.3rem;
  border: 2px solid #f5f5f5;
  width: 100%;
  font-size: 0.875rem;
  background-color: #e9e9e9;
}

/* Estilos para o input quando estiver desabilitado */
input:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
  opacity: 0.6;
  border-color: #ccc;
}
</style>
