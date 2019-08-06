import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import 'bulma/bulma.sass'
import '@/assets/scss/draggable.scss'
import 'font-awesome/scss/font-awesome.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(VueI18n)

const messages = {
  en: require('./i18n/en.json'), // todo
  fr: require('./i18n/fr.json')
}

const locale = 'fr'
const i18n = new VueI18n({
  locale,
  messages
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
  i18n
}).$mount('#app')