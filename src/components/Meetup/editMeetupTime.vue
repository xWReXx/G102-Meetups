<template>
    <v-dialog 
        width="350px" 
        persistent 
        v-model="editDialog"
    >
        <v-btn accent slot="activator">
            Edit Time
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker color="primary" style="width: 100%" v-model="editedTime" actions format="24hr">
                            <template slot-scope="{Save, Cancel}">
                                <v-btn @click.native='editDialog = false'>Cancel</v-btn>
                                <v-btn @click.native='onSaveCahnges'>Save</v-btn>  
                            </template>
                        </v-time-picker>
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
            editedTime: null
        }
    },
    methods: {
        onSaveCahnges () {
            const newDate = new Date(this.meetup.date)
            const hours = this.editedTime.match(/^(\d+)/)[1]
            const minutes = this.editedTime.match(/:(\d+)/)[1]
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            this.$store.dispatch('updateMeetup', {
                id: this.meetup.id,
                date: newDate
            })
        }

    },
    created () {
        this.editedTime = new Date(this.meetup.date)
    }
    
}
</script>
