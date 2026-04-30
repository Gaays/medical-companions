import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faCheckCircle,
  faChevronDown,
  faCircleCheck,
  faEnvelope,
  faFileMedical,
  faLanguage,
  faLocationDot,
  faLock,
  faMapMarkerAlt,
  faPhone,
  faRoute,
  faShieldHalved,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(
    faBars,
    faCheckCircle,
    faChevronDown,
    faCircleCheck,
    faEnvelope,
    faFileMedical,
    faLanguage,
    faLocationDot,
    faLock,
    faMapMarkerAlt,
    faPhone,
    faRoute,
    faShieldHalved,
    faTimes,
  )

  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
