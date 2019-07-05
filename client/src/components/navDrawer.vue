<template>
  <v-layout row fill-height style="align-items:stretch;">
    <v-flex xs12>
      <v-card height="100%">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Activities</h3>
          </div>
        </v-card-title>
        <v-list three-line>
          <v-list-tile v-for="activity in activitiesByDate" :key="activity._id" @click="">
            <v-list-tile-action>
              <v-icon color="green">local_activity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <!-- <v-list-tile-title v-text="activity.userId"></v-list-tile-title> -->
              <v-list-tile-sub-title></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  props: ['activitiesByDate'],
  methods: {
  },
};
</script>