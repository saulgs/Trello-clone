<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Trello Clone </span>
        <span class="font-weight-light">- with Vuetify MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if=!user class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'signup'}">Sign up</v-btn>
        <v-btn flat :to="{name: 'login'}">Log in</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if=user class="hidden-sm-and-down">
        <v-layout justify-content align-center>
          <h3>{{user.userInfo.displayName}}</h3>
          <v-avatar
            :size="40"
            color="grey lighten-4"
          >
            <img :src="user.userInfo.imageUrl" alt="avatar">
          </v-avatar>
        </v-layout>
        <v-btn flat @click="logout">Log out</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer height="auto">
      <v-flex primary text-xs-center white--text wrap>
        <span>&copy; <strong>2019 - Made by 😎 Saúl Guzmán 😎</strong></span>
      </v-flex>
    </v-footer>   
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    
  }),
  computed: {
    ...mapState('auth', {user: 'payload'})
  },
  methods: {
    ...mapActions('auth', {authLogout: 'logout'}),
    logout(){
      this.authLogout().then(() => {
        this.$router.push('/login');
      });      
    },
  }
};
</script>
