<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Search, Calendar } from "@element-plus/icons-vue";

// i18n 实例
const { t } = useI18n();

// 服务流程数据
const howItWorks = ref([
  {
    title: "Find Your Companion",
    description:
      "Browse our network of professional medical companions in Shenzhen.",
  },
  {
    title: "Book Appointment",
    description: "Select your preferred companion and schedule your service.",
  },
  {
    title: "Get Assistance",
    description:
      "Your companion will meet you and assist with all medical needs.",
  },
]);

const primaryColor = ref("#0052CC");
</script>

<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-center mb-12 text-gray-800">
        {{ t("how_it_works.title") }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(step, index) in howItWorks"
          :key="index"
          class="text-center"
        >
          <div
            class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md"
          >
            <!-- 第一个图标：Star -->
            <el-icon
              v-if="index === 0"
              :color="primaryColor"
              :size="25"
              class="text-primary text-2xl"
            >
              <Search />
            </el-icon>
            <!-- 第二个图标：Calendar -->
            <el-icon
              v-else-if="index === 1"
              :size="25"
              :color="primaryColor"
              class="text-primary text-2xl"
            >
              <Calendar />
            </el-icon>
            <!-- 第三个图标：Logo SVG -->
            <img
              v-else
              src="/src/assets/svg/logo.svg"
              :alt="step.title"
              class="w-8 h-8 text-primary"
            />
          </div>
          <h4 class="font-bold text-lg mb-2">{{ step.title }}</h4>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
