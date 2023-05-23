<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="goToCreateNotePage" expand="block" color="primary">Create Note</ion-button>
      <ion-list>
        <ion-item v-for="note in notes" :key="note.id">
          <ion-label>{{ note.content }}</ion-label>
          <ion-label slot="end">{{ formatDate(note.updated_at) }}</ion-label>
          <ion-button @click="goToEditNotePage(note.id)" slot="end" fill="clear">
            <i class="fas fa-regular fa-pen-to-square"></i>
          </ion-button>
          <ion-button @click="deleteNote(note.id)" slot="end" fill="clear">
            <i class="fas fa-regular fa-trash"></i>
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { useApiStore } from "@/stores/index.js";
import {ref, watch} from "vue";
import { useRouter } from "vue-router";

export default {
  name: 'Notes',
  components: { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonButton },
  setup() {
    const store = useApiStore();
    const router = useRouter();
    const notes = ref([])
    const fetchNotes =  () => {
      store.getNotes().then(() => {
        notes.value = store.notes
      })
    }
    fetchNotes()
    watch(() => store.notes, (value) => {
      notes.value = value
    })

    const goToCreateNotePage = () => {
      router.push("/notes/new");
    };

    const goToEditNotePage = (noteId) => {
      router.push(`/notes/${noteId}`);
    };

    const deleteNote = (noteId) => {
      store.deleteNotes(noteId).then(fetchNotes);
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };

    return {
      notes,
      goToCreateNotePage,
      goToEditNotePage,
      deleteNote,
      formatDate
    }
  }
};
</script>
