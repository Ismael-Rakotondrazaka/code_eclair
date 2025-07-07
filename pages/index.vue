<script setup lang="ts">
import { NCarousel } from "naive-ui";
import { useCardStore } from "~/store/card";

const cardStore = useCardStore();

const onUpdateCurrentIndex = (index: number) => {
  cardStore.setCurrentIndex(index);
};

const { width } = useWindowSize();

const isLarge = computed(() => width.value < 1024); // Adjust breakpoint as needed
const slidesPerView = computed(() => (isLarge.value ? 1 : 3));
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <div
    class="w-full min-h-[calc(100vh-88px)] flex flex-wrap justify-center items-center"
  >
    <div class="w-full py-3">
      <h1 class="text-center text-lg font-bold mb-3 text-[#1E3A8A]">
        Chapitre {{ cardStore.currentChapter.id }}&nbsp;:
        {{ cardStore.currentChapter.title }}
      </h1>

      <n-carousel
        id="carousel"
        :current-index="cardStore.currentIndex"
        :slides-per-view="slidesPerView"
        :space-between="10"
        :loop="false"
        draggable
        centered-slides
        :on-update:current-index="onUpdateCurrentIndex"
        class="mb-5"
        :show-dots="false"
      >
        <FlipCard
          v-for="card in cardStore.cards"
          :id="card.id"
          :key="card.id"
          :is-current="cardStore.current.id === card.id"
          class="mx-auto"
          :back="card.back"
          :front="card.front"
        />
      </n-carousel>

      <div
        class="fixed left-0 right-0 bottom-7 lg:bottom-10 flex justify-center w-full z-10"
      >
        <n-flex justify="center" align="center" size="large">
          <n-button
            :disabled="!cardStore.havePrevious"
            circle
            size="large"
            class="xl:![--n-width:60px] xl:![--n-height:60px] xl:![--n-icon-size:30px]"
            @click="cardStore.previous()"
          >
            <template #icon>
              <Icon name="mdi:skip-previous" />
            </template>
          </n-button>

          <n-button
            primary
            type="primary"
            circle
            size="large"
            class="xl:![--n-width:70px] xl:![--n-height:70px] xl:![--n-icon-size:50px]"
            @click="cardStore.randomize()"
          >
            <template #icon>
              <Icon name="mdi:shuffle" />
            </template>
          </n-button>

          <n-button
            :disabled="!cardStore.haveNext"
            circle
            size="large"
            class="xl:![--n-width:60px] xl:![--n-height:60px] xl:![--n-icon-size:30px]"
            @click="cardStore.next()"
          >
            <template #icon>
              <Icon name="mdi:skip-next" />
            </template>
          </n-button>
        </n-flex>
      </div>
    </div>

    <n-tooltip trigger="hover" placement="right">
      <template #trigger>
        <n-float-button right="1rem" bottom="1rem">
          <Icon name="mdi:information-variant" />
        </n-float-button>
      </template>
      <template #default>
        <div class="text-center">
          <p class="text-sm">
            &copy;
            <span class="font-bold">Code Éclair</span> {{ year }}
            Tous droits réservés.
          </p>
        </div>
      </template>
    </n-tooltip>
  </div>
</template>

<style scoped></style>
