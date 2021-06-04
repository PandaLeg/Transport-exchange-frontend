<template>
  <v-container class="mt-4">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        lg="8"
      >
        <update-cargo></update-cargo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UpdateCargo from "../../../../components/editing/cargo/UpdateCargo";

    export default {
        name: "admin-panel-offers-cargo-id",
        layout: 'admin-bar',
        components:{
            UpdateCargo
        }
    }
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
</style>
