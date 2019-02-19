<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent='onSignIn'>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name='email'
                                            label='email'
                                            id='email'
                                            v-model='email'
                                            type='email'
                                            required>
                                            </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name='password'
                                            label='password'
                                            id='password'
                                            v-model='password'
                                            type='password'
                                            required>
                                            </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex>
                                        <v-btn type='submit'>Sign In</v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Signup',
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            signedIn: null
        }
    },
    computed: {
        user () {
            return this.$store.getters.user
        }
    },
    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignIn () {
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
                .then(user => {
                    this.signedIn = true
                })
        }
    }
}
</script>

