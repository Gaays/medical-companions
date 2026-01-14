<script setup>
import { useI18n } from 'vue-i18n'

// 组件属性
const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  sorting: {
    type: Object,
    required: true
  }
})

// 事件定义
const emit = defineEmits(['update:filters', 'update:sorting', 'search', 'reset'])

// i18n 实例
const { t } = useI18n()

// 可选的语言列表
const languageOptions = [
  { label: t('languages.english'), value: 'english' },
  { label: t('languages.chinese'), value: 'chinese' },
  { label: t('languages.spanish'), value: 'spanish' },
  { label: t('languages.french'), value: 'french' },
  { label: t('languages.german'), value: 'german' },
  { label: t('languages.japanese'), value: 'japanese' },
  { label: t('languages.korean'), value: 'korean' }
]

// 可选的性别列表
const genderOptions = [
  { label: t('search.any'), value: 'any' },
  { label: t('search.male'), value: 'male' },
  { label: t('search.female'), value: 'female' }
]

// 可选的区域列表
const regionOptions = [
  { label: t('search.any'), value: '' },
  { label: t('regions.nanshan'), value: 'nanshan' },
  { label: t('regions.futian'), value: 'futian' },
  { label: t('regions.luohu'), value: 'luohu' },
  { label: t('regions.baoan'), value: 'baoan' },
  { label: t('regions.longgang'), value: 'longgang' },
  { label: t('regions.longhua'), value: 'longhua' },
  { label: t('regions.光明'), value: '光明' },
  { label: t('regions.pingshan'), value: 'pingshan' },
  { label: t('regions.dapeng'), value: 'dapeng' },
  { label: t('regions.yantian'), value: 'yantian' }
]

// 可选的排序字段列表
const sortFieldOptions = [
  { label: t('sorting.price'), value: 'price' },
  { label: t('sorting.distance'), value: 'distance' }
]

// 可选的排序方向列表
const sortDirectionOptions = [
  { label: t('sorting.ascending'), value: 'asc' },
  { label: t('sorting.descending'), value: 'desc' }
]

// 更新筛选条件
const updateFilters = (key, value) => {
  const newFilters = { ...props.filters, [key]: value }
  emit('update:filters', newFilters)
}

// 更新排序条件
const updateSorting = (key, value) => {
  const newSorting = { ...props.sorting, [key]: value }
  emit('update:sorting', newSorting)
}

// 搜索方法
const handleSearch = () => {
  emit('search')
}

// 重置筛选条件
const handleReset = () => {
  const defaultFilters = {
    languages: [],
    gender: 'any',
    minPrice: 0,
    maxPrice: 200,
    region: ''
  }
  const defaultSorting = {
    field: 'price',
    direction: 'asc'
  }
  emit('update:filters', defaultFilters)
  emit('update:sorting', defaultSorting)
  emit('reset')
}
</script>

<template>
  <el-card class="search-section">
    <h3 class="section-title">{{ t('hero.title') }}</h3>
    
    <div class="search-form">
      <!-- 语言筛选 -->
      <div class="form-item">
        <label class="form-label">{{ t('search.language') }}</label>
        <el-select
          v-model="filters.languages"
          multiple
          filterable
          allow-create
          :placeholder="t('search.language')"
          @change="updateFilters('languages', $event)"
        >
          <el-option
            v-for="option in languageOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
      
      <!-- 性别筛选 -->
      <div class="form-item">
        <label class="form-label">{{ t('search.gender') }}</label>
        <el-select
          v-model="filters.gender"
          :placeholder="t('search.gender')"
          @change="updateFilters('gender', $event)"
        >
          <el-option
            v-for="option in genderOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
      
      <!-- 价格范围筛选 -->
      <div class="form-item">
        <label class="form-label">{{ t('search.price_range') }}</label>
        <div class="price-range">
          <el-input-number
            v-model="filters.minPrice"
            :min="0"
            :max="filters.maxPrice"
            :step="5"
            @change="updateFilters('minPrice', $event)"
            class="price-input"
            :placeholder="t('search.min_price')"
          />
          <span class="price-separator">-</span>
          <el-input-number
            v-model="filters.maxPrice"
            :min="filters.minPrice"
            :max="200"
            :step="5"
            @change="updateFilters('maxPrice', $event)"
            class="price-input"
            :placeholder="t('search.max_price')"
          />
        </div>
      </div>
      
      <!-- 区域筛选 -->
      <div class="form-item">
        <label class="form-label">{{ t('search.region') }}</label>
        <el-select
          v-model="filters.region"
          :placeholder="t('search.region')"
          @change="updateFilters('region', $event)"
        >
          <el-option
            v-for="option in regionOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </div>
      
      <!-- 排序条件 -->
      <div class="form-item sorting">
        <label class="form-label">Sort By</label>
        <div class="sorting-options">
          <el-select
            v-model="sorting.field"
            @change="updateSorting('field', $event)"
            class="sort-select"
          >
            <el-option
              v-for="option in sortFieldOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
          <el-select
            v-model="sorting.direction"
            @change="updateSorting('direction', $event)"
            class="sort-select"
          >
            <el-option
              v-for="option in sortDirectionOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="form-item actions">
        <el-button type="primary" @click="handleSearch">{{ t('search.search') }}</el-button>
        <el-button @click="handleReset">{{ t('search.reset') }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.search-section {
  margin-bottom: 32px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.section-title {
  font-size: 1.3rem; /* 21px */
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  text-align: center;
}

.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  align-items: end;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 价格范围样式 */
.price-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-input {
  width: 110px;
}

.price-separator {
  color: var(--text-light);
  font-size: 18px;
  font-weight: 500;
}

/* 排序选项样式 */
.sorting-options {
  display: flex;
  gap: 12px;
}

.sort-select {
  flex: 1;
  font-size: 0.95rem;
}

/* 操作按钮样式 */
.actions {
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
}

/* Element Plus 组件样式优化 */
:deep(.el-input-number) {
  font-size: 0.95rem;
}

:deep(.el-input-number__input) {
  border-radius: 8px;
}

:deep(.el-select__wrapper) {
  border-radius: 8px;
  font-size: 0.95rem;
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
  .search-form {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .actions {
    justify-content: center;
    margin-top: 16px;
  }
  
  .price-range {
    justify-content: center;
  }
  
  .sorting-options {
    flex-direction: column;
  }
}
</style>