<script setup>
import { useI18n } from 'vue-i18n';

// i18n 实例
const { t } = useI18n();

// 定义组件props
const props = defineProps({
  companion: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value === 'object' && 'name' in value && 'image' in value;
    }
  }
});

// 定义组件事件
const emit = defineEmits(['close', 'contact']);

// 关闭弹窗
const closeModal = () => {
  emit('close');
};

// 打开联系弹窗
const openContactModal = () => {
  emit('contact');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="relative">
        <img 
          :src="companion.image" 
          :alt="companion.name"
          class="w-full h-64 object-cover"
        >
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-2xl font-bold">{{ companion.name }}</h3>
            <div class="flex items-center mt-1">
              <div class="flex mr-2">
                <font-awesome-icon icon="star" class="text-yellow-400 mr-1" />
                <span>{{ companion.rating }}</span>
              </div>
              <span class="text-gray-500 text-sm">
                <font-awesome-icon icon="map-marker-alt" class="mr-1" />
                {{ companion.location }}
              </span>
            </div>
          </div>
          <span class="text-primary font-bold text-xl">¥{{ companion.price }}/h</span>
        </div>
        
        <div class="mb-6">
          <h4 class="font-bold mb-2">{{ t('companion.languages') }}</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(lang, i) in companion.languages" 
              :key="i" 
              class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
            >
              {{ lang }}
            </span>
          </div>
        </div>
        
        <div class="mb-6">
          <h4 class="font-bold mb-2">{{ t('companion.about_me') }}</h4>
          <p class="text-gray-700">{{ companion.description }}</p>
        </div>
        
        <div class="mb-6">
          <h4 class="font-bold mb-2">{{ t('companion.services') }}</h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li 
              v-for="(service, i) in companion.services" 
              :key="i" 
              class="flex items-center"
            >
              <font-awesome-icon icon="check-circle" class="text-green-500 mr-2" />
              <span>{{ service }}</span>
            </li>
          </ul>
        </div>
        
        <button 
          @click="openContactModal"
          class="!rounded-button whitespace-nowrap w-full bg-primary text-white py-3 font-medium hover:bg-blue-700 transition"
        >
          {{ t('companion.contact') }}
        </button>
      </div>
    </div>
  </div>
</template>