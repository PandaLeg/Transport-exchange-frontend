<template>
  <v-container class="mt-4">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        lg="10"
      >
        <update-cargo></update-cargo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import UpdateCargo from "../../../../components/editing/cargo/UpdateCargo";

    export default {
        name: "offer-cargo-editing-id",
        components:{
            UpdateCargo
        }
    }
</script>

<style scoped>

</style>
