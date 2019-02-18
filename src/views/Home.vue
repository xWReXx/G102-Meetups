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
    data () {
        return {
            meetups: [
                {id: '1', src: 'https://static1.squarespace.com/static/5009bba4e4b016a023bf6030/t/5581ec20e4b0a5db48a55f56/1434577956896/Snowboarding-Wallpaper.jpg?format=1500w', title: 'Snowboarding'},
                {id: '2', src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', title: 'Fishing'},
                {id: '3', src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', title: 'Coding'},
                {id: '4', src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', title: 'Kombucha'}
            ]
        }
    },
    methods: {
        onLoadMeetup(){
            this.$router.push('/meetups/' +  id)
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
