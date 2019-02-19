import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Meetups from './components/Meetup/Meetups'
import CreateMeetup from './components/Meetup/CreateMeetup'
import Profile from './components/User/Profile'
import Signin from './components/User/Signin.vue'
import HelloWorld from './components/HelloWorld'
import Signup from './components/User/Signup'
import Meetup from './components/Meetup/Meetup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ],
  mode: 'history'
})
