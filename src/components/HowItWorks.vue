<script setup>
import { useI18n } from 'vue-i18n'
import { Search, Calendar, Connection } from '@element-plus/icons-vue'

const { t, tm } = useI18n()

const icons = [Search, Calendar, Connection]
</script>

<template>
  <section class="bg-[#17342d] py-14 text-white md:py-18">
    <div class="container mx-auto px-4">
      <div class="mb-9 max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#91d0b7]">Process</p>
        <h2 class="mt-2 text-2xl font-bold text-white md:text-3xl">{{ t('how_it_works.title') }}</h2>
        <p class="mt-3 leading-7 text-[#c6d8d1]">{{ t('how_it_works.subtitle') }}</p>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="(step, index) in tm('how_it_works.steps')"
          :key="step.title"
          class="rounded-lg border border-white/10 bg-white/7 p-5"
        >
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#91d0b7] text-[#17342d]">
            <component :is="icons[index]" class="h-6 w-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-white">{{ step.title }}</h3>
          <p class="leading-7 text-[#c6d8d1]">{{ step.description }}</p>
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-white p-5 text-[#17342d] md:p-6">
        <h3 class="mb-4 text-xl font-bold">{{ t('how_it_works.painTitle') }}</h3>
        <ul class="grid gap-3 md:grid-cols-2">
          <li
            v-for="pain in tm('how_it_works.pains')"
            :key="pain"
            class="flex items-start gap-2 text-[#4f5f59]"
          >
            <font-awesome-icon icon="circle-check" class="mt-1 text-[#0f5f4c]" />
            <span>{{ pain }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
