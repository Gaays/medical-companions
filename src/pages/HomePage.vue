<script setup>
import { ref } from 'vue';

// 导入功能组件
import Header from '../components/Header.vue';
import HeroSection from '../components/HeroSection.vue';
import FeaturedCompanions from '../components/FeaturedCompanions.vue';
import HowItWorks from '../components/HowItWorks.vue';
import CompanionModal from '../components/CompanionModal.vue';
import ContactModal from '../components/ContactModal.vue';
import Footer from '../components/Footer.vue';

// 状态管理
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
  <div class="min-h-screen bg-gray-50">
    <!-- 头部 -->
    <Header />
    
    <!-- 英雄区域 -->
    <HeroSection />
    
    <!-- 精选陪护人员 -->
    <FeaturedCompanions @open-modal="openCompanionModal" />
    
    <!-- 服务流程 -->
    <HowItWorks />
    
    <!-- 陪护人员详情弹窗 -->
    <CompanionModal 
      v-if="selectedCompanion" 
      :companion="selectedCompanion"
      @close="closeCompanionModal"
      @contact="openContactModal"
    />
    
    <!-- 联系弹窗 -->
    <ContactModal 
      v-if="showContactModal"
      @close="closeContactModal"
    />
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>