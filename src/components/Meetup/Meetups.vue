<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card color='secondary'>
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs12>
                                <v-card class="white--text mb-4" v-for='meetup in meetups' :key='meetup.id'>
                                    <v-layout>
                                        <v-flex xs5>
                                        <v-img class='ml-2'
                                            :src="meetup.imageUrl"
                                            height="125px"
                                        ></v-img>
                                        </v-flex>
                                        <v-flex xs7>
                                        <v-card-title primary-title>
                                            <div>
                                            <div class="headline">{{meetup.title}}</div>
                                            <div>{{meetup.location}}</div>
                                            <div>{{meetup.date | date}}</div>
                                            </div>
                                        </v-card-title>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider light></v-divider>
                                    <v-card-actions class="pa-3">
                                        <v-spacer></v-spacer>
                                        <v-btn flat :to="'/meetups/' + meetup.id">
                                            <v-icon left>arrow_forward</v-icon>
                                            View Meetup
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>