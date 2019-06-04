<template>
    <v-container>
        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    indeterminate
                    :width="7"
                    :size="70"
                    color="primary"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>{{meetup.title}}
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-details :meetup='meetup'></app-edit-meetup-details>
                        </template>
                    </v-card-title>
                    <v-img
                        :src="meetup.imageUrl"
                        height="400px"
                    ></v-img>
                    <v-card-text>
                        <div class='primary--text'>{{meetup.date| date}} in {{meetup.location}}</div>
                        <div>
                            <app-edit-meetup-date :meetup='meetup' v-if="userIsCreator"></app-edit-meetup-date>
                            <app-edit-meetup-time :meetup='meetup' v-if="userIsCreator"></app-edit-meetup-time>
                        </div>
                        <div>
                            {{meetup.description}}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-edit-registration :meetupID='this.id'></app-edit-registration>   
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        meetup() {
            return this.$store.getters.loadedMeetup(this.id)
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
            if (!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.id == this.meetup.creatorID
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>
