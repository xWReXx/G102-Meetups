<template>
    <v-alert
        v-model="alert"
        dismissible
        type="error"
        @input='onClose'
      >
        {{text}}
      </v-alert>
</template>

<script>
export default {
    name: 'Alert',
    props: ['text'],
    data () {
        return {
            alert: true
        }
    },
    methods: {
        onClose () {
            this.$emit('dismissed')
        }
    }
}
</script>
