<script setup>
const props = defineProps({
  label: String,
  customCLick: Function,
  disabled: Boolean,
});
</script>

<template>
  <button
    :class="[
      'py-1 px-4 bg-secondary text-white rounded-md transition duration-300',
      props.disabled ? 'opacity-30 bg-secondary cursor-not-allowed' : 'hover:bg-primary'
    ]"
    :disabled="props.disabled"
    @click="props.customCLick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
/* As classes customizadas 'bg-secondary' e 'bg-primary' podem ser definidas no seu arquivo de configuração Tailwind ou substituídas por cores Tailwind específicas. */
</style>
