import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//Composition API
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

//BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
