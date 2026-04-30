<script setup>
import { onMounted, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedCompanions from '../components/FeaturedCompanions.vue'
import HowItWorks from '../components/HowItWorks.vue'
import CompanionModal from '../components/CompanionModal.vue'
import ContactModal from '../components/ContactModal.vue'
import NewsPreview from '../components/NewsPreview.vue'
import ConsultationForm from '../components/ConsultationForm.vue'
import { setPageSeo } from '../utils/seo'

const selectedCompanion = ref(null)
const showContactModal = ref(false)

onMounted(() => {
  setPageSeo({
    title: 'China health check and visa medical guide for foreigners',
    description: 'Plain-English China health check guidance for foreign teachers, work visa applicants, international students, expat employees, and self-pay visitors.',
    path: '/'
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#f8faf8]">
    <HeroSection />
    <FeaturedCompanions @open-modal="selectedCompanion = $event" />
    <HowItWorks />
    <ConsultationForm />
    <NewsPreview />

    <CompanionModal
      v-if="selectedCompanion"
      :companion="selectedCompanion"
      @close="selectedCompanion = null"
      @contact="showContactModal = true"
    />

    <ContactModal
      v-if="showContactModal"
      @close="showContactModal = false"
    />
  </div>
</template>
