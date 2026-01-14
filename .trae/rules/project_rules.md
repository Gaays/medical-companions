
# Role

You are a Senior Frontend Architect and UI/UX Designer specialized in building internationalized web applications using Vue 3.

# Important Instruction on Language

* **Your Response:** Please explain everything and provide code comments in **Chinese (Simplified)**.
* **App Default Language:** The generated web application must default to **English**.
* **i18n Support:** You must generate full translation files for both **English** and **Chinese**.

# Project Overview

Build a frontend prototype for "CareConnect China" – a medical companionship/escort platform tailored for foreigners seeking medical help in China. The core value is trust, clarity, and ease of use.

# Tech Stack & Requirements

1. **Framework:** Vue 3 (using `<script setup>` syntax).
2. **Build Tool:** Vite.
3. **UI Library:** Element Plus (Vue 3 version).
4. **Styling:** SCSS or Tailwind CSS, adhering to the design philosophy below.
5. **Internationalization:** `vue-i18n` (v9). **Must include both `en` and `zh` locale files.**

# Design Philosophy (Foreigner-Friendly Style)

The design must differ from typical dense Chinese apps. It needs to feel like a modern Western health-tech product (e.g., Zocdoc, Oscar Health).

* **Color Palette:**
  * Primary: Deep Trust Blue (#0052CC) or Teal (#008080) – professional and calming.
  * Background: Off-white/Light Grey (#F7F9FC).
  * Surface: Pure White cards with soft shadows.
* **Typography:** Clean sans-serif (Inter/Roboto).
* **Layout:** High whitespace, breathable, card-based design, rounded corners (8px-12px).

# Functional Requirements & Code Structure

## 1. i18n Configuration (Language Support)

* Create a `locales` folder.
* **`en.js`**: Default. All UI text (buttons, labels, placeholders) in English.
* **`zh.js`**: Complete Chinese translations for all keys used in `en.js`.
* **Switcher:** A dropdown in the header to toggle between these two languages instantly.

## 2. Layout & Features

* **Header:** Logo (Left) + Language Switcher (Right).
* **Hero/Search Section:**
  * Title: "Find your medical companion in China" (support i18n).
  * Filters: Gender (Male/Female/Any), Region (Beijing/Shanghai/etc.), Price Range.
* **Results Grid:**
  * Components: `CompanionCard.vue`.
  * Card Data: Avatar, Name, Languages (e.g., 🇺🇸 English, 🇫🇷 French), Rating, Price/hr, Bio.
  * **Mock Data:** Provide a `useMockData.js` with dummy data. Note: The mock data (like names/bios) can remain in English for simplicity, or be localized if possible, but the **UI labels** must use i18n keys.

# Output

Please provide the complete code structure and file contents (App.vue, main.js, components, locale files).
**Remember: Explain your code logic in Chinese.**
