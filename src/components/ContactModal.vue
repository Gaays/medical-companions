<script setup>
import { useI18n } from 'vue-i18n';

// i18n 实例
const { t } = useI18n();

// 定义组件事件
const emit = defineEmits(['close']);

// 关闭弹窗
const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">{{ t('contact.title') }}</h3>
        <button 
          @click="closeModal"
          class="text-gray-500 hover:text-gray-700"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <p class="mb-6 text-gray-700">{{ t('contact.description') }}</p>
      <div class="bg-gray-100 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ t('contact.email') }}:</span>
          <span class="text-primary">{{ t('contact.email_address') }}</span>
        </div>
      </div>
      <button 
        @click="closeModal"
        class="!rounded-button whitespace-nowrap w-full bg-primary text-white py-3 font-medium hover:bg-blue-700 transition"
      >
        {{ t('contact.close') }}
      </button>
    </div>
  </div>
</template>