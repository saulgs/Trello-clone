<template>
    <v-flex xs12 sm6 md4 lg3 xl3 px-1 py-2 mx-auto>
        <v-card>
            <v-img
            d-block
            style="overflow-y: auto; max-height: 200px;"
            :src="boardBackground"
            >
            </v-img>
            <v-card-title primary-title>
                <span class="headline">
                    {{boardName}}
                </span>
            </v-card-title>
            <v-card-actions>
                <v-btn color="primary" :to="boardLink">Go</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: {
        boardName: {
            type: String,
            default: "Board title"
        },
        boardBackground:{
            type: String,
            default: "http://youthcymru.org.uk/wp-content/uploads/2019/04/plain-green-background-wallpaper-3.jpg"
        },
        boardLink:{
            type: Object,
            default: { name: 'board', params:{ id: '' }}
        }
    },
    data: () => ({

    })
}
</script>
