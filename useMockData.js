import { ref } from 'vue'

export function useMockData() {
  const companions = ref([
    {
      id: 1,
      name: 'Visa & Residence Health Check Navigator',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/cc066b71814bbecac8ee80ac05c5dec2.jpg',
      gender: 'male',
      serviceType: 'visa',
      languages: ['english', 'chinese'],
      rating: 4.9,
      price: 299,
      bio: 'For work visa applicants, foreign teachers, and students who need to know whether an official health certificate is required.',
      region: 'guangzhou',
      distance: 1,
      specialties: [
        'Official center vs private checkup explanation',
        'Document and appointment checklist',
        'Overseas report risk review',
        'Employer or school question template'
      ],
      introduction: 'Use this plan before paying for a medical exam. We help you separate an official China visa or residence health certificate from a private annual checkup, then prepare the likely documents, timing, and questions to confirm with your employer, school, or local authority.'
    },
    {
      id: 2,
      name: 'Shanghai New Arrival Health Check Plan',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/339f341e962c49c84dd7d9238ad3c8f3.jpg',
      gender: 'male',
      serviceType: 'visa',
      languages: ['english', 'chinese', 'japanese'],
      rating: 4.8,
      price: 399,
      bio: 'A city-specific planning pack for foreigners arriving in Shanghai for work, study, or long-stay residence.',
      region: 'shanghai',
      distance: 2,
      specialties: [
        'Shanghai timing and booking preparation',
        'Passport and form checklist',
        'English communication support',
        'Report pickup and next-step routing'
      ],
      introduction: 'Shanghai arrivals often need to act quickly because health checks can affect residence permit timelines. This plan helps you understand the likely path, prepare documents, and coordinate English support before and after the visit.'
    },
    {
      id: 3,
      name: 'Shenzhen Full Body Checkup Package Match',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/5d34a55337f8270b24cd5a39c8cc8e83.jpg',
      gender: 'female',
      serviceType: 'full_checkup',
      languages: ['english', 'chinese', 'spanish'],
      rating: 4.7,
      price: 199,
      bio: 'For self-pay visitors and expat employees who want a private annual or comprehensive checkup without overbuying tests.',
      region: 'shenzhen',
      distance: 3,
      specialties: [
        'Basic, comprehensive, and executive package comparison',
        'Hospital type and budget matching',
        'English report availability check',
        'Unnecessary-test prevention questions'
      ],
      introduction: 'Private full-body checkups are different from official visa medical exams. We help you compare package levels, ask safer screening questions, and choose a path that fits your city, budget, age, and reporting needs.'
    },
    {
      id: 4,
      name: 'Guangzhou 40+ Preventive Screening Planner',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/9060a6b3952e4511297bd2460561679f.jpg',
      gender: 'female',
      serviceType: 'full_checkup',
      languages: ['english', 'chinese', 'german'],
      rating: 4.8,
      price: 249,
      bio: 'For US and European self-pay visitors comparing China checkup options for cardiovascular, metabolic, and cancer screening.',
      region: 'guangzhou',
      distance: 4,
      specialties: [
        'Age-aware screening conversation guide',
        'Public international department vs private hospital comparison',
        'English report and doctor review planning',
        'Follow-up routing if results need attention'
      ],
      introduction: 'This plan is designed for people who want preventive screening while in China but do not want a confusing or excessive package. We help you prepare the right questions and route abnormal findings to an appropriate follow-up visit.'
    },
    {
      id: 5,
      name: 'On-site Medical Escort & Interpretation',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/dcf3e9ff34c7eb28a3a85370c9bd2af9.jpg',
      gender: 'female',
      serviceType: 'escort',
      languages: ['english', 'chinese', 'french'],
      rating: 4.9,
      price: 599,
      bio: 'For foreigners who want someone to help with registration, payment, departments, translation, and report pickup.',
      region: 'shenzhen',
      distance: 2,
      specialties: [
        'Hospital navigation and check-in',
        'English-Chinese interpretation',
        'Payment and report collection support',
        'Privacy-aware visit coordination'
      ],
      introduction: 'Choose this plan when the medical system is possible but hard to use in practice. The escort helps you move through registration, testing, payment, and report pickup while keeping the role limited to coordination and interpretation.'
    },
    {
      id: 6,
      name: 'Shanghai Report Translation & Follow-up Routing',
      avatar: 'https://ai-public.mastergo.com/ai/img_res/339f341e962c49c84dd7d9238ad3c8f3.jpg',
      gender: 'female',
      serviceType: 'report',
      languages: ['english', 'chinese', 'korean'],
      rating: 4.6,
      price: 149,
      bio: 'For people who already completed tests and need report organization, English explanation of labels, and next-step routing.',
      region: 'shanghai',
      distance: 1,
      specialties: [
        'Report terminology translation',
        'Result organization for insurance or employer use',
        'Questions to ask a doctor',
        'Referral routing for abnormal findings'
      ],
      introduction: 'This plan does not interpret results as a diagnosis. It helps you understand the structure and labels of Chinese reports, prepare questions for a licensed doctor, and decide whether a follow-up appointment should be arranged.'
    }
  ])

  return {
    companions
  }
}
