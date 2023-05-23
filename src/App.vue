<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button v-if="routeName !== 'Home'" defaultHref="/" />
          <font-awesome-icon v-else icon="home" />
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonRouterOutlet } from '@ionic/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";

export default {
  components: { IonApp, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonRouterOutlet, 'font-awesome-icon': FontAwesomeIcon },
  setup() {
    const route = useRoute();

    const pageTitle = computed(() => route.meta.title);
    const routeName = computed(() => route.name);

    return { pageTitle, routeName };
  },
  created() {
    // Add FontAwesome icon to the library
    library.add(faHome)
  },
};
</script>
