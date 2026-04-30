<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { marked } from 'marked'

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

const TOOLBARS: any[] = [
  'bold', 'underline', 'italic', 'strikeThrough', '-',
  'title', 'quote', 'unorderedList', 'orderedList', 'task', '-',
  'codeRow', 'code', 'link', 'table', '-',
  'revoke', 'next', '=', 'pageFullscreen',
]

const emptyArticle = (): NewsArticle => ({
  slug: '',
  title: '',
  description: '',
  category: '',
  date: new Date().toISOString().slice(0, 10),
  readTime: '4 分钟阅读',
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
const content = ref('')
const activeTab = ref<'edit' | 'preview'>('edit')

useSeoMeta({
  title: '新闻管理 | China Health Check Guide',
  robots: 'noindex, nofollow',
})

function renderMarkdown(text: string): string {
  return marked.parse(text || '') as string
}

// Merge existing sections (possibly multiple with headings) into a single markdown string
function sectionsToContent(sections: NewsSection[]): string {
  return sections.map(s => s.heading ? `## ${s.heading}\n\n${s.body}` : s.body).join('\n\n').trim()
}

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
  content.value = sectionsToContent(article.sections)
  successMessage.value = ''
  errorMessage.value = ''
  activeTab.value = 'edit'
}

function newArticle() {
  editing.value = emptyArticle()
  keywordText.value = ''
  content.value = ''
  successMessage.value = ''
  errorMessage.value = ''
  activeTab.value = 'edit'
}

async function saveArticle() {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  editing.value.keywords = keywordText.value.split(',').map(item => item.trim()).filter(Boolean)
  editing.value.sections = [{ heading: '', body: content.value }]

  try {
    const method = editing.value.id ? 'PUT' : 'POST'
    const url = editing.value.id ? `/api/admin/news/${editing.value.id}` : '/api/admin/news'
    const saved = await $fetch<NewsArticle>(url, {
      method,
      body: editing.value,
    })
    successMessage.value = '文章已保存。'
    await loadArticles()
    editArticle(saved)
  }
  catch (error: any) {
    errorMessage.value = error?.data?.message || '保存失败，请重试。'
  }
  finally {
    isSaving.value = false
  }
}

async function deleteArticle(article: NewsArticle) {
  if (!article.id || !confirm(`确定删除"${article.title}"？`)) return
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await $fetch(`/api/admin/news/${article.id}`, { method: 'DELETE' })
    successMessage.value = '文章已删除。'
    await loadArticles()
    newArticle()
  }
  catch (error: any) {
    errorMessage.value = error?.data?.message || '删除失败，请重试。'
  }
}
</script>

