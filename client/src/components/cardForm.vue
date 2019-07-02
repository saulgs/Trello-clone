<template>
    <v-layout row wrap>
    <v-flex xs12 mx-auto>
      <v-card>
        <v-card-title primary-title style="flex-direction: column">
          <div class="headline">
            <span class="grey--text">Create card</span><br>
          </div>
          <div>
            <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="createCard"
                @keydown.prevent.enter
            >
                <v-flex px-5 pt-3 mt-2>
                    <v-text-field
                    v-model="card.title"
                    :rules="[v => !!v || 'Card title is required']"
                    label="Card title"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="card.description"
                    :rules="[v => !!v || 'Card description is required']"
                    label="Card description"
                    required
                    ></v-text-field>

                    <v-spacer></v-spacer>

                    <v-btn
                    type="submit"
                    color="primary"
                    :disabled="!valid"
                    >
                    Create
                    </v-btn>
                </v-flex>
            </v-form> 
          </div>
        </v-card-title>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-flex>
</v-layout>
</template>

<script>
export default {
    props: {
        listid: {
            type: String,
            default: ''
        },
    },
    data: () => ({
        valid: false,
        card: {
            title: '',
            description: '',
            order: 0,
            archived: false
        }
    }),
    computed: {

    },
    methods: {
        createCard(){
            if (this.valid){
                const { Card } = this.$FeathersVuex;
                this.card.listId = this.listid;
                this.card.boardId = this.$route.params.id;
                const card = new Card(this.card);
                card.save();
                this.card = {
                    title: '',
                    description: '',
                    order: 0,
                    archived: false
                };
            }
        }
    }
}
</script>

