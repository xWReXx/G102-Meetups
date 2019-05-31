import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'snow', 
        imageUrl: 'https://static1.squarespace.com/static/5009bba4e4b016a023bf6030/t/5581ec20e4b0a5db48a55f56/1434577956896/Snowboarding-Wallpaper.jpg?format=1500w',
        title: 'Snowboarding',
        date: new Date(),
        location: 'Winterpark',
        description: 'snow day in the mountains'
      },
      {
        id: 'fish',
        imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Fishing',
        date: new Date(),
        location: 'Evergreen',
        description: 'fishing in the valley'
      },
      {
        id: 'code',
        imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Coding',
        date: new Date(),
        location: 'Galvanize',
        description: 'learning on the 4th floor'
      },
      {
        id: 'kombucha',
        imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
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
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find( meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.date) {
        meetup.date = payload.date
      }
      if (payload.description) {
        meetup.description = payload.description
      }
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
    loadMeetups({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorID: obj[key].creatorID
            })
          }
          commit('setLoading', false)
          commit('setLoadedMeetups', meetups)
        })
        .catch((error) => { 
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorID: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const fileName = payload.image.name
          const ext = fileName.slice(fileName.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then( data => {
          return data.ref.getDownloadURL()
            .then( downloadURL => {
              imageUrl = downloadURL
              return firebase.database().ref('meetups').child(key).update({imageUrl: downloadURL})
            })
        })
        .then (() => {
          commit('createMeetup', {
            ...meetup, 
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then( () => {
          commit('updateMeetup', payload)
          commit('setLoading', false)
        })
        .catch( error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    autoSignIn ({commit}, payload){
      commit('setUser', {id: payload.uid, registeredMeetups: []})

    },
    logout({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
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