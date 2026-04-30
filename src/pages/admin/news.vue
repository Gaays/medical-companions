<script setup lang="ts">
type NewsSection = {
  heading: string
  body: string
}

type NewsArticle = {
  id?: number
  slug: string
  title: string
  description: string
  category: string
  date: string
  readTime: string
  city: string
  keywords: string[]
  sections: NewsSection[]
  published: boolean
}

const emptyArticle = (): NewsArticle => ({
  slug: '',
  title: '',
  description: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  readTime: '4 min read',
  city: 'China',
  keywords: [],
  sections: [{ heading: '', body: '' }],
  published: true,
})

const password = ref('')
const isAuthed = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const articles = ref<NewsArticle[]>([])
const editing = ref<NewsArticle>(emptyArticle())
const keywordText = ref('')

useSeoMeta({
  title: 'News admin | China Health Check Guide',
  robots: 'noindex, nofollow',
})

async function login() {
  errorMessage.value = ''
  await $fetch('/api/admin/login', {
    method: 'POST',
    body: { password: password.value },
  })
  isAuthed.value = true
  await loadArticles()
}

async function loadArticles() {
  articles.value = await $fetch('/api/admin/news')
}

function editArticle(article: NewsArticle) {
  editing.value = JSON.parse(JSON.stringify(article))
  keywordText.value = article.keywords.join(', ')
  successMessage.value = ''
  errorMessage.value = ''
}

function newArticle() {
  editing.value = emptyArticle()
  keywordText.value = ''
  successMessage.value = ''
  errorMessage.value = ''
}

function addSection() {
  editing.value.sections.push({ heading: '', body: '' })
}

function removeSection(index: number) {
  editing.value.sections.splice(index, 1)
  if (editing.value.sections.length === 0) {
    addSection()
  }
}

async function saveArticle() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  editing.value.keywords = keywordText.value.split(',').map((item) => item.trim()).filter(Boolean)

  try {
    const method = editing.value.id ? 'PUT' : 'POST'
    const url = editing.value.id ? `/api/admin/news/${editing.value.id}` : '/api/admin/news'
    const saved = await $fetch<NewsArticle>(url, {
      method,
      body: editing.value,
    })
    successMessage.value = 'Article saved.'
    await loadArticles()
    editArticle(saved)
  }
  catch (error: any) {
    errorMessage.value = error?.data?.message || 'Unable to save article.'
  }
  finally {
    isSaving.value = false
  }
}

async function deleteArticle(article: NewsArticle) {
  if (!article.id || !confirm(`Delete "${article.title}"?`)) return
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch(`/api/admin/news/${article.id}`, { method: 'DELETE' })
    successMessage.value = 'Article deleted.'
    await loadArticles()
    newArticle()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.message || 'Unable to delete article.'
  }
}
</script>

<template>
  <main class="bg-[#f8faf8] py-10 md:py-14">
    <section class="container mx-auto px-4">
      <div class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">Admin</p>
        <h1 class="mt-2 text-3xl font-bold text-[#17342d]">News management</h1>
      </div>

      <form v-if="!isAuthed" class="max-w-md rounded-lg border border-[#d9e4df] bg-white p-5 shadow-sm" @submit.prevent="login">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Admin password</span>
          <input v-model="password" type="password" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
        </label>
        <button class="mt-4 rounded-md bg-[#0f5f4c] px-5 py-3 font-semibold text-white">Log in</button>
      </form>

      <div v-else class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside class="rounded-lg border border-[#d9e4df] bg-white p-4 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-[#17342d]">Articles</h2>
            <button class="rounded-md border border-[#b6cdc3] px-3 py-2 text-sm font-semibold text-[#17342d]" @click="newArticle">New</button>
          </div>

          <div class="grid gap-3">
            <article v-for="article in articles" :key="article.slug" class="rounded-md border border-[#d9e4df] p-3">
              <h3 class="font-bold leading-snug text-[#17342d]">{{ article.title }}</h3>
              <p class="mt-1 text-sm text-[#5f6d68]">{{ article.date }} · {{ article.city }}</p>
              <div class="mt-3 flex gap-2">
                <button class="rounded-md bg-[#e7f2ed] px-3 py-2 text-sm font-semibold text-[#245c4c]" @click="editArticle(article)">Edit</button>
                <button class="rounded-md bg-[#fff2f0] px-3 py-2 text-sm font-semibold text-[#9b2c1f]" @click="deleteArticle(article)">Delete</button>
              </div>
            </article>
          </div>
        </aside>

        <form class="rounded-lg border border-[#d9e4df] bg-white p-5 shadow-sm" @submit.prevent="saveArticle">
          <div class="mb-5 flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold text-[#17342d]">{{ editing.id ? 'Edit article' : 'New article' }}</h2>
            <button :disabled="isSaving" class="rounded-md bg-[#0f5f4c] px-5 py-3 font-semibold text-white disabled:bg-[#7aa699]">
              {{ isSaving ? 'Saving...' : 'Save' }}
            </button>
          </div>

          <p v-if="successMessage" class="mb-4 rounded-md bg-[#e7f2ed] px-4 py-3 text-sm font-semibold text-[#245c4c]">{{ successMessage }}</p>
          <p v-if="errorMessage" class="mb-4 rounded-md bg-[#fff2f0] px-4 py-3 text-sm font-semibold text-[#9b2c1f]">{{ errorMessage }}</p>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Title</span>
              <input v-model="editing.title" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Slug</span>
              <input v-model="editing.slug" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Date</span>
              <input v-model="editing.date" type="date" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Description</span>
              <textarea v-model="editing.description" required rows="3" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Category</span>
              <input v-model="editing.category" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">City</span>
              <input v-model="editing.city" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Read time</span>
              <input v-model="editing.readTime" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">Keywords</span>
              <input v-model="keywordText" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="keyword one, keyword two" />
            </label>
          </div>

          <div class="mt-6">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="font-bold text-[#17342d]">Sections</h3>
              <button type="button" class="rounded-md border border-[#b6cdc3] px-3 py-2 text-sm font-semibold text-[#17342d]" @click="addSection">Add section</button>
            </div>
            <div class="grid gap-4">
              <div v-for="(section, index) in editing.sections" :key="index" class="rounded-md border border-[#d9e4df] p-4">
                <div class="mb-3 flex justify-end">
                  <button type="button" class="text-sm font-semibold text-[#9b2c1f]" @click="removeSection(index)">Remove</button>
                </div>
                <input v-model="section.heading" required class="mb-3 w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="Section heading" />
                <textarea v-model="section.body" required rows="5" class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" placeholder="Section body" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
