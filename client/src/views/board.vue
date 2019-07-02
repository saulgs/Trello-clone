<template>
<v-container fluid>
    <v-layout
    v-if="loadingBoard || loadingLists"
    mx-auto
    >
        <v-progress-circular
        :size="100"
        :width="7"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </v-layout>
    <v-layout v-if="board" row wrap>
        <v-flex xs2 sm1 md1 lg1 xl1> 
            <v-btn icon :to="{ name: 'boards' }">
                <v-icon>mdi mdi-arrow-left-thick</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs10 sm11 md11 lg11 xl11>
            <h2>{{board.name}}</h2>
        </v-flex>
    </v-layout>
    <v-layout v-if="!loadingLists" row wrap>
        <listCard 
            :listName="list.name"
            :lstId="list._id"
            v-for="list in lists" 
            :key="list._id"/>
    </v-layout>
    <v-layout v-if="!loadingBoard" row wrap>
        <v-flex xs12 sm6 md4 lg3 xl3 py-3 mx-auto>
        <v-card>
            <v-card-title primary-title style="flex-direction: column">
            <div class="headline">
                <span class="grey--text">Create list</span><br>
            </div>
            <div>
                <v-form
                    ref="form"
                    v-model="valid"
                    @submit.prevent="createList"
                    @keydown.prevent.enter
                >
                    <v-flex px-5 pt-3 mt-2>
                        <v-text-field
                        v-model="list.name"
                        :rules="[v => !!v || 'List name is required']"
                        label="List name"
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
    <v-content>
        <router-view>
        </router-view>
    </v-content>
</v-container>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import listCard from '../components/listCard';

export default {
    components:{
        listCard
    },
    data: () => ({
        valid: true,
        board: {},
        list: {
            name: '',
            order: 0,
            archived: false,
        },
    }),
    mounted() {
        this.getBoard(this.$route.params.id)
        .then(response => {
        // In the find action, the 'todos' array is not a reactive list, but the individual records are.
        this.board = response.data || response;
        });
        this.findLists({
            query:{
                boardId: this.$route.params.id
            }
        })
        .then(response => {
        // In the find action, the 'todos' array is not a reactive list, but the individual records are.
        const lists = response.data || response;
        })        
    },
    computed: {
        ...mapState('boards', { loadingBoard: 'isGetPending' }),
        ...mapState('lists', { loadingLists: 'isFindPending' }),
        ...mapGetters('lists', { findListsinDB: 'find' }),
        lists(){
            return this.findListsinDB({
                query:{
                    boardId: this.$route.params.id
                }
                }).data;
        },
        
    },
    methods: {
        ...mapActions('boards', { getBoard: 'get' } ),
        ...mapActions('lists', { findLists: 'find' } ),
        createList(){
            if (this.valid){
                const { List } = this.$FeathersVuex;
                this.list.boardId = this.$route.params.id;
                const list = new List(this.list);
                list.save();
                this.list = {
                    name: '',
                    order: 0,
                    archived: false
                };
            }
        },
    }
}
</script>
