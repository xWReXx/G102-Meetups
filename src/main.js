import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import firebase from 'firebase'
import Alert from './components/Shared/Alert.vue'
import editMeetupModal from './components/Meetup/editMeetupModal.vue'
import editMeetupDate from './components/Meetup/editMeetupDate.vue'
import editMeetupTime from './components/Meetup/editMeetupTime.vue'
import registerModal from './components/Meetup/registrationModal.vue'


Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetup-details', editMeetupModal)
Vue.component('app-edit-meetup-date', editMeetupDate)
Vue.component('app-edit-meetup-time', editMeetupTime)
Vue.component('app-edit-registration', registerModal)

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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.$store.dispatch('autoSignIn', user)
    }
  })
  this.$store.dispatch('loadMeetups')
}
}).$mount('#app')

