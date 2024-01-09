<script>
import index from "@/plugins/vuetify";
import {mapActions, mapMutations, mapState} from "vuex";
import popup from "@/components/informations/popup.vue";
import store from "@/store";

import logo_light from '@/assets/images/logo_light.webp';
import logo_dark from '@/assets/images/logo_dark.webp';

export default {
  components:{
    popup
  },
  computed:{
    ...mapState('userModule', ['user']),
    ...mapState(['currentTheme']),
    getLogoPath(){
      return this.currentTheme.dark ? logo_light : logo_dark
    }
  },
  methods:{
    ...mapActions(['goTo']),
    ...mapMutations(['setTheme']),
    ...mapMutations('userModule', ['signOut']),
    toggleTheme(){
      index.theme.global.name.value = index.theme.global.current.value.dark ? 'lightTheme' : 'darkTheme';
      this.setTheme(index.theme.global.current.value);
    }
  }
}
</script>

<template>
  <div>
    <v-app-bar>
      <template v-slot:prepend>
        <v-avatar
            rounded="0"
            :image="getLogoPath"
            @click="goTo('/')"
        />
      </template>

      <v-app-bar-title>Météo Belfort</v-app-bar-title>

      <template v-slot:append>
        <v-btn
            @click="toggleTheme"
            :icon="currentTheme.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'"
        ></v-btn>
        <v-menu
            v-if="user"
            min-width="200px"
            rounded
        >
          <template v-slot:activator="{ props }">
            <v-btn
                icon
                v-bind="props"
            >
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                    color="primary"
                >
                  <span class="text-h5">{{ user.login[0].toUpperCase() }}</span>
                </v-avatar>
                <h3 class="ma-2">{{ user.login.toLowerCase() }}</h3>
                <v-chip
                    v-for="right in user.rights"
                    color="secondary"
                    size="small"
                >
                  {{right}}
                </v-chip>
                <v-divider class="my-3"></v-divider>
                <v-btn
                    @click="signOut"
                    text="Déconnexion"
                    rounded
                    color="secondary"
                    variant="text"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>
    <popup/>
  </div>
</template>

<style scoped>

</style>