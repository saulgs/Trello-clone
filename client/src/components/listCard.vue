<template>
    <v-flex xs12 sm6 md4 lg3 xl3 px-1 py-2 mx-auto>
        <v-card>
            <v-card-title primary-title>
                <v-layout style="flex-direction: column">
                    <h6 py-1 class="headline">
                        {{listName}}
                    </h6>
                    <card
                    :title="card.title"
                    :description="card.description"
                    :cardLink="{ name: 'card', 
                                params: { cardid: card._id } 
                               }"
                    v-for="card in cards"
                    :key="card._id"
                    />
                </v-layout>
            </v-card-title>
            <v-card-actions>
                <v-layout style="flex-direction: column">
                <v-flex>
                    <v-btn
                    flat
                    @click="seen = !seen"
                    >
                        <v-icon>{{seen ? 'mdi mdi-close' : 'mdi mdi-plus'}}</v-icon>
                        {{seen ? ' close form' : ' add card'}}
                    </v-btn>    
                </v-flex>
                <v-flex v-show="seen">
                    <cardForm 
                    :listid="lstId"
                    />
                </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import cardForm from '../components/cardForm';
import card from '../components/card';

export default {
    props: {
        listName: {
            type: String,
            default: "list title"
        },
        lstId: {
            type: String,
            default : ''
        }
    },
    components: {
        cardForm,
        card
    },
    data: () => ({
        seen: false,
    }),
    mounted() {
        this.findCards({
            query:{
                listId: this.lstId,
                boardId: this.$route.params.id
            }
        })
        .then(response => {
        // In the find action, the 'todos' array is not a reactive list, but the individual records are.
        const cards = response.data || response;
        
        })  
    },
    computed: {
        ...mapState('cards', { loadingCards: 'isFindPending' }),
        ...mapGetters('cards', { findCardsinDB: 'find' }),
        cards(){
            return this.findCardsinDB({
                query:{
                    listId: this.lstId,
                    boardId: this.$route.params.id
                }
            }).data;
        },
    },
    methods: {
        ...mapActions('cards', { findCards: 'find' } ),
    }
}
</script>
