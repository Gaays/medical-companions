<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedCompanions from '../components/FeaturedCompanions.vue'
import HowItWorks from '../components/HowItWorks.vue'
import CompanionModal from '../components/CompanionModal.vue'
import ContactModal from '../components/ContactModal.vue'
import NewsPreview from '../components/NewsPreview.vue'
import ConsultationForm from '../components/ConsultationForm.vue'
import UserStories from '../components/UserStories.vue'

const selectedCompanion = ref(null)
const showContactModal = ref(false)

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'China health check and visa medical guide for foreigners | China Health Check Guide',
  description: 'Plain-English China health check guidance for foreign teachers, work visa applicants, international students, expat employees, and self-pay visitors.',
  ogTitle: 'China health check and visa medical guide for foreigners | China Health Check Guide',
  ogDescription: 'Plain-English China health check guidance for foreign teachers, work visa applicants, international students, expat employees, and self-pay visitors.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
})
</script>

<template>
  <div class="min-h-screen bg-[#f8faf8]">
    <HeroSection />
    <FeaturedCompanions @open-modal="selectedCompanion = $event" />
    <HowItWorks />
    <UserStories />
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
