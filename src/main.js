import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { VueMaskDirective } from 'v-mask'

const vMaskV2 = VueMaskDirective
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind
}
createApp(App)
  .directive('mask', vMaskV3)
  .use(VueAxios, axios)
  .use(store)
  .mount('#app')
