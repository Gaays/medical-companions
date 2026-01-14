<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// i18n 实例
const { t } = useI18n();

// 定义组件事件
const emit = defineEmits(["open-modal"]);

// 精选陪护人员数据
const featuredCompanions = ref([
  {
    name: "Dr. Emily Chen",
    image:
      "https://ai-public.mastergo.com/ai/img_res/5d34a55337f8270b24cd5a39c8cc8e83.jpg",
    rating: 4.9,
    price: 350,
    languages: ["English", "Mandarin", "Cantonese"],
    description:
      "Bilingual doctor with 10 years experience helping foreigners navigate Shenzhen healthcare system. Specializes in internal medicine.",
    location: "Futian District",
    services: [
      "Hospital navigation",
      "Medical interpretation",
      "Appointment booking",
      "Prescription assistance",
    ],
  },
  {
    name: "Michael Johnson",
    image:
      "https://ai-public.mastergo.com/ai/img_res/9060a6b3952e4511297bd2460561679f.jpg",
    rating: 4.8,
    price: 300,
    languages: ["English", "French"],
    description:
      "Experienced medical companion with background in nursing. Helps with hospital visits, insurance claims and medication management.",
    location: "Nanshan District",
    services: [
      "Insurance assistance",
      "Medication guidance",
      "24/7 emergency support",
      "Follow-up care",
    ],
  },
  {
    name: "Sarah Williams",
    image:
      "https://ai-public.mastergo.com/ai/img_res/dcf3e9ff34c7eb28a3a85370c9bd2af9.jpg",
    rating: 4.7,
    price: 280,
    languages: ["English", "German", "Mandarin"],
    description:
      "Registered nurse specializing in pediatric care. Helps families with children's medical needs in Shenzhen.",
    location: "Luohu District",
    services: [
      "Pediatric care",
      "Vaccination assistance",
      "Child-friendly hospitals",
      "Family support",
    ],
  },
]);

// 打开陪护人员详情弹窗
const openModal = (companion) => {
  emit("open-modal", companion);
};
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-2xl font-bold text-gray-800">
          {{ t("featured.title") }}
        </h3>
        <a href="#" class="text-primary hover:underline">{{
          t("featured.view_all")
        }}</a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(companion, index) in featuredCompanions"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div class="relative">
            <img
              :src="companion.image"
              :alt="companion.name"
              class="w-full h-48 object-cover"
            />
            <div
              class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center text-sm"
            >
              <font-awesome-icon icon="star" class="text-yellow-400 mr-1" />
              <span>{{ companion.rating }}</span>
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-bold text-lg">{{ companion.name }}</h4>
              <span class="text-primary font-medium"
                >¥{{ companion.price }}/h</span
              >
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(lang, i) in companion.languages"
                :key="i"
                class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {{ lang }}
              </span>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ companion.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 text-sm flex items-center">
                <font-awesome-icon icon="map-marker-alt" class="mr-1" />
                {{ companion.location }}
              </span>
              <button
                @click="openModal(companion)"
                class="!rounded-button whitespace-nowrap bg-primary text-white px-4 py-2 text-sm hover:bg-blue-700 transition"
              >
                {{ t("companion.view_profile") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
