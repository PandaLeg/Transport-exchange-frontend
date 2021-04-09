<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="defaultPicture"></v-img>
      </v-list-item-avatar>
      <v-list-item-content v-if="message.contentFromDoctor">
        <v-list-item-title v-html="doctor.username"></v-list-item-title>
        <v-list-item-subtitle v-html="message.contentFromDoctor"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
    export default {
        name: "MessageRow",
        props: ['message']
    }
</script>

<style scoped>

</style>
