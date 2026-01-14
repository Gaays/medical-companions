<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import CompanionCard from "../components/CompanionCard.vue";
import CompanionModal from "../components/CompanionModal.vue";
import ContactModal from "../components/ContactModal.vue";
import { useMockData } from "../../useMockData";

const { t } = useI18n();
const { companions } = useMockData();

// 筛选条件
const filters = ref({
  languages: [], // 多选语言
  gender: "any", // 性别筛选
  priceMin: 0, // 最低价格
  priceMax: 1000, // 最高价格
  district: "all", // 区域筛选
});

// 排序选项
const sortOption = ref("rating"); // 默认按星级排序

// 深圳区域列表
const districts = [
  { value: "all", label: t("companions.allDistricts") },
  { value: "nanshan", label: t("companions.nanshan") },
  { value: "futian", label: t("companions.futian") },
  { value: "luohu", label: t("companions.luohu") },
  { value: "yantian", label: t("companions.yantian") },
  { value: "baoan", label: t("companions.baoan") },
  { value: "longgang", label: t("companions.longgang") },
  { value: "longhua", label: t("companions.longhua") },
  { value: "pingshan", label: t("companions.pingshan") },
  { value: "dapeng", label: t("companions.dapeng") },
  { value: "guangming", label: t("companions.guangming") },
];

// 语言选项
const languages = [
  { value: "English", label: "English 🇺🇸" },
  { value: "Chinese", label: "Chinese 🇨🇳" },
  { value: "French", label: "French 🇫🇷" },
  { value: "German", label: "German 🇩🇪" },
  { value: "Spanish", label: "Spanish 🇪🇸" },
  { value: "Japanese", label: "Japanese 🇯🇵" },
  { value: "Korean", label: "Korean 🇰🇷" },
];

// 性别选项
const genders = [
  { value: "any", label: t("companions.anyGender") },
  { value: "male", label: t("companions.male") },
  { value: "female", label: t("companions.female") },
];

// 排序选项
const sortOptions = [
  { value: "rating", label: t("companions.sortByRating") },
  { value: "price", label: t("companions.sortByPrice") },
  { value: "distance", label: t("companions.sortByDistance") },
];

// 切换语言选择
const toggleLanguage = (language) => {
  const index = filters.value.languages.indexOf(language);
  if (index === -1) {
    filters.value.languages.push(language);
  } else {
    filters.value.languages.splice(index, 1);
  }
};

// 计算筛选后的看护人员列表
const filteredCompanions = computed(() => {
  return companions.value.filter((companion) => {
    // 语言筛选
    const matchesLanguage =
      filters.value.languages.length === 0 ||
      filters.value.languages.some((lang) =>
        companion.languages.includes(lang)
      );

    // 性别筛选
    const matchesGender =
      filters.value.gender === "any" ||
      companion.gender === filters.value.gender;

    // 价格筛选
    const matchesPrice =
      companion.price >= filters.value.priceMin &&
      companion.price <= filters.value.priceMax;

    // 区域筛选
    const matchesDistrict =
      filters.value.district === "all" ||
      companion.district === filters.value.district;

    return matchesLanguage && matchesGender && matchesPrice && matchesDistrict;
  });
});

// 计算排序后的看护人员列表
const sortedCompanions = computed(() => {
  const companions = [...filteredCompanions.value];

  switch (sortOption.value) {
    case "price":
      return companions.sort((a, b) => a.price - b.price);
    case "distance":
      return companions.sort((a, b) => a.distance - b.distance);
    case "rating":
    default:
      return companions.sort((a, b) => b.rating - a.rating);
  }
});

// 模态框状态管理
const selectedCompanion = ref(null);
const showContactModal = ref(false);

// 打开陪护人员详情弹窗
const openCompanionModal = (companion) => {
  selectedCompanion.value = companion;
};

// 关闭陪护人员详情弹窗
const closeCompanionModal = () => {
  selectedCompanion.value = null;
};

