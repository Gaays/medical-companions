<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

// i18n 实例
const { t, locale } = useI18n();

// 语言切换状态
const showLanguageMenu = ref(false);

// 切换语言显示状态
const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

// 语言切换函数
const switchLanguage = (lang) => {
  locale.value = lang;
  showLanguageMenu.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img src="../assets/svg/logo.svg" alt="CareConnect Logo" class="h-8 w-auto" />
        <h1 class="text-xl font-bold text-gray-800">{{ t('app.name') }}</h1>
      </div>
      <nav class="hidden md:flex space-x-8">
        <router-link to="/" class="text-gray-700 hover:text-primary transition">{{ t('header.home') }}</router-link>
        <router-link to="/companions" class="text-gray-700 hover:text-primary transition">{{ t('header.companions') }}</router-link>
        <a href="#" class="text-gray-700 hover:text-primary transition">{{ t('header.how_it_works') }}</a>
        <a href="#" class="text-gray-700 hover:text-primary transition">{{ t('header.about_us') }}</a>
      </nav>
      <div class="flex items-center space-x-4">
        <!-- 语言切换器 -->
        <div class="relative">
          <button 
            class="flex items-center space-x-1 text-gray-700 hover:text-primary transition"
            @click="toggleLanguageMenu"
          >
            <span class="text-sm">{{ locale === 'en' ? 'EN' : '中文' }}</span>
            <font-awesome-icon icon="chevron-down" class="text-xs" />
          </button>
          <!-- 语言切换菜单 -->
          <div 
            v-if="showLanguageMenu" 
            class="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <button 
              @click="switchLanguage('en')"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              English
            </button>
            <button 
              @click="switchLanguage('zh')"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              中文
            </button>
          </div>
        </div>
        <!-- 移动端汉堡菜单按钮 -->
        <button class="md:hidden">
          <font-awesome-icon icon="bars" class="text-xl text-gray-700" />
        </button>
      </div>
    </div>
  </header>
</template>