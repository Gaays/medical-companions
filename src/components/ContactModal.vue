<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
    <div class="w-full rounded-t-lg bg-white p-5 shadow-xl sm:max-w-md sm:rounded-lg sm:p-6">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-xl font-bold text-[#17342d]">{{ t('contact.title') }}</h3>
        <button class="flex h-10 w-10 items-center justify-center rounded-md bg-[#f3f5f2]" @click="emit('close')" aria-label="Close">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <p class="mb-5 leading-7 text-[#5f6d68]">{{ t('contact.description') }}</p>
      <div class="space-y-3 rounded-lg bg-[#f5f7f4] p-4">
        <a href="mailto:doctor.me@email.com" class="block font-semibold text-[#0f5f4c]">{{ t('contact.email') }}: {{ t('contact.email_address') }}</a>
        <a href="https://wa.me/8612345678910" target="_blank" rel="noopener" class="block font-semibold text-[#0f5f4c]">{{ t('contact.whatsapp') }}: {{ t('contact.whatsapp_number') }}</a>
      </div>
      <p class="mt-4 text-sm leading-6 text-[#72592f]">{{ t('contact.privacy_note') }}</p>
    </div>
  </div>
</template>
