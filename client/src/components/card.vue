<template>
    <v-flex xs12 py-1>
        <a
        style="text-decoration: none"
        >
        <v-hover>
            <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
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
        </v-hover>
        </a>
    </v-flex>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Card title'
        },
        description: {
            type: String,
            default: 'Card description'
        },
        cardLink: {
            type: Object,
            default: { name: 'card', params: { cardid: '' }}
        }
    },
    data: () => ({
        dialog: false,
        
    }),
    mounted() {
    },
    computed: {

    }
}
</script>

