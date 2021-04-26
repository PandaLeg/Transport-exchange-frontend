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
                  Груз & Дата
                </div>
                <div v-else-if="n === 2">
                  Транспорт & Оплата
                </div>
                <div v-else>
                  Дополнительно & Фото
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
              <step-desc-cargo :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-cargo>
              <step-desc-transport :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-transport>
              <step-desc-photo :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-photo>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import StepDescCargo from '../../components/cargo/StepDescCargo.vue'
    import StepDescTransport from "../../components/cargo/StepDescTransport";
    import StepDescPhoto from "../../components/cargo/StepDescPhoto";

    export default {
        components: {
            StepDescTransport,
            StepDescCargo,
            StepDescPhoto
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
