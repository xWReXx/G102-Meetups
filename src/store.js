import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: 'snow', 
        src: 'https://static1.squarespace.com/static/5009bba4e4b016a023bf6030/t/5581ec20e4b0a5db48a55f56/1434577956896/Snowboarding-Wallpaper.jpg?format=1500w',
        title: 'Snowboarding',
        date: '2019-02-22',
        location: 'Winterpark'
      },
      {
        id: 'fish',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        title: 'Fishing',
        date: '2019-02-23',
        location: 'Evergreen'
      },
      {
        id: 'code',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        title: 'Coding',
        date: '2019-02-24',
        location: 'Galvanize'
      },
      {
        id: 'kombucha',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        title: 'Kombucha',
        date: '2019-02-25',
        location: 'Galvanize'
      }
    ],
    user: {
      id: 'xWReXx',
      registeredMeetups: [1]
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  }
})
