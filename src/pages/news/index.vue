<script setup lang="ts">
import bannerNews from '../../assets/images/news-banner.png'

const { data: newsArticles } = await useFetch('/api/news', {
  default: () => [],
})

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'China health check guides for foreigners | China Health Check Guide',
  description: 'Guides about China visa medical checks, full body checkups, English reports, report translation, and follow-up planning for foreigners.',
  ogTitle: 'China health check guides for foreigners | China Health Check Guide',
  ogDescription: 'Guides about China visa medical checks, full body checkups, English reports, report translation, and follow-up planning for foreigners.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/news` }],
})
</script>

<template>
  <main class="bg-[#f8faf8]">
    <section class="border-b border-[#d9e4df] bg-white py-10 md:py-14">
      <div class="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">News and guides</p>
          <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#17342d] md:text-5xl">
            China health check guidance for foreigners
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-[#5f6d68] md:text-lg">
            Search-friendly articles about visa medical checks, full body checkups, English reports, and consultation support in Guangzhou, Shenzhen, and Shanghai.
          </p>
        </div>
        <img
          :src="bannerNews"
          alt="China health check guides and planning resources for foreigners"
          class="aspect-[2.3/1] w-full rounded-lg object-cover shadow-lg"
          width="1200"
          height="520"
        />
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
            <NuxtLink :to="`/news/${article.slug}`" class="text-inherit hover:text-[#0f5f4c]">
              {{ article.title }}
            </NuxtLink>
          </h2>
          <p class="mb-5 leading-7 text-[#5f6d68]">{{ article.description }}</p>
          <NuxtLink :to="`/news/${article.slug}`" class="font-semibold text-[#0f5f4c]">
            Read article
          </NuxtLink>
        </article>
      </div>
    </section>
  </main>
</template>
