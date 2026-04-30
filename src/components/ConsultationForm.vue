<script setup>
import { computed, ref } from 'vue'

const form = ref({
  name: '',
  city: 'Guangzhou',
  profile: 'Work visa applicant / foreign teacher',
  purpose: 'Visa or residence health check',
  arrivalDate: '',
  contact: '',
  message: ''
})

const profiles = [
  'Work visa applicant / foreign teacher',
  'International student',
  'Expat employee in China',
  'Self-pay visitor for health screening',
  '40+ preventive checkup visitor'
]

const purposes = [
  'Visa or residence health check',
  'Private full body checkup',
  'Report translation after checkup',
  'English booking or hospital visit support',
  'Not sure yet'
]

const cities = ['Guangzhou', 'Shenzhen', 'Shanghai']

const mailtoLink = computed(() => {
  const subject = encodeURIComponent(`China health check consultation - ${form.value.city}`)
  const body = encodeURIComponent([
    `Name: ${form.value.name}`,
    `City: ${form.value.city}`,
    `Profile: ${form.value.profile}`,
    `Purpose: ${form.value.purpose}`,
    `Arrival / target date: ${form.value.arrivalDate}`,
    `Preferred contact: ${form.value.contact}`,
    '',
    `Question: ${form.value.message}`,
    '',
    'Please do not include sensitive diagnosis details in the first message.'
  ].join('\n'))

  return `mailto:doctor.me@email.com?subject=${subject}&body=${body}`
})

const whatsappLink = computed(() => {
  const text = encodeURIComponent(`Hi, I need help planning a China health check.\nCity: ${form.value.city}\nPurpose: ${form.value.purpose}\nProfile: ${form.value.profile}\nContact: ${form.value.contact}`)
  return `https://wa.me/8612345678910?text=${text}`
})
</script>

<template>
  <section id="consult" class="bg-[#17342d] py-14 text-white md:py-18">
    <div class="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#91d0b7]">Consultation</p>
        <h2 class="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
          Tell us what checkup you need in China
        </h2>
        <p class="mt-4 max-w-xl leading-8 text-[#c6d8d1]">
          Leave your city, purpose, arrival date, and contact method. We will help you understand whether you need an official visa or residence health check, a private full body checkup, report translation, or English appointment support.
        </p>
        <div class="mt-6 grid gap-3 text-sm text-[#dce8e3]">
          <div class="flex items-start gap-3">
            <font-awesome-icon icon="shield-halved" class="mt-1 text-[#91d0b7]" />
            <span>Information and coordination only. We do not provide diagnosis or guarantee visa outcomes.</span>
          </div>
          <div class="flex items-start gap-3">
            <font-awesome-icon icon="lock" class="mt-1 text-[#91d0b7]" />
            <span>Please do not send sensitive medical records in the first message.</span>
          </div>
        </div>
      </div>

      <form class="rounded-lg bg-white p-5 text-[#17342d] shadow-xl md:p-6" @submit.prevent>
        <div class="grid gap-4 md:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Name</span>
            <input v-model="form.name" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="Your name" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Target city</span>
            <select v-model="form.city" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3">
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </label>

          <label class="block md:col-span-2">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Who are you?</span>
            <select v-model="form.profile" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3">
              <option v-for="profile in profiles" :key="profile" :value="profile">{{ profile }}</option>
            </select>
          </label>

          <label class="block md:col-span-2">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">What do you need?</span>
            <select v-model="form.purpose" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3">
              <option v-for="purpose in purposes" :key="purpose" :value="purpose">{{ purpose }}</option>
            </select>
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Arrival or target date</span>
            <input v-model="form.arrivalDate" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="e.g. May 20" />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Email / WhatsApp</span>
            <input v-model="form.contact" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="How should we reply?" />
          </label>

          <label class="block md:col-span-2">
            <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Question</span>
            <textarea v-model="form.message" rows="4" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="Tell us what is confusing: visa check, overseas report, English report, booking, price, or follow-up."></textarea>
          </label>
        </div>

        <div class="mt-5 flex flex-col gap-3 sm:flex-row">
          <a :href="mailtoLink" class="rounded-md bg-[#0f5f4c] px-5 py-3 text-center font-semibold text-white hover:bg-[#0b4336]">
            Send by email
          </a>
          <a :href="whatsappLink" target="_blank" rel="noopener" class="rounded-md border border-[#b6cdc3] px-5 py-3 text-center font-semibold text-[#17342d] hover:border-[#0f5f4c]">
            Open WhatsApp
          </a>
        </div>
      </form>
    </div>
  </section>
</template>
