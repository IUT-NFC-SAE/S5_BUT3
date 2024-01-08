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
                    <v-text-field v-model="login" label="Login" required></v-text-field>
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
            login: '',
            password: '',
            showLoginModal: false, // Set initial value to false
        };
    },
    methods: {
        ...mapActions("userModule", ["loginUser"]),
        closeModal() {
            this.showLoginModal = false; // Close the login form
        },
        toggleRegisterForm() {
            this.$emit('toggleRegisterForm');
        },
        toggleLoginModal() {
            this.showLoginModal = !this.showLoginModal; // Toggle the login form visibility
        },
        async submitForm() {
            try {
                const token = await this.loginUser({
                    login: this.login,
                    password: this.password,
                });

                this.$emit('loginSuccess', token);
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
    },
};
</script>
