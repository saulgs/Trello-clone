<template>
        <v-card @dragover="setDroppingList($event, list)" :class="{ 'green lighten-4' : droppingList == list }">
            <v-card-title primary-title>
                <v-layout style="flex-direction: column">
                    <h6 py-1 class="headline">
                        {{listName}}
                    </h6>
                    <v-flex v-for="card in cardsByListId[list._id]" :key="card._id" xs12 py-1>
                        <a
                        style="text-decoration: none"
                        >
                            <v-hover>
                                <card
                                slot-scope="{ hover }"
                                :class="`elevation-${hover ? 12 : 2}`"
                                :startDragging="startDragging"
                                :dropCard="dropCard"
                                :title="card.title"
                                :description="card.description"
                                :cardLink="{ name: 'card', 
                                            params: { cardid: card._id } 
                                        }"
                                :card="card"
                                />
                            </v-hover>
                        </a>
                    </v-flex>
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
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import cardForm from '../components/cardForm';
import card from '../components/card';

export default {
    props: [
        'listName',
        'lstId',
        'startDragging',
        'dropCard',
        'setDroppingList',
        'droppingList',
        'list',
        'cardsByListId',
    ],
    components: {
        cardForm,
        card
    },
    data: () => ({
        seen: false,
    }),
    mounted() {
         
    },
    computed: {
        
    },
    methods: {
        
    }
}
</script>
