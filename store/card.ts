import { merge } from "es-toolkit";
import { defineStore } from "pinia";

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
  const cards = ref<Card[]>(
    cardsData.flatMap((cards, index) =>
      cards.map((card) =>
        merge(
          {
            chapterId: index + 1, // Assuming chapters are 1-indexed
          },
          card
        )
      )
    )
  );
  const chapterIdMap = computed<Map<number, Chapter>>(() => {
    const map = new Map<number, Chapter>();

    chaptersData.forEach((chapter) => {
      map.set(chapter.id, chapter);
    });

    return map;
  });
  const currentIndex = ref(0);
  const total = computed(() => cards.value.length);
  const current = computed(() => cards.value[currentIndex.value]);
  const currentChapter = computed<Chapter>(
    () => chapterIdMap.value.get(current.value.chapterId)!
  );
  const haveNext = computed(() => currentIndex.value < total.value - 1);
  const next = () => {
    if (haveNext.value) {
      currentIndex.value++;
    }
  };
  const havePrevious = computed(() => currentIndex.value > 0);
  const previous = () => {
    if (havePrevious.value) {
      currentIndex.value--;
    }
  };
  const randomize = () => {
    currentIndex.value = Math.floor(Math.random() * total.value);
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

  return {
    cards,
    currentIndex,
    setCurrentIndex,
    setCurrent,
    currentChapter,
    total,
    current,
    haveNext,
    havePrevious,
    next,
    previous,
    randomize,
  };
});
