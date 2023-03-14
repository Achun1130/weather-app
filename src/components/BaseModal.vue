<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        class="absolute top-0 left-0 flex h-screen w-full justify-center bg-black/30 px-8 font-Roboto-Mono"
        v-show="modalActive"
        @click.self="$emit('close-modal')"
      >
        <Transition name="modal-inner">
          <div
            class="mt-32 max-w-screen-md self-start rounded bg-white p-4"
            v-if="modalActive"
          >
            <slot />
            <button
              type="button"
              class="mt-8 bg-weather-primary py-2 px-6 text-white"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close-modal"]);
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.05, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.05, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.05, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
