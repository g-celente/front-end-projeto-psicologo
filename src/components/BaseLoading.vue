<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: Number,
    default: null,
  },
  closeIcon: {
    type: Boolean,
    default: true,
  },
  closeBackdrop: {
    type: Boolean,
    default: false,
  },
});

const dimensions = () => {
  if (window.innerWidth < 1200) {
    return `height: fit-content; width:90%`;
  }
  if (props.height) {
    return `height: ${props.height}px; width:${props.width}px`;
  } else {
    return `width: ${props.width}px`;
  }
};

const spacing = () => {
  if (props.padding) {
    return `padding: ${props.padding}px`;
  }
};
</script>

<template>
  <Transition name="fade">
    <div v-if="props.open" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        @click.stop=""
        class="modal relative bg-white rounded-lg shadow-xl overflow-auto flex flex-col max-h-[95vh] cursor-auto"
        :style="`${dimensions()}; ${spacing()}`"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <svg
          v-if="props.closeIcon"
          @click="$emit('close')"
          class="absolute top-8 right-8 cursor-pointer z-10"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99999 5.58574L11.95 0.635742L13.364 2.04974L8.41399 6.99974L13.364 11.9497L11.95 13.3637L6.99999 8.41374L2.04999 13.3637L0.635986 11.9497L5.58599 6.99974L0.635986 2.04974L2.04999 0.635742L6.99999 5.58574Z"
            fill="var(--text-color)"
          />
        </svg>

        <div class="modal-header p-4" id="modalTitle">
          <slot name="header"></slot>
        </div>

        <section class="modal-body p-4 overflow-auto" id="modalDescription">
          <slot name="body"></slot>
        </section>

        <footer class="modal-footer p-4">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal {
  z-index: 99999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  padding: 1.5rem;
  background: #fff;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
  overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
