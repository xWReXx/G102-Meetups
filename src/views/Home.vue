<template>
    <v-container>
        <v-layout row wrap class='mb-2'>
            <v-flex xs12 sm6 class='text-xs-center text-sm-right'>
                <v-btn class='primary' large to='/meetups'>Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class='text-xs-center text-sm-left'>
                <v-btn class='primary' large to='/meetups/new'>Organize Meetups</v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <v-carousel style='cursor: pointer'>
                    <v-carousel-item
                        v-for="item in meetups"
                        :key="item.id"
                        :src="item.src"
                        @click='onLoadMeetup(item.id)'
                    >
                        <div class='title'>
                            {{item.title}}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class='mt-2'>
            <v-flex xs12 class='text-xs-center'>
                <p>Join Our Awesome Meetups</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    computed: {
        meetups () {
            return this.$store.getters.featuredMeetups
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/' + id)
        }
    }
}
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        left: 50%; /* position the left edge of the element at the middle of the parent */
        transform: translate(-50%, -50%);
        background-color: rgb(0,0,0,0.5);
        font-size: 2em !important;
        padding: 20px;
    }
    
</style>
