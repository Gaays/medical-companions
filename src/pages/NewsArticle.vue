<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { newsArticles } from '../data/news'
import { setPageSeo } from '../utils/seo'

const route = useRoute()

const article = computed(() => newsArticles.find((item) => item.slug === route.params.slug))

function updateSeo() {
  if (!article.value) return
  setPageSeo({
    title: article.value.title,
    description: article.value.description,
    path: `/news/${article.value.slug}`,
    type: 'article'
  })
}

onMounted(updateSeo)
watch(() => route.params.slug, updateSeo)
</script>

<template>
  <main v-if="article" class="bg-[#fbfcfb]">
    <article class="container mx-auto max-w-3xl px-4 py-10 md:py-16">
      <router-link to="/news" class="mb-8 inline-flex font-semibold text-[#0f5f4c]">
        Back to guides
      </router-link>

      <div class="mb-5 flex flex-wrap gap-2 text-xs font-semibold text-[#5d6f68]">
        <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-[#245c4c]">{{ article.category }}</span>
        <span class="rounded-full bg-[#f2eee5] px-3 py-1 text-[#72592f]">{{ article.city }}</span>
        <span>{{ article.date }}</span>
        <span>{{ article.readTime }}</span>
      </div>

      <h1 class="mb-5 text-3xl font-bold leading-tight text-[#17342d] md:text-5xl">
        {{ article.title }}
      </h1>
      <p class="mb-10 text-lg leading-8 text-[#5f6d68]">{{ article.description }}</p>

      <img
        src="/images/banner-news.svg"
        :alt="`${article.title} illustration`"
        class="mb-10 aspect-[2.3/1] w-full rounded-lg border border-[#d9e4df] object-cover shadow-sm"
        width="1200"
        height="520"
      />

      <section
        v-for="section in article.sections"
        :key="section.heading"
        class="mb-9"
      >
        <h2 class="mb-3 text-2xl font-bold text-[#17342d]">{{ section.heading }}</h2>
        <p class="leading-8 text-[#4f5f59]">{{ section.body }}</p>
      </section>

      <aside class="mt-12 rounded-lg border border-[#cfe0d7] bg-[#eef7f2] p-5">
        <h2 class="mb-2 text-xl font-bold text-[#17342d]">Need help choosing the right checkup path?</h2>
        <p class="mb-4 leading-7 text-[#4f5f59]">
          Send your city, purpose, arrival date, and preferred language. Please do not send sensitive diagnosis details in the first message.
        </p>
        <a href="mailto:doctor.me@email.com" class="font-semibold text-[#0f5f4c]">Email planning support</a>
      </aside>
    </article>
  </main>

  <main v-else class="container mx-auto px-4 py-20">
    <h1 class="mb-3 text-3xl font-bold text-[#17342d]">Guide not found</h1>
    <router-link to="/news" class="font-semibold text-[#0f5f4c]">View all guides</router-link>
  </main>
</template>
