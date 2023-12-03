<template>
    <v-dialog v-model="showLoginModal" max-width="400px">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon @click="closeModal">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-center">Login</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" label="Login" required></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

                    <v-btn @click="submitForm" color="primary" dark>Submit</v-btn>
                </v-form>
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn text @click="toggleRegisterForm">Don't have an account? Create one here</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
            showLoginModal: true,
        };
    },
    methods: {
        ...mapActions(["login"]), // Map the 'setAuthToken' action
        closeModal() {
            this.$emit('close'); // emit the event
        },
        toggleRegisterForm() {
            this.$emit('toggleRegisterForm');
        },

        async submitForm() {
            console.log('Before dispatch');
            try {
                const token = await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                });
                console.log('After dispatch');
                console.log(token);
                // Rest of your code
            } catch (error) {
                console.error('Login failed:', error);
                // Handle login failure
            }
        },
    },
};
</script>
