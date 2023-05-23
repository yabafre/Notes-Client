<template>
  <div class="note">
    <h2>{{ note.title }}</h2>
    <p>{{ note.content }}</p>
    <button @click="deleteNote">Supprimer</button>
  </div>
</template>

<script>
export default {
  props: ['note'],
  methods: {
    deleteNote() {
      // code pour supprimer la note
    }
  }
}
</script>
