<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import CompanionCard from "./CompanionCard.vue";
import { useMockData } from "../../useMockData";

// i18n 实例
const { t } = useI18n();

// 定义组件事件
const emit = defineEmits(["open-modal"]);

// 使用模拟数据
const { companions } = useMockData();

// 精选陪护人员数据（取前3个）
const featuredCompanions = computed(() => {
  return companions.value.slice(0, 3);
});

// 打开陪护人员详情弹窗
const openModal = (companion) => {
  emit("open-modal", companion);
};
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-2xl font-bold text-gray-800">
          {{ t("featured.title") }}
        </h3>
        <router-link to="/companions" class="text-primary hover:underline">{{
          t("featured.view_all")
        }}</router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CompanionCard 
          v-for="companion in featuredCompanions" 
          :key="companion.id"
          :companion="companion"
          @view-details="openModal"
        />
      </div>
    </div>
  </section>
</template>
