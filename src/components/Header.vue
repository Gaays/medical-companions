<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const showLanguageMenu = ref(false)
const showMobileMenu = ref(false)

const switchLanguage = (lang) => {
  locale.value = lang
  showLanguageMenu.value = false
  showMobileMenu.value = false
}

const navItems = [
  { to: '/', labelKey: 'header.home' },
  { to: '/services', labelKey: 'header.companions' },
  { to: '/news', labelKey: 'News' },
  { href: '/#consult', labelKey: 'Consultation' }
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[#d9e4df] bg-white/95 backdrop-blur">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <router-link to="/" class="flex items-center gap-3 text-[#17342d] no-underline">
        <img src="../assets/svg/logo.svg" alt="China Health Check Guide" class="h-8 w-8" />
        <div>
          <div class="text-base font-bold leading-tight md:text-lg">{{ t('app.name') }}</div>
          <div class="hidden text-xs text-[#5f6d68] sm:block">{{ t('app.slogan') }}</div>
        </div>
      </router-link>

      <nav class="hidden items-center gap-6 md:flex">
        <template v-for="item in navItems" :key="item.labelKey">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="text-sm font-semibold text-[#4f5f59] no-underline transition hover:text-[#0f5f4c]"
          >
            {{ item.labelKey.startsWith('header.') ? t(item.labelKey) : item.labelKey }}
          </router-link>
          <a
            v-else
            :href="item.href"
            class="text-sm font-semibold text-[#4f5f59] no-underline transition hover:text-[#0f5f4c]"
          >
            {{ item.labelKey }}
          </a>
        </template>
      </nav>

      <div class="flex items-center gap-3">
        <div class="relative">
          <button
            class="rounded-md border border-[#c9d8d1] px-3 py-2 text-sm font-semibold text-[#4f5f59]"
            @click="showLanguageMenu = !showLanguageMenu"
          >
            {{ locale === 'en' ? 'EN' : '中文' }}
            <font-awesome-icon icon="chevron-down" class="ml-1 text-xs" />
          </button>
          <div v-if="showLanguageMenu" class="absolute right-0 mt-2 w-28 rounded-md border border-[#d9e4df] bg-white py-1 shadow-lg">
            <button class="block w-full px-4 py-2 text-left text-sm hover:bg-[#f5f7f4]" @click="switchLanguage('en')">English</button>
            <button class="block w-full px-4 py-2 text-left text-sm hover:bg-[#f5f7f4]" @click="switchLanguage('zh')">中文</button>
          </div>
        </div>

        <button
          class="flex h-10 w-10 items-center justify-center rounded-md border border-[#c9d8d1] text-[#17342d] md:hidden"
          @click="showMobileMenu = !showMobileMenu"
          aria-label="Toggle navigation"
        >
          <font-awesome-icon :icon="showMobileMenu ? 'times' : 'bars'" />
        </button>
      </div>
    </div>

    <nav v-if="showMobileMenu" class="border-t border-[#d9e4df] bg-white px-4 py-3 md:hidden">
      <div class="container mx-auto grid gap-2">
        <template v-for="item in navItems" :key="item.labelKey">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="rounded-md px-3 py-3 font-semibold text-[#4f5f59] no-underline hover:bg-[#f5f7f4]"
            @click="showMobileMenu = false"
          >
            {{ item.labelKey.startsWith('header.') ? t(item.labelKey) : item.labelKey }}
          </router-link>
          <a
            v-else
            :href="item.href"
            class="rounded-md px-3 py-3 font-semibold text-[#4f5f59] no-underline hover:bg-[#f5f7f4]"
          >
            {{ item.labelKey }}
          </a>
        </template>
      </div>
    </nav>
  </header>
</template>
