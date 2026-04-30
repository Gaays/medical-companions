<script setup>
import { onMounted } from 'vue'
import { newsArticles } from '../data/news'
import { setPageSeo } from '../utils/seo'

onMounted(() => {
  setPageSeo({
    title: 'China health check guides for foreigners',
    description: 'Guides about China visa medical checks, full body checkups, English reports, report translation, and follow-up planning for foreigners.',
    path: '/news'
  })
})
</script>

<template>
  <main class="bg-[#f8faf8]">
    <section class="border-b border-[#d9e4df] bg-white py-12 md:py-16">
      <div class="container mx-auto px-4">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">News and guides</p>
        <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#17342d] md:text-5xl">
          China health check guidance for foreigners
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-[#5f6d68] md:text-lg">
          Search-friendly articles maintained from one static data source. Add new guides to the news database and the build creates crawlable pages automatically.
        </p>
      </div>
    </section>

    <section class="py-10 md:py-14">
      <div class="container mx-auto grid gap-5 px-4 md:grid-cols-2">
        <article
          v-for="article in newsArticles"
          :key="article.slug"
          class="rounded-lg border border-[#d9e4df] bg-white p-5 shadow-sm"
        >
          <div class="mb-4 flex flex-wrap gap-2 text-xs font-semibold text-[#5d6f68]">
            <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-[#245c4c]">{{ article.category }}</span>
            <span class="rounded-full bg-[#f2eee5] px-3 py-1 text-[#72592f]">{{ article.city }}</span>
            <span>{{ article.date }}</span>
          </div>
          <h2 class="mb-3 text-xl font-bold leading-snug text-[#17342d]">
            <router-link :to="`/news/${article.slug}`" class="text-inherit hover:text-[#0f5f4c]">
              {{ article.title }}
            </router-link>
          </h2>
          <p class="mb-5 leading-7 text-[#5f6d68]">{{ article.description }}</p>
          <router-link :to="`/news/${article.slug}`" class="font-semibold text-[#0f5f4c]">
            Read article
          </router-link>
        </article>
      </div>
    </section>
  </main>
</template>
