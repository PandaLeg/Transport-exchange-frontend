<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="e1 > n"
                :step="n"
                editable
              >
                <div v-if="n === 1">
                  Date & Place
                </div>
                <div v-else-if="n === 2">
                  Transport & Payment
                </div>
                <div v-else>
                  Photo & Additional
                </div>
              </v-stepper-step>

              <v-divider
                v-if="n !== steps"
                :key="n"
              ></v-divider>
            </template>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="n in steps"
              :key="`${n}-content`"
              :step="n"
            >
              <step-desc-date-and-place :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-date-and-place>
              <step-desc-transport-and-payment :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-transport-and-payment>
              <step-desc-photo-and-additional :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-photo-and-additional>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import StepDescDateAndPlace from '../../components/transport/StepDescDateAndPlace.vue'
    import StepDescTransportAndPayment from "../../components/transport/StepDescTransportAndPayment.vue";
    import StepDescPhotoAndAdditional from "../../components/transport/StepDescPhotoAndAdditional.vue";

    export default {
        name: "add-transport",
        components: {
            StepDescDateAndPlace,
            StepDescTransportAndPayment,
            StepDescPhotoAndAdditional
        },
        data() {
            return {
                e1: 1,
                steps: 3
            }
        },
        methods: {
            setE1(e1) {
                this.e1 = e1;
            }
        }
    }
</script>

<style scoped>

</style>
