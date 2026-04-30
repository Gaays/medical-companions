import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faArrowLeft,
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

config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  library.add(
    faBars,
    faArrowLeft,
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
