import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import firebase from 'firebase'
import Alert from './components/Shared/Alert.vue'
import { Script } from 'vm';



Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBDirS_UbA5o6IP1W0tbh-18H4Mn6VsNI8",
    authDomain: "g102-meetups.firebaseapp.com",
    databaseURL: "https://g102-meetups.firebaseio.com",
    projectId: "g102-meetups",
    storageBucket: "g102-meetups.appspot.com",
    messagingSenderId: "433996510260",
    appId: "1:433996510260:web:7be1e26c634dd473"
  })
}
}).$mount('#app')