<template>
  <main class="bg-[#f8faf8] py-10 md:py-14">
    <section class="container mx-auto px-4">
      <div class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f7d68]">管理后台</p>
        <h1 class="mt-2 text-3xl font-bold text-[#17342d]">新闻管理</h1>
      </div>

      <form v-if="!isAuthed" class="max-w-md rounded-lg border border-[#d9e4df] bg-white p-5 shadow-sm" @submit.prevent="login">
        <label class="block">
          <span class="mb-2 block text-sm font-semibold text-[#4f5f59]">管理员密码</span>
          <input v-model="password" type="password" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-3" />
        </label>
        <button class="mt-4 rounded-md bg-[#0f5f4c] px-5 py-3 font-semibold text-white">登录</button>
      </form>

      <div v-else class="grid gap-6 lg:grid-cols-[320px_1fr]">
        <!-- Article list sidebar -->
        <aside class="rounded-lg border border-[#d9e4df] bg-white p-4 shadow-sm self-start">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-[#17342d]">文章列表</h2>
            <button class="rounded-md border border-[#b6cdc3] px-3 py-2 text-sm font-semibold text-[#17342d]" @click="newArticle">新建</button>
          </div>
          <div class="grid gap-3">
            <article v-for="article in articles" :key="article.slug" class="rounded-md border border-[#d9e4df] p-3">
              <h3 class="font-bold leading-snug text-[#17342d]">{{ article.title }}</h3>
              <p class="mt-1 text-sm text-[#5f6d68]">{{ article.date }} · {{ article.city }}</p>
              <div class="mt-3 flex gap-2">
                <button class="rounded-md bg-[#e7f2ed] px-3 py-2 text-sm font-semibold text-[#245c4c]" @click="editArticle(article)">编辑</button>
                <button class="rounded-md bg-[#fff2f0] px-3 py-2 text-sm font-semibold text-[#9b2c1f]" @click="deleteArticle(article)">删除</button>
              </div>
            </article>
          </div>
        </aside>

        <!-- Editor panel -->
        <div class="rounded-lg border border-[#d9e4df] bg-white shadow-sm overflow-hidden">
          <!-- Tab bar + save button -->
          <div class="flex items-center justify-between border-b border-[#d9e4df] px-2">
            <div class="flex">
              <button
                type="button"
                class="px-5 py-3 text-sm font-semibold transition-colors"
                :class="activeTab === 'edit' ? 'border-b-2 border-[#0f5f4c] text-[#0f5f4c]' : 'text-[#5f6d68] hover:text-[#17342d]'"
                @click="activeTab = 'edit'"
              >编辑</button>
              <button
                type="button"
                class="px-5 py-3 text-sm font-semibold transition-colors"
                :class="activeTab === 'preview' ? 'border-b-2 border-[#0f5f4c] text-[#0f5f4c]' : 'text-[#5f6d68] hover:text-[#17342d]'"
                @click="activeTab = 'preview'"
              >预览</button>
            </div>
            <button
              :disabled="isSaving"
              class="rounded-md bg-[#0f5f4c] px-5 py-2 text-sm font-semibold text-white disabled:bg-[#7aa699]"
              @click="saveArticle"
            >{{ isSaving ? '保存中...' : '保存文章' }}</button>
          </div>

          <!-- Edit mode -->
          <div v-if="activeTab === 'edit'" class="p-5">
            <p v-if="successMessage" class="mb-4 rounded-md bg-[#e7f2ed] px-4 py-3 text-sm font-semibold text-[#245c4c]">{{ successMessage }}</p>
            <p v-if="errorMessage" class="mb-4 rounded-md bg-[#fff2f0] px-4 py-3 text-sm font-semibold text-[#9b2c1f]">{{ errorMessage }}</p>

            <!-- Basic fields -->
            <div class="mb-6">
              <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-[#5f6d68]">基本信息</h3>
              <div class="grid gap-4 md:grid-cols-2">
                <label class="block md:col-span-2">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">标题</span>
                  <input v-model="editing.title" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">链接标识（Slug）</span>
                  <input v-model="editing.slug" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">日期</span>
                  <input v-model="editing.date" type="date" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block md:col-span-2">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">摘要</span>
                  <textarea v-model="editing.description" required rows="2" class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">分类</span>
                  <input v-model="editing.category" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">城市</span>
                  <input v-model="editing.city" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">阅读时间</span>
                  <input v-model="editing.readTime" required class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" />
                </label>
                <label class="block">
                  <span class="mb-1.5 block text-sm font-semibold text-[#4f5f59]">关键词</span>
                  <input v-model="keywordText" class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5" placeholder="关键词一, 关键词二" />
                </label>
              </div>
            </div>

            <!-- Single Markdown editor -->
            <div>
              <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-[#5f6d68]">正文内容</h3>
              <ClientOnly>
                <MdEditor
                  v-model="content"
                  language="zh-CN"
                  :preview="false"
                  :toolbars="TOOLBARS"
                  editor-id="main-content-editor"
                  style="height: 500px"
                />
                <template #fallback>
                  <textarea v-model="content" rows="20" class="w-full rounded-md border border-[#c9d8d1] px-3 py-2.5 font-mono text-sm" placeholder="用 Markdown 编写文章正文" />
                </template>
              </ClientOnly>
            </div>
          </div>

          <!-- Preview mode -->
          <div v-else class="p-5">
            <div class="mb-5 flex items-center justify-between">
              <h2 class="text-lg font-bold text-[#17342d]">文章预览</h2>
              <span class="text-sm text-[#5f6d68]">以下为实际显示效果</span>
            </div>
            <article class="border-t border-[#d9e4df] pt-5">
              <div class="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
                <span class="rounded-full bg-[#e7f2ed] px-3 py-1 text-[#245c4c]">{{ editing.category || '分类' }}</span>
                <span class="rounded-full bg-[#f2eee5] px-3 py-1 text-[#72592f]">{{ editing.city || '城市' }}</span>
                <span class="text-[#5d6f68]">{{ editing.date }}</span>
                <span class="text-[#5d6f68]">{{ editing.readTime }}</span>
              </div>
              <h1 class="mb-4 text-2xl font-bold leading-tight text-[#17342d]">{{ editing.title || '（标题）' }}</h1>
              <p class="mb-6 text-base leading-7 text-[#5f6d68]">{{ editing.description || '（摘要）' }}</p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="md-content" v-html="renderMarkdown(content)" />
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.md-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.875rem;
  color: #4f5f59;
}
.md-content :deep(h2) {
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #17342d;
}
.md-content :deep(h3) {
  margin-bottom: 0.5rem;
  margin-top: 1.25rem;
  font-size: 1.1rem;
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
  line-height: 1.875rem;
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
