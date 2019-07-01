<template>
<v-container fluid>
    <v-form
    v-if="!loading"
    ref="form"
    v-model="valid"
    @submit.prevent="login"
    @keydown.prevent.enter
  >
  <v-flex px-5 pt-3 mt-2>
  <v-text-field
      v-model="user.email"
      :rules="rules.emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      :rules="rules.passRules"
      label="Password"
      @click:append="show = !show"
      required
    ></v-text-field>

    <v-spacer></v-spacer>

    <v-btn
      type="submit"
      color="primary"
      :disabled="!valid"
    >
      Log in
    </v-btn>
  </v-flex>
  </v-form>
  <v-layout
    v-if="loading"
    align-center 
    justify-center 
    fill-height>
      <v-progress-circular
      :size="100"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-layout>
</v-container>  
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: "login",
    data: (vm) => ({
        valid: false,
        show: false,
        user: {
            email: '',
            password: ''
        },
        rules : {
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passRules: [
                v => !!v || 'Password is required'
            ]
        }
    }),
    computed: {
      ...mapState('auth', { loading: 'isAuthenticatePending' }),
    },
    methods: {
    ...mapActions('auth', ['authenticate']),
    login(){
      if (this.valid){
        this.authenticate({
            strategy: 'local',
            email: this.user.email,
            password: this.user.password
            }).then(() => {
                //console.log('Logged in');
                this.$router.push('/boards');
            }).catch(e => {
            // Show login page (potentially with `e.message`)
            console.error('Authentication error', e);
        });
      }
    }
  }
};
</script>
