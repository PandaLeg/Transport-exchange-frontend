<template>
  <v-container class="mt-4">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        lg="10"
      >
        <update-transport></update-transport>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import UpdateTransport from "../../../../components/editing/transport/UpdateTransport";

    export default {
        name: "offer-transport-editing-id",
        components: {
            UpdateTransport
        }
    }
</script>

<style scoped>

</style>
