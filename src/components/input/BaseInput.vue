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
    :class="[
      'rounded-md px-2 py-1 border-2 w-full',
      props.disabled ? 'bg-gray-400 cursor-not-allowed' : 'border-gray-500',
    ]"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    :disabled="props.disabled"
  />
</template>

<style scoped>
/* A classe bg-gray-400 e border-gray-500 são utilizadas aqui para representar os estilos de desabilitado e padrão, respectivamente. */
</style>
