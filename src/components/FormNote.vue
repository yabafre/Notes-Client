<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ formTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="saveNote">
        <ion-item>
          <ion-label position="floating">Content</ion-label>
          <ckeditor v-model="content" :editor="editor"></ckeditor>
        </ion-item>
        <ion-button type="submit" expand="block" color="primary">{{ formAction }}</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useApiStore } from "@/stores/index.js";

export default {
  name: 'FormNote',
  components: { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, ckeditor: CKEditor.component },
  props: {
    noteId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      content: '',
      editor: ClassicEditor,
      formAction: 'Create Note',
      formTitle: 'Create Note'
    };
  },
  created() {
    if (this.noteId) {
      this.formAction = 'Update Note';
      this.formTitle = 'Update Note';
      this.fetchNote();
    }
  },
  methods: {
    fetchNote() {
      useApiStore().getNoteById(this.noteId).then(response => {
        this.content = response.content;
      }).catch(error => {
        console.error(error);
      });
    },
    saveNote() {
      const note = {
        content: this.content
      };

      if (this.noteId) {
        useApiStore().updateNotes(this.noteId, note).then(() => {
          this.$emit('note-saved');
        }).catch(error => {
          console.error(error);
        });
      } else {
        useApiStore().createNotes(note).then(() => {
          this.$emit('note-saved');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
};
</script>
