<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CompanionCard from './CompanionCard.vue'
import { useMockData } from '../../useMockData'

const { t } = useI18n()
const emit = defineEmits(['open-modal'])
const { companions } = useMockData()

const featuredCompanions = computed(() => companions.value.slice(0, 3))
</script>

<template>
  <section class="bg-white py-14 md:py-18">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">Service paths</p>
          <h2 class="mt-2 text-2xl font-bold text-[#17342d] md:text-3xl">{{ t('featured.title') }}</h2>
          <p class="mt-2 max-w-2xl leading-7 text-[#5f6d68]">{{ t('featured.subtitle') }}</p>
        </div>
        <NuxtLink to="/services" class="font-semibold text-[#0f5f4c] hover:text-[#0b4336]">
          {{ t('featured.view_all') }}
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
        <CompanionCard
          v-for="companion in featuredCompanions"
          :key="companion.id"
          :companion="companion"
          @view-details="emit('open-modal', companion)"
        />
      </div>
    </div>
  </section>
</template>
