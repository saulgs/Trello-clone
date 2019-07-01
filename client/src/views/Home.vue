<template>
<v-container fluid>
  <v-layout
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

import { mapActions } from 'vuex';

export default {
  data: () =>({

  }),
  mounted() {
    this.authenticate().then(() => {
      setTimeout(() => {this.$router.push('/boards')} ,1500);
    }).catch(e => {
      setTimeout(() => {this.$router.push('/login')}, 1500);
    });
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
  }, 
}
</script>

