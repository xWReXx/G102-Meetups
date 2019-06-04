<template>
    <v-dialog 
        width="350px" 
        persistent 
        v-model="registerDialog"
    >
        <v-btn accent slot="activator">
            {{userIsRegistered ? 'Unregister' : 'Register'}}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Unregister from the Meetup?</v-card-title>
                        <v-card-title v-else>Register for the Meetup?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always edit your registration later</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn
                                @click="registerDialog = false"
                            >Cancel</v-btn>
                            <v-btn
                                @click="confirmReg"
                            >Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['meetupID'],
    data () {
        return {
            registerDialog: false
        }
    },
    computed: {
        userIsRegistered () {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupID => {
                return meetupID === this.meetupID
            }) >= 0
        }
    },
    methods: {
        confirmReg () {
            if (this.userIsRegistered) {
                this.$store.dispatch('unregisterFromMeetup', this.meetupID)
            } else {
                this.$store.dispatch('registerforMeetup', this.meetupID)
            }
        }
    }
}
</script>
