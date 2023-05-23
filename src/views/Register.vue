<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="register">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" type="text"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" type="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password Confirmation</ion-label>
          <ion-input v-model="password_confirmation" type="password"></ion-input>
        </ion-item>

        <ion-button type="submit" expand="block" color="primary">Register</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import {useApiStore} from "@/stores/index.js";

export default {
  name: 'Register',
  components: { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    register() {
      const credentials = new FormData()
      credentials.append('name', this.name)
      credentials.append('email', this.email)
      credentials.append('password', this.password)
      credentials.append('password_confirmation', this.password_confirmation)
      useApiStore().register(credentials).then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
};
</script>
