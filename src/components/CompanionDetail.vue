<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// 组件属性
const props = defineProps({
  companion: {
    type: Object,
    required: true
  }
})

// 事件定义
const emit = defineEmits(['close', 'contact'])

// i18n 实例
const { t } = useI18n()

// 控制对话框显示/隐藏
const visible = ref(true)

// 监听 companion 变化，控制对话框显示
watch(() => props.companion, (newVal) => {
  visible.value = !!newVal
})

// 监听对话框关闭事件
watch(visible, (newVal) => {
  if (!newVal) {
    emit('close')
  }
})

// 计算属性：格式化语言显示
const formattedLanguages = computed(() => {
  return props.companion.languages.map(lang => {
    // 根据语言返回对应的国旗和名称
    switch (lang) {
      case 'english':
        return { flag: '🇺🇸', name: t('languages.english') }
      case 'chinese':
        return { flag: '🇨🇳', name: t('languages.chinese') }
      case 'spanish':
        return { flag: '🇪🇸', name: t('languages.spanish') }
      case 'french':
        return { flag: '🇫🇷', name: t('languages.french') }
      case 'german':
        return { flag: '🇩🇪', name: t('languages.german') }
      case 'japanese':
        return { flag: '🇯🇵', name: t('languages.japanese') }
      case 'korean':
        return { flag: '🇰🇷', name: t('languages.korean') }
      default:
        return { flag: '🌐', name: lang }
    }
  })
})

// 计算属性：格式化区域显示
const formattedRegion = computed(() => {
  return t(`regions.${props.companion.region}`)
})

// 关闭详情方法
const handleClose = () => {
  emit('close')
}

// 联系方法
const handleContact = () => {
  emit('contact')
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="t('details.title')"
    width="700px"
    @close="handleClose"
  >
    <!-- 详情内容 -->
    <div class="companion-detail">
      <!-- 头部信息 -->
      <div class="detail-header">
        <img 
          :src="companion.avatar" 
          :alt="companion.name" 
          class="avatar-large"
        />
        <div class="header-info">
          <h2 class="name">{{ companion.name }}</h2>
          <div class="rating">
            <el-rate 
              :value="companion.rating" 
              disabled 
              show-score 
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
          <div class="gender-price">
            <span class="gender">
              {{ t('search.gender') }}: {{ t(`search.${companion.gender}`) }}
            </span>
            <span class="price">
              {{ t('companion.price_per_hour') }}: ¥{{ companion.price }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 主体信息 -->
      <div class="detail-body">
        <!-- 语言 -->
        <div class="detail-section">
          <h3 class="section-title">{{ t('companion.languages') }}</h3>
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
        
        <!-- 区域和距离 -->
        <div class="detail-section">
          <h3 class="section-title">{{ t('details.location') }}</h3>
          <div class="location-info">
            <span class="region">{{ formattedRegion }}</span>
            <span class="distance">{{ companion.distance }} km away</span>
          </div>
        </div>
        
        <!-- 擅长领域 -->
        <div class="detail-section">
          <h3 class="section-title">{{ t('details.擅长') }}</h3>
          <div class="specialties">
            <el-tag 
              v-for="(specialty, index) in companion.specialties" 
              :key="index" 
              type="primary"
              effect="light"
            >
              {{ specialty }}
            </el-tag>
          </div>
        </div>
        
        <!-- 个人介绍 -->
        <div class="detail-section">
          <h3 class="section-title">{{ t('details.introduction') }}</h3>
          <p class="introduction">{{ companion.introduction }}</p>
        </div>
      </div>
    </div>
    
    <!-- 底部操作按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ t('details.close') }}</el-button>
        <el-button type="primary" @click="handleContact">
          {{ t('companion.contact') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.companion-detail {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 头部信息样式 */
.detail-header {
  display: flex;
  gap: 30px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
}

.avatar-large {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f7ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

.name {
  font-size: 2rem; /* 32px */
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.rating {
  margin-bottom: 8px;
}

/* 评分组件样式 */
:deep(.el-rate) {
  font-size: 1rem;
}

:deep(.el-rate__text) {
  font-size: 1rem;
  margin-left: 10px;
}

.gender-price {
  display: flex;
  gap: 32px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
}

/* 主体信息样式 */
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 1.1rem; /* 18px */
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 3px solid var(--primary-color);
  width: fit-content;
}

/* 语言标签样式 */
.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.language-tag {
  background-color: #f0f7ff;
  color: var(--primary-color);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.language-tag:hover {
  background-color: #e0ebff;
  transform: translateY(-2px);
}

/* 位置信息样式 */
.location-info {
  display: flex;
  gap: 32px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
}

/* 擅长领域样式 */
.specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 标签样式 */
:deep(.el-tag) {
  font-size: 0.95rem;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

:deep(.el-tag:hover) {
  transform: translateY(-2px);
}

/* 个人介绍样式 */
.introduction {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  margin: 0;
  text-align: justify;
  white-space: pre-line;
}

/* 对话框样式 */
:deep(.el-dialog__header) {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

:deep(.el-dialog__title) {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-dialog__footer) {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  text-align: right;
}

:deep(.el-button) {
  font-size: 0.95rem;
  padding: 10px 20px;
  border-radius: 8px;
}

:deep(.el-button--primary) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.el-button--primary:hover) {
  background-color: #0040a0;
  border-color: #0040a0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .header-info {
    align-items: center;
  }
  
  .gender-price {
    justify-content: center;
    gap: 20px;
  }
  
  .location-info {
    justify-content: center;
    gap: 20px;
  }
  
  .name {
    font-size: 1.5rem;
  }
}
</style>