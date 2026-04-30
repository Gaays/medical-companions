<script setup>
import aishaAvatar from '../assets/images/Aisha K..png'
import davidAvatar from '../assets/images/David M..png'
import michaelAvatar from '../assets/images/Michael R..png'

const stories = [
  {
    name: 'Michael R.',
    role: 'Foreign teacher, Guangzhou',
    avatar: michaelAvatar,
    quote: 'I was about to pay for a medical exam back home, but the checklist helped me ask my school the right questions first. I avoided booking the wrong type of checkup and knew what documents to bring in Guangzhou.',
    outcome: 'Work visa health check planning'
  },
  {
    name: 'Aisha K.',
    role: 'International student, Shanghai',
    avatar: aishaAvatar,
    quote: 'The confusing part was whether my overseas report would be accepted. The consultation made the difference between a private checkup and the official residence requirement clear, and I had a simple timeline before arriving.',
    outcome: 'Student residence health check'
  },
  {
    name: 'David M.',
    role: 'Self-pay visitor, Shenzhen',
    avatar: davidAvatar,
    quote: 'I wanted a full body checkup but did not want to overbuy a huge package. They helped me compare what to ask for, confirm English report options, and prepare follow-up questions for the doctor.',
    outcome: 'Private full body checkup'
  }
]
</script>

<template>
  <section class="bg-white py-14 md:py-18">
    <div class="container mx-auto px-4">
      <div class="mb-8 max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">User stories</p>
        <h2 class="mt-2 text-2xl font-bold text-[#17342d] md:text-3xl">What clarity feels like before a China health check</h2>
        <p class="mt-3 leading-7 text-[#5f6d68]">
          Example stories based on common consultation scenarios: wrong exam type, overseas report uncertainty, English support, and package comparison.
        </p>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="story in stories"
          :key="story.name"
          class="rounded-lg border border-[#d8e3de] bg-[#fbfcfb] p-5 shadow-sm"
        >
          <div class="mb-5 flex items-center gap-3">
            <img
              :src="story.avatar"
              :alt="`${story.name} testimonial portrait`"
              class="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-[#d8e3de]"
              width="112"
              height="112"
              loading="lazy"
            />
            <div>
              <h3 class="mb-0 text-base font-bold text-[#17342d]">{{ story.name }}</h3>
              <p class="mb-0 text-sm text-[#5f6d68]">{{ story.role }}</p>
            </div>
          </div>
          <p class="leading-7 text-[#4f5f59]">“{{ story.quote }}”</p>
          <div class="mt-5 rounded-md bg-[#eef7f2] px-3 py-2 text-sm font-semibold text-[#245c4c]">
            {{ story.outcome }}
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
