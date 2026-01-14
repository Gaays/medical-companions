<script setup>
import { useI18n } from "vue-i18n";

// i18n 实例
const { t } = useI18n();
</script>

<template>
  <section class="relative text-white py-16 md:py-24 overflow-hidden">
    <!-- 背景图片 -->
    <img
      src="https://ai-public.mastergo.com/ai/img_res/339f341e962c49c84dd7d9238ad3c8f3.jpg"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover opacity-10"
    />
    <!-- 内容 -->
    <div
      class="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10"
    >
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ t("hero.title") }}
        </h2>
        <p class="text-lg mb-8 opacity-90">{{ t("hero.subtitle") }}</p>
        <button
          class="!rounded-button whitespace-nowrap bg-primary text-white px-6 py-3 font-medium hover:bg-gray-300 transition"
        >
          {{ t("hero.cta") }}
        </button>
      </div>
      <div class="md:w-1/2">
        <img
          src="https://ai-public.mastergo.com/ai/img_res/cc066b71814bbecac8ee80ac05c5dec2.jpg"
          alt="Medical Companion"
          class="rounded-lg shadow-xl object-cover w-full h-full"
        />
      </div>
    </div>
  </section>
</template>
