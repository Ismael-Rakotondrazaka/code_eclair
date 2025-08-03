import { defineStore } from "pinia";
import { reactive, ref, computed, watch } from "vue";

import cardsData from "~/assets/data/cards.json";
import chaptersData from "~/assets/data/chapters.json";

interface Card {
  id: number;
  front: string;
  back: string;
  chapterId: number;
}

interface Chapter {
  id: number;
  title: string;
}

export const useCardStore = defineStore("card", () => {
  const chapterIdMap = reactive(
    new Map<number, Chapter>(
      chaptersData.map((chapter) => [chapter.id, chapter])
    )
  );

  const currentIndex = ref<number>(0);
  const currentChapterId = ref<number | null>(null);

  const currentChapter = computed<Chapter | null>(
    () =>
      currentChapterId.value
        ? chapterIdMap.get(currentChapterId.value)!
        : null
  );

  const chapterIdCardsMap = reactive(
    new Map<number, Card[]>(
      cardsData.map((cards, index) => [
        index + 1,
        cards.map((card) => ({ ...card, chapterId: index + 1 })),
      ])
    )
  );
  const allCards = computed(() =>
    Array.from(chapterIdCardsMap.values()).flat()
  );

  const cards = computed<Card[]>(() =>
    currentChapterId.value !== null
      ? chapterIdCardsMap.get(currentChapterId.value) || []
      : allCards.value
  );

  const total = computed<number>(() => cards.value.length);
  const current = computed<Card | undefined>(() => cards.value[currentIndex.value]);

  watch(
    currentChapterId,
    () => {
      currentIndex.value = Math.floor(Math.random() * total.value);
    },
    {
      immediate: false,
    }
  );
  watch(cards, () => {
    currentIndex.value = Math.floor(Math.random() * total.value);
  });

  const haveNext = computed(() => currentIndex.value < total.value - 1);
  const next = () => {
    if (haveNext.value && total.value > 0) {
      currentIndex.value++;
    }
  };
  const havePrevious = computed(() => currentIndex.value > 0);
  const previous = () => {
    if (havePrevious.value && total.value > 0) {
      currentIndex.value--;
    }
  };
  const randomize = () => {
    if (total.value > 0) {
      currentIndex.value = Math.floor(Math.random() * total.value);
    }
  };

  const setCurrentIndex = (index: number) => {
    if (index >= 0 && index < total.value) {
      currentIndex.value = index;
    }
  };

  const setCurrent = (id: number) => {
    const index = cards.value.findIndex((card) => card.id === id);
    if (index !== -1) {
      currentIndex.value = index;
    }
  };

  const setCurrentChapter = (chapterId: number | null) => {
    if (chapterId === null || chapterIdMap.has(chapterId)) {
      currentChapterId.value = chapterId;
    }
  };

  return {
    cards,
    currentIndex,
    setCurrentIndex,
    setCurrent,
    setCurrentChapter,
    currentChapter,
    total,
    current,
    haveNext,
    havePrevious,
    chapters: chaptersData,
    next,
    previous,
    randomize,
  };
});
