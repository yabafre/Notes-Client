<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="login">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-button type="submit" expand="block" color="primary">Login</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import {useApiStore} from "@/stores/index.js";
export default {
  name: 'Login',
  components: { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('login')
      const credentials = new FormData()
      credentials.append('email', this.email)
      credentials.append('password', this.password)
      useApiStore().login(credentials).then(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  }
};
</script>
