<template>
  <ion-page class="h-full flex flex-col">
    <ion-header class="sticky top-0 z-50 bg-blue-600">
      <ion-toolbar>
        <ion-title class="text-white">Manage Note</ion-title>
      </ion-toolbar>
      <div class="toolbar flex gap-2 bg-orange-500 rounded-md shadow-lg px-4 py-2" v-if="editor">
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }"><font-awesome-icon icon="bold" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }"><font-awesome-icon icon="italic" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }"><font-awesome-icon icon="strikethrough" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }"><font-awesome-icon icon="code" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }"><font-awesome-icon icon="list-ul" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }"><font-awesome-icon icon="list-ol" /></button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().setHeading({ level: 1 }).run()"><font-awesome-icon icon="heading" /> 1</button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().setHeading({ level: 2 }).run()"><font-awesome-icon icon="heading" /> 2</button>
        <button class="rounded p-1 hover:bg-blue-500 hover:text-white transition-colors duration-200" @click="editor.chain().focus().setParagraph().run()"><font-awesome-icon icon="paragraph" /></button>
      </div>
    </ion-header>
    <ion-content class="flex-1 flex flex-col p-4 overflow-auto">
      <editor-content class="flex-1 border-2 border-gray-300 mt-4 p-2 rounded-md overflow-auto" :editor="editor" />
    </ion-content>
    <div class="sticky bottom-0 z-50 p-4">
      <ion-button class="bg-blue-600 text-white my-2 rounded-full" @click="saveNote" expand="block" color="primary">Save Note</ion-button>
    </div>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { useApiStore } from "@/stores/index.js";
import {ref, onMounted, watchEffect} from "vue";
import { useRouter, useRoute } from "vue-router";
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)


export default {
  name: 'NoteProd',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, EditorContent, 'font-awesome-icon': FontAwesomeIcon },
  created() {
    console.log(this.note)
  },
  setup() {
    const store = useApiStore();
    const router = useRouter();
    const route = useRoute();
    const note = ref({ content: "" });
    const editor = ref(null);

    onMounted(() => {
      editor.value = new Editor({
        extensions: [
          StarterKit,
        ],
        content: '',
      });

      if (route.params.id !== "new") {
        store.getNoteById(route.params.id).then((res) => {
          note.value = store.note;
          editor.value = new Editor({
            extensions: [
              StarterKit,
            ],
            content: note.value.content,
          });
        });
      }
    })

    const saveNote = () => {
      note.value.content = editor.value.getHTML();
      const noteData = { content: note.value.content };
      if (route.params.id === "new") {
        store.createNotes(noteData).then(() => router.push("/notes"));
      } else {
        store.updateNotes(route.params.id, noteData).then(() => router.push("/notes"));
      }
    };

    return {
      note,
      saveNote,
      editor,
    }
  }
};

</script>

<style scoped>
.toolbar button.is-active {
  color: yellow;
}

.editor-content code {
  background-color: black;
  color: lime;
  font-family: 'Courier New', monospace;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
</style>
