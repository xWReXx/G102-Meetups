<template>
    <v-dialog 
        width="350px" 
        persistent 
        v-model="editDialog"
    >
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-card-title>Edit Mettup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field 
                                name="title" 
                                label="Title" 
                                id="title"
                                v-model="editedTitle"
                                required>
                            </v-text-field>
                            <v-textarea
                                name="description"
                                label="Description"
                                v-model="editedDescription"
                                id="description"
                                required
                            >
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn 
                                flat
                                v-model="editDialog"
                                @click="editDialog = false"
                            > Cancel </v-btn>
                            <v-btn 
                                flat
                                color="primary"
                                @click="onSaveChanges"
                            >Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    props: ['meetup'],
    data () {
        return {
            editDialog: false,
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods: {
        onSaveChanges () {
            if (this.editedTitle.trim() == '' || this.editedDescription.trim() == '') {
                return
            }
            this.$store.dispatch('updateMeetup', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
            this.editDialog = false
        }
    }
}
</script>
