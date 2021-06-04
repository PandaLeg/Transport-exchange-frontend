<template>
  <v-container fill-height fluid>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="8"
        lg="8"
      >
        <v-card class="elevation-12">
          <v-window
            v-model="step"
          >
            <v-window-item
              :value="1"
            >
              <user :setStep="setStep"></user>
            </v-window-item>
            <v-window-item
              :value="2"
            >
              <legal-user :setStep="setStep"></legal-user>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import User from "../components/registration/User";
    import LegalUser from "../components/registration/LegalUser";

    export default {
        name: "registration",
        data() {
            return {
                step: 1
            }
        },
        components: {
            User,
            LegalUser
        },
        methods: {
            setStep(step) {
                this.step = step;
            }
        }
    }
</script>

<style scoped>

</style>
