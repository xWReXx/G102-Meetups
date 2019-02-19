<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>{{meetup.title}}</v-card-title>
                    <v-img
                        :src="meetup.src"
                        height="400px"
                    ></v-img>
                    <v-card-text>
                        <div class='primary--text'>{{meetup.date| date}} in {{meetup.location}}</div>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos voluptatibus quas reprehenderit 
                            delectus iste saepe velit expedita dolore accusamus repudiandae, hic earum adipisci cum debitis nulla libero 
                            quis fugit quibusdam.
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color='primary'>Register</v-btn>
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
        }
    }
}
</script>
