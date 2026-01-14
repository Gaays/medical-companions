<script setup>
import { useI18n } from 'vue-i18n';

// i18n 实例
const { t, locale } = useI18n();

// 语言切换函数
const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 class="text-lg font-bold mb-4 text-white">{{ t('app.name') }}</h4>
          <p class="text-gray-400">{{ t('footer.description') }}</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4 text-white">{{ t('footer.quick_links') }}</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition">{{ t('header.home') }}</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition">{{ t('header.companions') }}</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition">{{ t('header.how_it_works') }}</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition">{{ t('header.about_us') }}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4 text-white">{{ t('footer.contact') }}</h4>
          <ul class="space-y-2">
            <li class="flex items-center">
              <i class="fas fa-envelope mr-2 text-gray-400"></i>
              <span class="text-gray-400">{{ t('contact.email_address') }}</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone-alt mr-2 text-gray-400"></i>
              <span class="text-gray-400">{{ t('footer.phone') }}</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>
              <span class="text-gray-400">{{ t('footer.location') }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">{{ t('footer.language') }}</h4>
          <div class="flex items-center space-x-2">
            <button 
              @click="switchLanguage('en')"
              class="px-3 py-1 bg-gray-700 rounded-md text-sm hover:bg-gray-600 transition"
            >
              English
            </button>
            <button 
              @click="switchLanguage('zh')"
              class="px-3 py-1 bg-gray-600 rounded-md text-sm hover:bg-gray-500 transition"
            >
              中文
            </button>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 {{ t('app.name') }}. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>