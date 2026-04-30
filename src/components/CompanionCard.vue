<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  companion: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

const emit = defineEmits(['view-details'])

const formattedRegion = computed(() => t(`regions.${props.companion.region}`))
const serviceType = computed(() => t(`serviceTypes.${props.companion.serviceType}`))
const usdPrice = computed(() => Math.round(props.companion.price / 7))

const handleViewDetails = () => {
  emit('view-details', props.companion)
}
</script>

<template>
  <article class="service-card flex h-full flex-col rounded-lg border border-[#d8e3de] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <div class="mb-4 flex items-start justify-between gap-3">
      <div>
        <span class="inline-flex rounded-full bg-[#e7f2ed] px-3 py-1 text-xs font-semibold text-[#245c4c]">
          {{ serviceType }}
        </span>
        <h3 class="mt-4 text-xl font-bold leading-snug text-[#17342d]">{{ companion.name }}</h3>
      </div>
      <div class="shrink-0 rounded-lg bg-[#f2eee5] px-3 py-2 text-right">
        <span class="block text-xs font-semibold text-[#72592f]">From</span>
        <span class="block text-lg font-bold text-[#17342d]">RMB ¥{{ companion.price }}</span>
        <span class="block text-xs text-[#66736f]">~${{ usdPrice }}</span>
      </div>
    </div>

    <p class="mb-4 flex-1 text-sm leading-6 text-[#5f6d68]">{{ companion.bio }}</p>

    <div class="mb-5 flex flex-wrap gap-2">
      <span
        v-for="specialty in companion.specialties.slice(0, 3)"
        :key="specialty"
        class="rounded-md bg-[#f5f7f4] px-2.5 py-1 text-xs text-[#4b5c56]"
      >
        {{ specialty }}
      </span>
    </div>

    <div class="mt-auto flex flex-col gap-3 border-t border-[#e3ebe7] pt-4 sm:flex-row sm:items-center sm:justify-between">
      <span class="text-sm font-medium text-[#5f6d68]">
        <font-awesome-icon icon="location-dot" class="mr-1 text-[#3f7d68]" />
        {{ formattedRegion }}
      </span>
      <button
        class="rounded-md bg-[#0f5f4c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b4336]"
        @click.stop="handleViewDetails"
      >
        {{ t('companion.view_profile') }}
      </button>
    </div>
  </article>
</template>
