<template>
<v-container fluid>
    <v-form
    v-if="!loading"
    ref="form"
    v-model="valid"
    @submit.prevent="signUp"
    @keydown.prevent.enter
  >
  <v-flex px-5 pt-3 mt-2> 
    <v-text-field
      v-model="user.email"
      :rules="rules.emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      :counter="16"
      :rules="rules.passRules"
      label="Password"
      @click:append="show = !show"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.confirmPassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      :rules="rules.passConfirmRule"
      label="Confirm Password"
      @click:append="show2 = !show2"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.displayName"
      :counter="20"
      :rules="rules.displayNameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.imageUrl"
      :rules="[v => !!v || 'Image URL is required']"
      label="Image URL"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-spacer></v-spacer>

    <v-btn
      type="submit"
      color="primary"
      :disabled="!valid"
    >
      Sign Up
    </v-btn>
  </v-flex>
  </v-form>
  <v-layout
      v-if="loading" 
      align-center 
      justify-center 
      fill-height>
    <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
  </v-layout>
</v-container> 
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: "signUp",
    data: (vm) => ({
    valid: false,
    show: false,
    show2: false,
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: ''
    },
    rules : {
      displayNameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 16) || 'Password must be less than 16 characters',
        v => (v && v.length >= 8) || 'Min 8 characters'
      ],
      passConfirmRule: [
        v => !!v || 'Confirm password is required',
        v => v === vm.user.password || 'Password must match'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    },
    checkbox: false
    }),
    computed: {
      ...mapState('users', { loading: 'isCreatePending' }),
    },
    methods: {
    async signUp(){
      if (this.valid){
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        await user.save();
        this.$router.push('/login');
      }
    }
  }
};

</script>

