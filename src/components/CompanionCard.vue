<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

// 组件属性
const props = defineProps({
  companion: {
    type: Object,
    required: true,
  },
});

// 事件定义
const emit = defineEmits(["view-details"]);

// i18n 实例
const { t } = useI18n();

// 计算属性：格式化语言显示
const formattedLanguages = computed(() => {
  return props.companion.languages.map((lang) => {
    // 根据语言返回对应的国旗和名称
    switch (lang) {
      case "english":
        return { flag: "🇺🇸", name: t("languages.english"), displayName: "English" };
      case "chinese":
        return { flag: "🇨🇳", name: t("languages.chinese"), displayName: "Chinese" };
      case "spanish":
        return { flag: "🇪🇸", name: t("languages.spanish"), displayName: "Spanish" };
      case "french":
        return { flag: "🇫🇷", name: t("languages.french"), displayName: "French" };
      case "german":
        return { flag: "🇩🇪", name: t("languages.german"), displayName: "German" };
      case "japanese":
        return { flag: "🇯🇵", name: t("languages.japanese"), displayName: "Japanese" };
      case "korean":
        return { flag: "🇰🇷", name: t("languages.korean"), displayName: "Korean" };
      default:
        return { flag: "🌐", name: lang, displayName: lang };
    }
  });
});

// 计算属性：格式化区域显示
const formattedRegion = computed(() => {
  return t(`regions.${props.companion.region}`);
});

// 计算属性：美元价格（汇率假设为1美元=7人民币）
const usdPrice = computed(() => {
  return (props.companion.price / 7).toFixed(2);
});

// 查看详情方法
const handleViewDetails = () => {
  emit("view-details", props.companion);
};
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
    @click="handleViewDetails"
  >
    <div class="relative">
      <img
        :src="companion.avatar"
        :alt="companion.name"
        class="w-full h-48 object-cover"
      />
      <div
        class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center text-sm"
      >
        <font-awesome-icon icon="star" class="text-yellow-400 mr-1" />
        <span>{{ companion.rating }}</span>
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold text-lg">{{ companion.name }}</h4>
        <div class="text-right">
          <span class="text-primary font-medium block">¥{{ companion.price }}/h</span>
          <span class="text-gray-500 text-sm">${{ usdPrice }}/h</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(lang, i) in formattedLanguages"
          :key="i"
          class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
        >
          {{ lang.flag }} {{ lang.displayName }}
        </span>
      </div>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ companion.bio }}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-gray-500 text-sm flex items-center">
          <font-awesome-icon icon="map-marker-alt" class="mr-1" />
          {{ formattedRegion }}
        </span>
        <button
          class="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm hover:bg-blue-700 transition"
          @click.stop="handleViewDetails"
        >
          {{ t("companion.view_profile") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
:deep(.bg-primary) {
  background-color: var(--primary-color);
}

:deep(.text-primary) {
  color: var(--primary-color);
}
</style>
