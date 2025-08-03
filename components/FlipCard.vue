<template>
  <div
    class="card-container h-[500px] w-full md:w-xs xl:w-md"
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
        class="card-face bg-[#1E3A8A]  rounded-lg p-4 absolute w-full h-full backface-hidden overflow-auto"
      >
      <div class="flex flex-col h-full justify-between">
        <p
          class="text-xl lg:text-2xl whitespace-pre-wrap font-bold text-white"
        >
          {{ id }}. {{ front }}
        </p>

          <p class="text-white text-lg text-right">{{ index + 1 }}/{{ cardStore.cards.length }}</p>
        </div>
      </div>

      <!-- Back Side -->
      <div
        class="card-face bg-[#E3F2FD]  rounded-lg p-4 absolute w-full h-full backface-hidden rotate-y-180 overflow-auto"
      >
        <p
          class="text-xl lg:text-2xl whitespace-pre-wrap font-bold text-[#1E3A8A]"
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
  index: number;
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
