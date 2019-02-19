<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to='item.link'>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color='primary' fixed app>
      <v-toolbar-side-icon 
        @click.stop="drawer = !drawer"
        class='hidden-sm-and-up'
      ></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link class='home' to='/' tag='span' style='cursor: pointer'>
            G102 Meetups
          </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class='hidden-xs-only'
        v-for="item in menuItems" 
        :key="item.title"
        :to='item.link'>
        <v-icon left dark>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      navigation: null
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
          {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>

<style>
  .home {
    font-weight: bold;
    font-size: 1.5em;
    text-shadow: 2px 2px black;
  }
</style>
