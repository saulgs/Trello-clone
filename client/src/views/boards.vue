<template>
<v-container fluid>
    <v-layout
    v-if="loading"
    align-center 
    justify-center 
    fill-height
    row
    wrap
    >
        <v-progress-circular
        :size="100"
        :width="7"
        color="primary"
        indeterminate
        ></v-progress-circular>
    </v-layout>
    <v-layout v-if="!loading" row wrap>
        <boardCard 
            :boardName="board.name" 
            :boardBackground="board.background"
            :boardLink="{ name:'board', params:{ id: board._id}}" 
            v-for="board in boards" 
            :key="board._id"/>
    </v-layout>
<v-layout v-if="!loading" row wrap>
    <v-flex xs12 sm6 md4 lg3 xl3 py-3 mx-auto>
      <v-card>
        <v-card-title primary-title style="flex-direction: column">
          <div class="headline">
            <span class="grey--text">Create board</span><br>
          </div>
          <div>
            <v-form
                v-if="!loading"
                ref="form"
                v-model="valid"
                @submit.prevent="createBoard"
                @keydown.prevent.enter
            >
                <v-flex px-5 pt-3 mt-2>
                    <v-text-field
                    v-model="board.name"
                    :rules="[v => !!v || 'Board name is required']"
                    label="Board name"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="board.background"
                    :rules="[v => !!v || 'Image URL is required']"
                    label="background"
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
</v-container>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex';
import boardCard from '../components/boardCard';

export default {
    components:{
        boardCard
    },
    name: 'boards',
    data: () => ({
        valid: true,
        board: {
            name: '',
            background: ''
        },
    }),
    mounted() {
        this.findBoards({ query: {} })
        .then(response => {
        // In the find action, the 'todos' array is not a reactive list, but the individual records are.
        const boards = response.data || response;
        })        
    },
    computed: {
        ...mapState('auth', {user: 'payload'}),
        ...mapGetters('boards', { findBoardsInDB: 'find' }),
        ...mapState('boards', { loading: 'isFindPending' }),
        boards(){
            return this.user ? this.findBoardsInDB({ 
                query: {
                    ownerId: this.user.userId,
                } 
            }).data : [];
        }
    },
    methods: {
        ...mapActions('boards', { findBoards: 'find' } ),
        createBoard(){
            if (this.valid){
                const { Board } = this.$FeathersVuex;
                const board = new Board(this.board);
                board.save();
                this.board = {
                    name: '',
                    background: ''
                };
            }
        }
    }
}
</script>
