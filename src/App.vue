<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in navigation" :key="item.title">
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>G102 Meetups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="item in navigation" :key="item.title">
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
      navigation: [
        {icon: 'supervisor_account', title: 'G102 Meetups'},
        {icon: 'room', title: 'Organize Meetup'},
        {icon: 'person', title: 'Profile'},
        {icon: 'face', title: 'Sign up'},
        {icon: 'lock_open', title: 'Sign in'}

      ]
    }
  }
}
</script>
