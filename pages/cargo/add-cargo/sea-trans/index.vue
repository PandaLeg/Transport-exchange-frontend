<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="12">
        <v-stepper
          v-model="s1"
          non-linear
          dark
        >
          <v-stepper-header>
            <template v-for="n in stepsS">
              <v-stepper-step
                :key="`${n}-step`"
                :step="n"
                editable
                @click="redirectOtherTypesCargo(n)"
              >
                <div v-if="n === 1">
                  {{ $t('addCargo.vehiclesTitle') }}
                </div>
                <div v-else-if="n === 2">
                  {{ $t('addCargo.seaTitle') }}
                </div>
                <div v-else>
                  {{ $t('addCargo.railwayTitle') }}
                </div>
              </v-stepper-step>
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-col>

      <v-col lg="10">
        <v-stepper
          v-model="e1"
        >
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="e1 > n"
                :step="n"
                editable
              >
                <div v-if="n === 1">
                  {{ $t('addCargo.cargo&Date') }}
                </div>
                <div v-else-if="n === 2">
                  {{ $t('addCargo.transport&Payment') }}
                </div>
                <div v-else>
                  {{ $t('addCargo.additional&Photo') }}
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
              <step-desc-sea-cargo :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-sea-cargo>
              <step-desc-sea-transport :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-sea-transport>
              <step-desc-sea-photo :n="n" :e1="e1" :setE1="setE1" :steps="steps"></step-desc-sea-photo>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import StepDescSeaCargo from '../../../../components/cargo/sea-trans/StepDescSeaCargo.vue'
    import StepDescSeaTransport from "../../../../components/cargo/sea-trans/StepDescSeaTransport.vue";
    import StepDescSeaPhoto from "../../../../components/cargo/sea-trans/StepDescSeaPhoto.vue";

    export default {
        name: 'cargo-add-cargo-sea-trans',
        components: {
            StepDescSeaCargo,
            StepDescSeaTransport,
            StepDescSeaPhoto
        },
        data() {
            return {
                e1: 1,
                steps: 3,
                s1: 2,
                stepsS: 3
            }
        },
        methods: {
            setE1(e1) {
                this.e1 = e1;
            },

            redirectOtherTypesCargo(n) {
                if (n === 1) {
                    this.$store.commit('cargo/clearInitialCargo');
                    this.$router.push(this.localePath({name: 'cargo-add-cargo-vehicles'}))
                }else if(n === 3){
                    this.$store.commit('cargo/clearInitialCargo');
                    this.$router.push(this.localePath({name: 'cargo-add-cargo-railway-trans'}))
                }
            }
        }
    }
</script>

<style scoped>

</style>
