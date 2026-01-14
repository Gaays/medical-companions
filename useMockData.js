import { ref } from 'vue'

// 模拟陪护人员数据
export function useMockData() {
  const companions = ref([
    {
      id: 1,
      name: 'Zhang Wei',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/5d34a55337f8270b24cd5a39c8cc8e83.jpg',
      gender: 'female',
      languages: ['english', 'chinese'],
      rating: 4.9,
      price: 120,
      bio: 'Fluent in English and Chinese with 5 years of medical companion experience.',
      region: 'nanshan',
      distance: 2.5,
      specialties: ['Pediatric care', 'Vaccination assistance', 'Child-friendly hospitals'],
      introduction: 'I help families navigate pediatric care in Shenzhen, including vaccination assistance and connecting you with child-friendly hospitals. I speak fluent English and Chinese, and I am familiar with major hospitals in the area.'
    },
    {
      id: 2,
      name: 'Li Ming',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/9060a6b3952e4511297bd2460561679f.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'japanese'],
      rating: 4.8,
      price: 100,
      bio: 'Multilingual medical companion specializing in family support and insurance assistance.',
      region: 'futian',
      distance: 3.2,
      specialties: ['Family support', 'Insurance assistance', 'Medication guidance'],
      introduction: 'I provide comprehensive family support, including insurance assistance and medication guidance. I can communicate in English, Chinese, and Japanese, and I am knowledgeable about healthcare services in Shenzhen.'
    },
    {
      id: 3,
      name: 'Wang Fang',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/dcf3e9ff34c7eb28a3a85370c9bd2af9.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'spanish'],
      rating: 4.7,
      price: 90,
      bio: 'Friendly and patient, with experience in pediatric care and family support.',
      region: 'luohu',
      distance: 4.1,
      specialties: ['Pediatric care', 'Family support', 'Child-friendly hospitals'],
      introduction: 'I love working with children and families, providing support for pediatric care and connecting you with child-friendly hospitals. I can communicate in English, Chinese, and Spanish.'
    },
    {
      id: 4,
      name: 'Chen Hao',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'french'],
      rating: 4.9,
      price: 130,
      bio: 'Reliable companion with experience in emergency support and follow-up care.',
      region: 'baoan',
      distance: 5.3,
      specialties: ['24/7 emergency support', 'Follow-up care', 'Medication guidance'],
      introduction: 'I provide reliable support for emergency situations and follow-up care. I can communicate in English, Chinese, and French, and I am familiar with hospital procedures in Shenzhen.'
    },
    {
      id: 5,
      name: 'Liu Xin',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'german'],
      rating: 4.6,
      price: 85,
      bio: 'Caring and attentive, with experience in medication guidance and follow-up care.',
      region: 'longgang',
      distance: 6.7,
      specialties: ['Medication guidance', 'Follow-up care', 'Family support'],
      introduction: 'I specialize in providing medication guidance and follow-up care support. I can communicate in English, Chinese, and German, and I am dedicated to ensuring your comfort during medical visits.'
    },
    {
      id: 6,
      name: 'Zhao Jun',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'korean'],
      rating: 4.7,
      price: 95,
      bio: 'Energetic and reliable, with experience in emergency support and insurance assistance.',
      region: 'longhua',
      distance: 7.2,
      specialties: ['24/7 emergency support', 'Insurance assistance', 'Follow-up care'],
      introduction: 'I provide energetic and reliable support for emergency situations and insurance assistance. I can communicate in English, Chinese, and Korean, and I am familiar with emergency procedures.'
    },
    {
      id: 7,
      name: 'Sun Li',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      gender: 'female',
      languages: ['english', 'chinese'],
      rating: 4.8,
      price: 110,
      bio: 'Detail-oriented with experience in follow-up care and medication guidance.',
      region: 'guangming',
      distance: 8.5,
      specialties: ['Follow-up care', 'Medication guidance', 'Family support'],
      introduction: 'I provide detail-oriented support for follow-up care and medication guidance. I can communicate in English and Chinese, and I am dedicated to helping you manage your healthcare needs.'
    },
    {
      id: 8,
      name: 'Wu Dong',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'japanese'],
      rating: 4.6,
      price: 90,
      bio: 'Patient and compassionate, with experience in family support and vaccination assistance.',
      region: 'pingshan',
      distance: 9.8,
      specialties: ['Family support', 'Vaccination assistance', 'Child-friendly hospitals'],
      introduction: 'I provide patient and compassionate support for families, including vaccination assistance and connecting you with child-friendly healthcare facilities. I can communicate in English, Chinese, and Japanese.'
    },
    {
      id: 9,
      name: 'Xu Yan',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      gender: 'female',
      languages: ['english', 'chinese', 'spanish'],
      rating: 4.9,
      price: 125,
      bio: 'Highly rated companion with experience in pediatric care and medication guidance.',
      region: 'dapeng',
      distance: 10.3,
      specialties: ['Pediatric care', 'Medication guidance', 'Follow-up care'],
      introduction: 'I provide high-quality support for pediatric care, medication guidance, and follow-up care. I can communicate in English, Chinese, and Spanish, and I am dedicated to ensuring your child\'s comfort.'
    },
    {
      id: 10,
      name: 'Hu Tao',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      gender: 'male',
      languages: ['english', 'chinese', 'french'],
      rating: 4.7,
      price: 105,
      bio: 'Knowledgeable companion specializing in insurance assistance and 24/7 emergency support.',
      region: 'yantian',
      distance: 11.2,
      specialties: ['Insurance assistance', '24/7 emergency support', 'Family support'],
      introduction: 'I provide knowledgeable support for insurance assistance and emergency situations. I can communicate in English, Chinese, and French, and I am here to help you navigate any healthcare challenges.'
    }
  ])

  return {
    companions
  }
}