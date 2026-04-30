<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

const route = useRoute()

const { data: article } = await useFetch(`/api/news/${route.params.slug}`, {
  default: () => null,
})

const siteUrl = useRuntimeConfig().public.siteUrl
const title = computed(() => article.value ? `${article.value.title} | China Health Check Guide` : 'Guide not found | China Health Check Guide')
const description = computed(() => article.value?.description ?? 'China health check guide not found.')
const canonical = computed(() => `${siteUrl}/news/${route.params.slug}`)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
})

function renderMarkdown(text: string): string {
  return marked.parse(text || '') as string
}
</script>

<template>
  <main v-if="article" class="bg-[#fbfcfb]">
    <article class="container mx-auto max-w-3xl px-4 py-10 md:py-16">
      <NuxtLink to="/news" class="mb-8 inline-flex font-semibold text-[#0f5f4c]">
        Back to guides
      </NuxtLink>

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

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="md-content" v-html="renderMarkdown(article.sections.map(s => s.heading ? `## ${s.heading}\n\n${s.body}` : s.body).join('\n\n'))" />

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
    <NuxtLink to="/news" class="font-semibold text-[#0f5f4c]">View all guides</NuxtLink>
  </main>
</template>

<style scoped>
.md-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 2rem;
  color: #4f5f59;
}
.md-content :deep(h2) {
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: #17342d;
}
.md-content :deep(h3) {
  margin-bottom: 0.5rem;
  margin-top: 1.25rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #17342d;
}
.md-content :deep(ul) {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  list-style-type: disc;
}
.md-content :deep(ol) {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  list-style-type: decimal;
}
.md-content :deep(li) {
  margin-bottom: 0.375rem;
  line-height: 2rem;
  color: #4f5f59;
}
.md-content :deep(strong) {
  font-weight: 700;
  color: #17342d;
}
.md-content :deep(em) {
  font-style: italic;
}
.md-content :deep(code) {
  background: #f0f4f2;
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.875em;
  font-family: monospace;
  color: #245c4c;
}
.md-content :deep(pre) {
  background: #f0f4f2;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}
.md-content :deep(pre code) {
  background: none;
  padding: 0;
}
.md-content :deep(blockquote) {
  border-left: 3px solid #b6cdc3;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
  color: #5f6d68;
  font-style: italic;
}
.md-content :deep(a) {
  color: #0f5f4c;
  text-decoration: underline;
}
.md-content :deep(img) {
  margin: 2rem 0;
  width: 100%;
  border: 1px solid #d9e4df;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgb(15 95 76 / 0.08);
}
.md-content :deep(hr) {
  border-color: #d9e4df;
  margin: 1.5rem 0;
}
.md-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
.md-content :deep(th),
.md-content :deep(td) {
  border: 1px solid #d9e4df;
  padding: 0.5rem 0.75rem;
  text-align: left;
}
.md-content :deep(th) {
  background: #f0f4f2;
  font-weight: 700;
  color: #17342d;
}
</style>
