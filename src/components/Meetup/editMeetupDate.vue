<template>
    <v-dialog 
        width="350px" 
        persistent 
        v-model="editDialog"
    >
        <v-btn accent slot="activator">
            Edit Date
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
                        <v-date-picker color="primary" style="width: 100%" v-model="editedDate" actions>
                            <template slot-scope="{save, cancel}">
                                <v-btn @click.native='editDialog = false'>Cancel</v-btn>
                                <v-btn @click.native='onSaveCahnges'>Save</v-btn>  
                            </template>
                        </v-date-picker>
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
            editedDate: null
        }
    },
    methods: {
        onSaveCahnges () {
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editedDate).getUTCDate()
            const newMonth = new Date(this.editedDate).getUTCMonth()
            const newYear = new Date(this.editedDate).getUTCFullYear()
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            console.log(newDate)
            this.$store.dispatch('updateMeetup', {
                id: this.meetup.id,
                date: newDate
            })
        }

    },
    created () {
        this.editedDate = new Date(this.meetup.date).toISOString().substr(0,10)
    }
    
}
</script>
