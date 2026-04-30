<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  companion: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'contact'])
const { t } = useI18n()

const serviceType = computed(() => t(`serviceTypes.${props.companion.serviceType}`))
const region = computed(() => t(`regions.${props.companion.region}`))
const usdPrice = computed(() => Math.round(props.companion.price / 7))
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
    <div class="max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 shadow-xl sm:max-w-2xl sm:rounded-lg sm:p-6">
      <div class="mb-5 flex items-start justify-between gap-4">
        <div>
          <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-xs font-semibold text-[#245c4c]">{{ serviceType }}</span>
          <h2 class="mt-4 text-2xl font-bold leading-tight text-[#17342d]">{{ companion.name }}</h2>
          <p class="mt-2 text-sm font-medium text-[#5f6d68]">
            <font-awesome-icon icon="location-dot" class="mr-1 text-[#3f7d68]" />
            {{ region }}
          </p>
        </div>
        <button
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f3f5f2] text-[#4f5f59] hover:bg-[#e5ebe6]"
          @click="emit('close')"
          aria-label="Close"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>

      <div class="mb-6 rounded-lg border border-[#d8e3de] bg-[#fbfcfb] p-4">
        <div class="text-sm font-semibold text-[#66736f]">{{ t('details.price') }}</div>
        <div class="mt-1 text-2xl font-bold text-[#17342d]">RMB ¥{{ companion.price }} <span class="text-base font-medium text-[#66736f]">(~${{ usdPrice }})</span></div>
      </div>

      <section class="mb-6">
        <h3 class="mb-2 text-lg font-bold text-[#17342d]">{{ t('companion.about_me') }}</h3>
        <p class="leading-7 text-[#4f5f59]">{{ companion.introduction }}</p>
      </section>

      <section class="mb-6">
        <h3 class="mb-3 text-lg font-bold text-[#17342d]">{{ t('companion.services') }}</h3>
        <ul class="grid gap-2 sm:grid-cols-2">
          <li
            v-for="specialty in companion.specialties"
            :key="specialty"
            class="flex items-start gap-2 rounded-md bg-[#f5f7f4] px-3 py-2 text-sm text-[#4f5f59]"
          >
            <font-awesome-icon icon="check-circle" class="mt-1 text-[#3f7d68]" />
            <span>{{ specialty }}</span>
          </li>
        </ul>
      </section>

      <p class="mb-5 rounded-md bg-[#fff8e6] px-4 py-3 text-sm leading-6 text-[#72592f]">
        {{ t('footer.disclaimer') }}
      </p>

      <button
        class="w-full rounded-md bg-[#0f5f4c] px-5 py-3 font-semibold text-white transition hover:bg-[#0b4336]"
        @click="emit('contact')"
      >
        {{ t('companion.contact') }}
      </button>
    </div>
  </div>
</template>
