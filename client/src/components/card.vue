<template>
    <v-card
    draggable="true"
    @dragstart="startDragging(card)"
    @dragend="dropCard()"
    :to="cardLink"
    >
        <v-card-title>
            <v-layout style="flex-direction: column">
                <span class="headline">
                    {{title}}
                </span>
            </v-layout>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    props: [
        'title',
        'description',
        'cardLink',
        'startDragging',
        'dropCard',
        'card'
    ],
    data: () => ({
        dialog: false,
        
    }),
    mounted() {
        
    },
    computed: {

    }
}
</script>

