<template>
    <v-flex xs12 sm6 md4 lg3 xl3 px-1 py-2 mx-auto>
        <v-card>
            <v-card-title primary-title>
                <span class="headline">
                    {{listName}}
                </span>
            </v-card-title>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: {
        listName: {
            type: String,
            default: "list title"
        },
    },
    data: () => ({

    })
}
</script>
