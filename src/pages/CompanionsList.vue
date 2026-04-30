<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CompanionModal from '../components/CompanionModal.vue'
import ContactModal from '../components/ContactModal.vue'
import ConsultationForm from '../components/ConsultationForm.vue'
import { useMockData } from '../../useMockData'
import { setPageSeo } from '../utils/seo'

const { companions } = useMockData()
const { t } = useI18n()
const selectedCompanion = ref(null)
const showContactModal = ref(false)

const cityLabel = (region) => t(`regions.${region}`)

onMounted(() => {
  setPageSeo({
    title: 'China health check consultation in Guangzhou, Shenzhen, and Shanghai',
    description: 'Leave your information for China visa medical check, residence health check, full body checkup, English report, and hospital appointment support in Guangzhou, Shenzhen, or Shanghai.',
    path: '/services'
  })
})
</script>

<template>
  <main class="bg-[#f8faf8]">
    <section class="border-b border-[#d9e4df] bg-white py-10 md:py-14">
      <div class="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">Guangzhou / Shenzhen / Shanghai</p>
          <h1 class="mt-3 max-w-4xl text-3xl font-bold leading-tight text-[#17342d] md:text-5xl">
            China health check consultation for foreigners
          </h1>
          <p class="mt-4 max-w-3xl leading-8 text-[#5f6d68]">
            We help foreign teachers, work visa applicants, international students, expat employees, and self-pay visitors understand the right health check path before booking.
          </p>
        </div>
        <img
          src="/images/banner-services.svg"
          alt="Consultation services for China health checks"
          class="aspect-[2.3/1] w-full rounded-lg object-cover shadow-lg"
          width="1200"
          height="520"
        />
      </div>
    </section>

    <section id="services" class="py-10 md:py-14">
      <div class="container mx-auto px-4">
        <div class="mb-8 max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">What we provide</p>
          <h2 class="mt-2 text-2xl font-bold text-[#17342d] md:text-3xl">Services built around the real pain points</h2>
          <p class="mt-3 leading-7 text-[#5f6d68]">
            No service-person marketplace. Just clear guidance, appointment preparation, English support, report organization, and follow-up routing when needed.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="plan in companions"
            :key="plan.id"
            class="rounded-lg border border-[#d8e3de] bg-white p-5 shadow-sm"
          >
            <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-xs font-semibold text-[#245c4c]">{{ cityLabel(plan.region) }}</span>
            <h3 class="mt-4 text-xl font-bold leading-snug text-[#17342d]">{{ plan.name }}</h3>
            <p class="mt-3 text-sm leading-6 text-[#5f6d68]">{{ plan.bio }}</p>
            <ul class="mt-4 space-y-2">
              <li v-for="item in plan.specialties.slice(0, 3)" :key="item" class="flex items-start gap-2 text-sm text-[#4f5f59]">
                <font-awesome-icon icon="circle-check" class="mt-1 text-[#0f5f4c]" />
                <span>{{ item }}</span>
              </li>
            </ul>
            <button class="mt-5 font-semibold text-[#0f5f4c]" @click="selectedCompanion = plan">
              See details
            </button>
          </article>
        </div>
      </div>
    </section>

    <ConsultationForm />

    <CompanionModal
      v-if="selectedCompanion"
      :companion="selectedCompanion"
      @close="selectedCompanion = null"
      @contact="showContactModal = true"
    />

    <ContactModal v-if="showContactModal" @close="showContactModal = false" />
  </main>
</template>
