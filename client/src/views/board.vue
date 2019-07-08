<template>
    <v-container pa-0 ma-0 fluid>
        <v-layout pa-0 ma-0>
            <v-flex xs10>
                <v-flex xs12 v-if="boardError">
                    <v-alert
                        :value="boardError"
                        type="error"
                    >
                        {{boardError.message}}
                    </v-alert>
                </v-flex>
            <v-container v-if="!boardError" pa-0 ma-0 fluid>
                <v-layout v-if="!loadingBoard">
                    <v-flex xs1 align-center justify-center>  
                        <v-btn icon :to="{ name: 'boards' }">
                            <v-icon>mdi mdi-arrow-left-thick</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs11 align-center>
                        <h2>{{board.name}}</h2>
                    </v-flex>
                </v-layout>
                <v-layout
                    v-if="loadingBoard || loadingLists"
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
                    >
                    </v-progress-circular>
                </v-layout>
                <v-layout v-if="!loadingLists" row wrap>
                    <v-flex v-for="list in lists" :key="list._id" xs12 sm6 md4 lg3 xl3 px-1 py-2 mx-auto>
                        <listCard 
                            :listName="list.name"
                            :lstId="list._id"
                            :list="list"
                            :setDroppingList="onSetDroppingList"
                            :startDragging="startDraggingCards"
                            :dropCard="dropCard"
                            :droppingList="droppingList"
                            :cardsByListId="cardsByListId"
                        />
                    </v-flex>
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
                                            >
                                            </v-text-field>
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
            <v-content>
                <router-view>
                </router-view>
            </v-content>
            </v-flex>
            <v-flex xs2>
                <navDrawer
                v-if="!loadingBoard"
                :activitiesByDate="activitiesByDate"
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import listCard from '../components/listCard';
import navDrawer from '../components/navDrawer';

export default {
    components:{
        listCard,
        navDrawer
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
            this.board = response.data || response;
        });
        this.findLists({
            query:{
                boardId: this.$route.params.id
            }
        });
        this.findCards({
            query:{
                boardId: this.$route.params.id
            }
        });
        this.findActivities({
            query:{
                boardId: this.$route.params.id
            }
        });        
    },
    computed: {
        ...mapState('auth', { user: 'payload' }),
        ...mapState('boards', { loadingBoard: 'isGetPending',
                                boardError: 'errorOnGet' }),
        ...mapState('lists', { loadingLists: 'isFindPending',
                                listError: 'errorOnfind' }),
        ...mapState('brd', ['droppingList', 'draggingCard']),
        ...mapState('cards', { loadingCards: 'isFindPending' }),
        ...mapState('activities', { loadingActivities: 'isFindPending' }),
        ...mapGetters('lists', { findListsinDB: 'find' }),
        ...mapGetters('cards', { findCardsinDB: 'find' }),
        ...mapGetters('activities', { findActivitiesinDB: 'find' }),
        lists(){
            return this.findListsinDB({
                query:{
                    boardId: this.$route.params.id
                }
                }).data;
        },
        cards(){
            return this.findCardsinDB({
                query:{
                    boardId: this.$route.params.id
                }
            }).data;
        },
        cardsByListId() {
            return this.cards.reduce((byId, card) => {
                byId[card.listId] = byId[card.listId] || [];
                byId[card.listId].push(card);
                return byId;
            }, {});
        },
        activitiesByDate() {
            return this.findActivitiesinDB(
                {
                    boardId: this.$route.params.id
                },
                null,
                {
                    createdAt: '-1'
                }
            ).data;
        },
    },
    methods: {
        ...mapMutations('brd', ['setDroppingList', 'setDraggingCard']),
        ...mapActions('boards', { getBoard: 'get' } ),
        ...mapActions('lists', { findLists: 'find' } ),
        ...mapActions('cards', { findCards: 'find' } ),
        ...mapActions('activities', { findActivities: 'find' } ),
        async createList(){
            if (this.valid){
                const { List } = this.$FeathersVuex;
                this.list.boardId = this.$route.params.id;
                const list = new List(this.list);
                await list.save();
                this.createActivity(`${this.user.userInfo.displayName} created list ${list.name}`);
                this.list = {
                    name: '',
                    order: 0,
                    archived: false
                };
            }
        },
        async createActivity(text){
            const { Activity } = this.$FeathersVuex;
            const activity = new Activity();
            activity.text = text;
            activity.boardId = this.$route.params.id;
            activity.userId = this.user.userInfo._id;
            await activity.save();
        },
        startDraggingCards(card) {
            this.setDraggingCard(card);
        },
        onSetDroppingList(event, list) {
            event.preventDefault();
            this.setDroppingList(list);
        },
        async dropCard() {
            if (this.droppingList) {
                if (this.draggingCard.listId !== this.droppingList._id) {
                const fromList = this.lists.find(list => list._id === this.draggingCard.listId);
                const toList = this.lists.find(list => list._id === this.droppingList._id);
                this.draggingCard.listId = this.droppingList._id;
                await this.draggingCard.save();
                this.createActivity(`${this.user.userInfo.displayName} moved card ${this.draggingCard.title} from ${fromList.name} to ${toList.name}`);
                }
            }
            this.setDroppingList(null);
            this.setDraggingCard(null);
        },
    }
}
</script>

<style>
.back {
  background-size: cover;
}
</style>

