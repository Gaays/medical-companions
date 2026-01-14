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
        return { flag: "🇺🇸", name: t("languages.english") };
      case "chinese":
        return { flag: "🇨🇳", name: t("languages.chinese") };
      case "spanish":
        return { flag: "🇪🇸", name: t("languages.spanish") };
      case "french":
        return { flag: "🇫🇷", name: t("languages.french") };
      case "german":
        return { flag: "🇩🇪", name: t("languages.german") };
      case "japanese":
        return { flag: "🇯🇵", name: t("languages.japanese") };
      case "korean":
        return { flag: "🇰🇷", name: t("languages.korean") };
      default:
        return { flag: "🌐", name: lang };
    }
  });
});

// 计算属性：格式化区域显示
const formattedRegion = computed(() => {
  return t(`regions.${props.companion.region}`);
});

// 查看详情方法
const handleViewDetails = () => {
  emit("view-details", props.companion);
};
</script>

<template>
  <el-card class="companion-card">
    <template #header>
      <div class="card-header">
        <img :src="companion.avatar" :alt="companion.name" class="avatar" />
        <div class="name-rating">
          <h3>{{ companion.name }}</h3>
          <div class="rating">
            <el-rate
              :value="companion.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
        </div>
      </div>
    </template>

    <div class="card-content">
      <!-- 语言 -->
      <div class="info-item">
        <span class="label">{{ t("companion.languages") }}:</span>
        <div class="languages">
          <span
            v-for="(lang, index) in formattedLanguages"
            :key="index"
            class="language-tag"
          >
            {{ lang.flag }} {{ lang.name }}
          </span>
        </div>
      </div>

      <!-- 性别和区域 -->
      <div class="info-item">
        <div class="gender">
          <span class="label">{{ t("search.gender") }}:</span>
          <span class="value">{{ t(`search.${companion.gender}`) }}</span>
        </div>
        <div class="region">
          <span class="label">{{ t("companion.region") }}:</span>
          <span class="value">{{ formattedRegion }}</span>
        </div>
      </div>

      <!-- 价格和距离 -->
      <div class="info-item">
        <div class="price">
          <span class="label">{{ t("companion.price_per_hour") }}:</span>
          <span class="value price-value">¥{{ companion.price }}</span>
        </div>
        <div class="distance">
          <span class="label">{{ t("sorting.distance") }}:</span>
          <span class="value">{{ companion.distance }} km</span>
        </div>
      </div>

      <!-- 简介 -->
      <div class="info-item bio">
        <span class="label">{{ t("companion.bio") }}:</span>
        <p class="value">{{ companion.bio }}</p>
      </div>
    </div>

    <template #footer>
      <div class="card-footer">
        <el-button type="primary" size="small" @click="handleViewDetails">
          {{ t("companion.details") }}
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.companion-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f7ff;
  flex-shrink: 0;
}

.name-rating {
  flex: 1;
  min-width: 0;
}

.name-rating h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.rating {
  display: flex;
  align-items: center;
}

/* 评分组件样式 */
:deep(.el-rate) {
  font-size: 0.9rem;
}

:deep(.el-rate__text) {
  font-size: 0.9rem;
  margin-left: 8px;
}

.card-content {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.info-item {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-right: 0;
}

.value {
  color: var(--text-primary);
  font-size: 0.95rem;
}

/* 语言标签 */
.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0;
}

.language-tag {
  background-color: #f0f7ff;
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 18px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

/* 性别和区域 */
.info-item:nth-child(2) {
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 0;
}

.gender,
.region {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

/* 价格和距离 */
.info-item:nth-child(3) {
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 0;
}

.price,
.distance {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.price-value {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.1rem;
}

/* 简介 */
.bio .value {
  margin-top: 0;
  line-height: 1.6;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  justify-content: center;
  padding: 16px 0 0 0;
}

/* 按钮样式 */
:deep(.el-button--primary) {
  font-size: 0.95rem;
  padding: 8px 20px;
}
</style>