// 打开联系弹窗
const openContactModal = () => {
  showContactModal.value = true;
};

// 关闭联系弹窗
const closeContactModal = () => {
  showContactModal.value = false;
};
</script>

<template>
  <div class="companions-list-page">
    <!-- 页面标题 -->
    <section
      class="bg-gradient-to-r from-[#AAD9F1] to-[#DAEAF7] text-white py-12"
    >
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-2">{{ t("companions.pageTitle") }}</h1>
        <p class="">{{ t("companions.pageSubtitle") }}</p>
      </div>
    </section>

    <!-- 筛选和排序区域 -->
    <section class="bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧筛选面板 -->
          <div class="md:w-1/4 bg-white p-6 rounded-xl shadow-sm">
            <h2 class="text-xl font-semibold mb-6">
              {{ t("companions.filters") }}
            </h2>

            <!-- 语言筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">
                {{ t("companions.languages") }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="lang in languages"
                  :key="lang.value"
                  class="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :checked="filters.languages.includes(lang.value)"
                    @change="toggleLanguage(lang.value)"
                    class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span>{{ lang.label }}</span>
                </label>
              </div>
            </div>

            <!-- 性别筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">
                {{ t("companions.gender") }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="gender in genders"
                  :key="gender.value"
                  class="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    :value="gender.value"
                    :checked="filters.gender === gender.value"
                    @change="filters.gender = gender.value"
                    class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span>{{ gender.label }}</span>
                </label>
              </div>
            </div>

            <!-- 价格筛选 -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">
                {{ t("companions.priceRange") }}
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ t("companions.minPrice") }}: ¥{{ filters.priceMin }}
                  </label>
                  <input
                    type="range"
                    v-model.number="filters.priceMin"
                    min="0"
                    max="1000"
                    step="50"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ t("companions.maxPrice") }}: ¥{{ filters.priceMax }}
                  </label>
                  <input
                    type="range"
                    v-model.number="filters.priceMax"
                    min="0"
                    max="1000"
                    step="50"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <!-- 区域筛选 -->
            <div>
              <h3 class="text-lg font-medium mb-3">
                {{ t("companions.district") }}
              </h3>
              <select
                v-model="filters.district"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  v-for="district in districts"
                  :key="district.value"
                  :value="district.value"
                >
                  {{ district.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- 右侧内容区域 -->
          <div class="md:w-3/4">
            <!-- 排序和结果统计 -->
            <div
              class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-xl shadow-sm"
            >
              <div>
                <h2 class="text-xl font-semibold">
                  {{
                    t("companions.results", { count: sortedCompanions.length })
                  }}
                </h2>
              </div>
              <div class="mt-4 md:mt-0">
                <label class="mr-2 text-gray-700"
                  >{{ t("companions.sortBy") }}:</label
                >
                <select
                  v-model="sortOption"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option
                    v-for="option in sortOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- 看护人员卡片网格 -->
            <div
              v-if="sortedCompanions.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <CompanionCard
                v-for="companion in sortedCompanions"
                :key="companion.id"
                :companion="companion"
                @view-details="openCompanionModal"
              />
            </div>

            <!-- 无结果提示 -->
            <div v-else class="bg-white p-8 rounded-xl shadow-sm text-center">
              <h3 class="text-lg font-medium mb-2">
                {{ t("companions.noResults") }}
              </h3>
              <p class="text-gray-600">
                {{ t("companions.tryDifferentFilters") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- 陪护人员详情弹窗 -->
  <CompanionModal
    v-if="selectedCompanion"
    :companion="selectedCompanion"
    @close="closeCompanionModal"
    @contact="openContactModal"
  />

  <!-- 联系弹窗 -->
  <ContactModal v-if="showContactModal" @close="closeContactModal" />
</template>

<style scoped>
/* 页面特定样式 */
.companions-list-page {
  background-color: #f7f9fc;
}
</style>
