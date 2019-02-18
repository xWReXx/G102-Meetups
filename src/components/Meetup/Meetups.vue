<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card color='secondary'>
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs12>
                                <v-card class="white--text">
                                    <v-layout>
                                        <v-flex xs5>
                                        <v-card-media class='ml-2'
                                            src="https://static1.squarespace.com/static/5009bba4e4b016a023bf6030/t/5581ec20e4b0a5db48a55f56/1434577956896/Snowboarding-Wallpaper.jpg?format=1500w"
                                            height="125px"
                                        ></v-card-media>
                                        </v-flex>
                                        <v-flex xs7>
                                        <v-card-title primary-title>
                                            <div>
                                            <div class="headline">Snowboarding</div>
                                            <div>Winter Park</div>
                                            <div>February 21st, 2019</div>
                                            </div>
                                        </v-card-title>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider light></v-divider>
                                    <v-card-actions class="pa-3">
                                        <v-spacer></v-spacer>
                                        <v-btn flat>
                                            <v-icon left>arrow_forward</v-icon>
                                            View Meetup</v-btn>
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
