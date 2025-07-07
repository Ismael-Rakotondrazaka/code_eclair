<template>
  <div
    class="card-container h-[500px] w-sm"
    :style="{
      perspective: '1000px',
    }"
    @click="handleClick"
  >
    <div
      class="card-inner transition-transform duration-500 ease-in-out"
      :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Front Side -->
      <div
        class="card-face bg-[#1E3A8A] p-4 flex flex-col justify-center items-center absolute w-full h-full backface-hidden overflow-auto"
      >
        <p
          class="text-base lg:text-lg whitespace-pre-wrap font-bold text-white"
        >
          {{ id }}. {{ front }}
        </p>
      </div>

      <!-- Back Side -->
      <div
        class="card-face bg-[#E3F2FD] p-4 flex flex-col justify-center items-center absolute w-full h-full backface-hidden rotate-y-180 overflow-auto"
      >
        <p
          class="text-base lg:text-lg whitespace-pre-wrap font-bold text-[#1E3A8A]"
        >
          {{ back }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCardStore } from "~/store/card";

interface Props {
  isCurrent: boolean;
  id: number;
  front: string;
  back: string;
}

const props = defineProps<Props>();

const isFlipped = ref(false);

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};

const cardStore = useCardStore();

const handleClick = () => {
  if (props.isCurrent) {
    toggleFlip();
  } else {
    cardStore.setCurrent(props.id);
  }
};

watch(
  () => props.isCurrent,
  (newValue) => {
    if (!newValue) {
      isFlipped.value = false; // Reset flip state when current card changes
    }
  }
);
</script>

<style scoped>
.card-container {
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.card-face {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
