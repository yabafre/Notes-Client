<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="logout" expand="block" color="primary">Logout</ion-button>
      <ion-button router-link="/notes" expand="block" color="primary">View Notes</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import {useApiStore} from "@/stores/index.js";

export default {
  name: 'Home',
  components: { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar },
  methods: {
    logout() {
      useApiStore().logout();
    }
  }
};
</script>
