<script setup lang="ts">
const { data: latestNews } = await useFetch('/api/news', {
  query: { limit: 3 },
  default: () => [],
})
</script>

<template>
  <section class="bg-[#f5f7f4] py-14 md:py-18">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">Guides for SEO and real questions</p>
          <h2 class="mt-2 text-2xl font-bold text-[#17342d] md:text-3xl">Latest China health check guides</h2>
        </div>
        <NuxtLink to="/news" class="font-semibold text-[#0f5f4c] hover:text-[#0b4336]">
          View all guides
        </NuxtLink>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <article
          v-for="article in latestNews"
          :key="article.slug"
          class="rounded-lg border border-[#d9e4df] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div class="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#5d6f68]">
            <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-[#245c4c]">{{ article.category }}</span>
            <span>{{ article.readTime }}</span>
          </div>
          <h3 class="mb-3 text-lg font-bold leading-snug text-[#17342d]">
            <NuxtLink :to="`/news/${article.slug}`" class="text-inherit hover:text-[#0f5f4c]">
              {{ article.title }}
            </NuxtLink>
          </h3>
          <p class="mb-5 text-sm leading-6 text-[#5f6d68]">{{ article.description }}</p>
          <NuxtLink :to="`/news/${article.slug}`" class="text-sm font-semibold text-[#0f5f4c]">
            Read guide
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
