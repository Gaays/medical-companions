<script setup>
import { useI18n } from 'vue-i18n'
import bannerHome from '../assets/images/banner-home.png'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-[#f8faf8]">
    <div class="absolute inset-x-0 top-0 h-2 bg-[#0f5f4c]"></div>
    <div class="container mx-auto grid min-h-[calc(100vh-72px)] items-center gap-8 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
      <div class="max-w-3xl">
        <p class="mb-4 inline-flex rounded-full border border-[#cfe0d7] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">
          {{ t('hero.eyebrow') }}
        </p>
        <h1 class="mb-5 text-4xl font-bold leading-[1.08] text-[#17342d] md:text-6xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mb-7 max-w-2xl text-lg leading-8 text-[#4f5f59]">
          {{ t('hero.subtitle') }}
        </p>
        <div class="mb-6 flex flex-col gap-3 sm:flex-row">
          <a href="#consult" class="rounded-md bg-[#0f5f4c] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#0b4336]">
            {{ t('hero.cta') }}
          </a>
          <NuxtLink to="/services" class="rounded-md border border-[#b6cdc3] bg-white px-5 py-3 text-center font-semibold text-[#17342d] transition hover:border-[#0f5f4c]">
            {{ t('hero.secondary_cta') }}
          </NuxtLink>
        </div>
        <p class="max-w-2xl rounded-md bg-[#fff8e6] px-4 py-3 text-sm leading-6 text-[#72592f]">
          {{ t('hero.note') }}
        </p>
      </div>

      <div class="relative">
        <img
          :src="bannerHome"
          alt="China health check planning illustration"
          class="mb-4 aspect-[1.46/1] w-full rounded-lg border border-[#d8e3de] bg-white object-cover shadow-xl"
          width="1200"
          height="820"
        />
        <div class="rounded-lg border border-[#d8e3de] bg-white p-4 shadow-xl md:p-5">
          <div class="mb-4 rounded-md bg-[#eef7f2] p-4">
            <div class="text-sm font-semibold text-[#3f7d68]">Decision check</div>
            <div class="mt-2 space-y-3">
              <div class="flex items-start gap-3 rounded-md bg-white p-3">
                <font-awesome-icon icon="file-medical" class="mt-1 text-[#0f5f4c]" />
                <div>
                  <div class="font-bold text-[#17342d]">Official or private?</div>
                  <div class="text-sm text-[#5f6d68]">Avoid booking the wrong exam type.</div>
                </div>
              </div>
              <div class="flex items-start gap-3 rounded-md bg-white p-3">
                <font-awesome-icon icon="language" class="mt-1 text-[#0f5f4c]" />
                <div>
                  <div class="font-bold text-[#17342d]">English support</div>
                  <div class="text-sm text-[#5f6d68]">Plan booking, visit, reports, and questions.</div>
                </div>
              </div>
              <div class="flex items-start gap-3 rounded-md bg-white p-3">
                <font-awesome-icon icon="route" class="mt-1 text-[#0f5f4c]" />
                <div>
                  <div class="font-bold text-[#17342d]">Follow-up routing</div>
                  <div class="text-sm text-[#5f6d68]">Know what to do after abnormal flags.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-md bg-[#f5f7f4] p-3">
              <div class="text-lg font-bold text-[#17342d]">{{ t('hero.stat_1') }}</div>
              <div class="mt-1 text-xs leading-5 text-[#5f6d68]">{{ t('hero.stat_1_label') }}</div>
            </div>
            <div class="rounded-md bg-[#f5f7f4] p-3">
              <div class="text-lg font-bold text-[#17342d]">{{ t('hero.stat_2') }}</div>
              <div class="mt-1 text-xs leading-5 text-[#5f6d68]">{{ t('hero.stat_2_label') }}</div>
            </div>
            <div class="rounded-md bg-[#f5f7f4] p-3">
              <div class="text-lg font-bold text-[#17342d]">{{ t('hero.stat_3') }}</div>
              <div class="mt-1 text-xs leading-5 text-[#5f6d68]">{{ t('hero.stat_3_label') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
