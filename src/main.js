import Vue from 'vue'
import App from './App'
import router from './router'
import Toasted from 'vue-toasted';
Vue.use(Toasted)
import {
  Vuetify,
  VApp,
  VBtn,
  VIcon,
  VGrid,
  VTooltip,
  vTextField,
  vForm,
  vCard,
  vDialog,
  vToolbar,
  vList,
  vDivider,
  vNavigationDrawer,
  vSubheader,
  vSnackbar,
  transitions,
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VIcon,
    VGrid,
    VTooltip,
    vTextField,
    vForm,
    vCard,
    vDialog,
    vToolbar,
    vList,
    vDivider,
    vNavigationDrawer,
    Toasted,
    vSubheader,
    vSnackbar,
    transitions,
  },
  theme: {
    primary: '#1976D2',
    secondary: '#616161',
    accent: '#0097A7',
    error: '#D32F2F',
    info: '#303F9F',
    success: '#388E3C',
    warning: '#FBC02D'
  }
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})