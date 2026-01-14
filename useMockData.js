import { ref } from 'vue'

// 模拟陪护人员数据
export function useMockData() {
  const companions = ref([
    {
      id: 1,
      name: 'Zhang Wei',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      gender: 'female',
      languages: ['english', 'chinese'],
      rating: 4.9,
      price: 120,
      bio: 'Fluent in English and Chinese with 5 years of medical companion experience.',
      region: 'nanshan',
      distance: 2.5,
      specialties: ['General Medicine', 'Pediatrics'],
      introduction: 'I am a professional medical companion with extensive experience helping foreigners navigate the Chinese healthcare system. I speak fluent English and Chinese, and I am familiar with major hospitals in Shenzhen.'
    },
    {
      id: 2,
      name: 'Li Ming',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'japanese'],
      rating: 4.8,
      price: 100,
      bio: 'Multilingual medical companion specializing in elderly care.',
      region: 'futian',
      distance: 3.2,
      specialties: ['Geriatrics', 'Cardiology'],
      introduction: 'I have been working as a medical companion for over 8 years, with a focus on elderly care. I can communicate in English, Chinese, and Japanese, and I am knowledgeable about various medical conditions.'
    },
    {
      id: 3,
      name: 'Wang Fang',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'spanish'],
      rating: 4.7,
      price: 90,
      bio: 'Friendly and patient, with experience in pediatric care.',
      region: 'luohu',
      distance: 4.1,
      specialties: ['Pediatrics', 'Dermatology'],
      introduction: 'I love working with children and have extensive experience in pediatric care. I can communicate in English, Chinese, and Spanish, and I am familiar with the pediatric departments of major hospitals in Shenzhen.'
    },
    {
      id: 4,
      name: 'Chen Hao',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'french'],
      rating: 4.9,
      price: 130,
      bio: 'Medical professional with clinical background.',
      region: 'baoan',
      distance: 5.3,
      specialties: ['Internal Medicine', 'Orthopedics'],
      introduction: 'I am a former nurse with clinical experience, which gives me a deeper understanding of medical procedures and patient care. I can communicate in English, Chinese, and French.'
    },
    {
      id: 5,
      name: 'Liu Xin',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'german'],
      rating: 4.6,
      price: 85,
      bio: 'Caring and attentive, with experience in mental health support.',
      region: 'longgang',
      distance: 6.7,
      specialties: ['Mental Health', 'Psychology'],
      introduction: 'I specialize in providing support for patients with mental health concerns. I can communicate in English, Chinese, and German, and I am trained in basic counseling techniques.'
    },
    {
      id: 6,
      name: 'Zhao Jun',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'korean'],
      rating: 4.7,
      price: 95,
      bio: 'Energetic and reliable, with experience in emergency situations.',
      region: 'longhua',
      distance: 7.2,
      specialties: ['Emergency Care', 'General Surgery'],
      introduction: 'I have experience working in emergency departments and can handle urgent situations calmly. I can communicate in English, Chinese, and Korean, and I am familiar with emergency procedures.'
    },
    {
      id: 7,
      name: 'Sun Li',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      gender: 'female',
      languages: ['english', 'chinese'],
      rating: 4.8,
      price: 110,
      bio: 'Detail-oriented with experience in chronic disease management.',
      region: '光明',
      distance: 8.5,
      specialties: ['Chronic Diseases', 'Endocrinology'],
      introduction: 'I specialize in helping patients with chronic diseases manage their conditions. I can communicate in English and Chinese, and I am knowledgeable about various treatment options.'
    },
    {
      id: 8,
      name: 'Wu Dong',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'japanese'],
      rating: 4.6,
      price: 90,
      bio: 'Patient and compassionate, with experience in rehabilitation support.',
      region: 'pingshan',
      distance: 9.8,
      specialties: ['Rehabilitation', 'Physical Therapy'],
      introduction: 'I have experience helping patients with rehabilitation after injuries or surgeries. I can communicate in English, Chinese, and Japanese, and I am trained in basic physical therapy techniques.'
    },
    {
      id: 9,
      name: 'Xu Yan',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'spanish'],
      rating: 4.9,
      price: 125,
      bio: 'Highly rated companion with experience in VIP care.',
      region: 'dapeng',
      distance: 10.3,
      specialties: ['VIP Care', 'Obstetrics'],
      introduction: 'I provide high-quality VIP care services for patients who require extra attention. I can communicate in English, Chinese, and Spanish, and I am familiar with the VIP services of major hospitals.'
    },
    {
      id: 10,
      name: 'Hu Tao',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'french'],
      rating: 4.7,
      price: 105,
      bio: 'Knowledgeable about traditional Chinese medicine and Western medicine.',
      region: 'yantian',
      distance: 11.2,
      specialties: ['Traditional Chinese Medicine', 'Acupuncture'],
      introduction: 'I have knowledge of both traditional Chinese medicine and Western medicine, which allows me to provide comprehensive support to patients. I can communicate in English, Chinese, and French.'
    }
  ])

  return {
    companions
  }
}