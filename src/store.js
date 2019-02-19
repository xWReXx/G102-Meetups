import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'snow', 
        src: 'https://static1.squarespace.com/static/5009bba4e4b016a023bf6030/t/5581ec20e4b0a5db48a55f56/1434577956896/Snowboarding-Wallpaper.jpg?format=1500w',
        title: 'Snowboarding',
        date: new Date(),
        location: 'Winterpark',
        description: 'snow day in the mountains'
      },
      {
        id: 'fish',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Fishing',
        date: new Date(),
        location: 'Evergreen',
        description: 'fishing in the valley'
      },
      {
        id: 'code',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Coding',
        date: new Date(),
        location: 'Galvanize',
        description: 'learning on the 4th floor'
      },
      {
        id: 'kombucha',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        title: 'Kombucha',
        date: new Date(),
        location: 'Galvanize',
        description: 'chilling on the 4th floor'
      }
    ],
    user: null,
    loading: null,
    error: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'kfdlsfjslakl12'
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          cred => {
            commit('setLoading', false)
            const newUser = {
              id: cred.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          cred => {
            commit('setLoading', false)
            const newUser = {
              id: cred.user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})