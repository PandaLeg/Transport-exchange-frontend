<template>
  <v-row>
    <v-col
      cols="12"
      md="8"
      lg="8"
    >
      <v-timeline
        align-top
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          color="red accent-2"
          fill-dot
        >
          <template v-slot:icon>
            <fa-icon :icon="faTruckLoading" class="change_color_icon"></fa-icon>
          </template>
          <v-card
          >
            <v-card-title class="title red accent-2 white--text">
              {{ $t('offerExecution.loading') }}
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>{{ $t('offerExecution.loadingText') }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === '' || cargoView.status === 'In processing'"
                color="red accent-2"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
              <v-btn
                v-else
                color="red accent-2"
                class="mx-0 white--text"
                disabled
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="amber accent-2"
          fill-dot
        >
          <template v-slot:icon>
            <fa-icon :icon="faTruckMoving" class="change_color_icon"></fa-icon>
          </template>
          <v-card
          >
            <v-card-title class="title amber accent-2 white--text">
              {{ $t('offerExecution.inWay') }}
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>{{ $t('offerExecution.inWayText') }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === 'Loading'"
                color="amber accent-2"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
              <v-btn
                v-else
                color="amber accent-2"
                class="mx-0 white--text"
                disabled
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="green accent-3"
          fill-dot
        >
          <template v-slot:icon>
            <fa-icon :icon="faTruckLoading" class="change_color_icon"></fa-icon>
          </template>
          <v-card
          >
            <v-card-title class="title green accent-3 white--text">
              {{ $t('offerExecution.complete') }}
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>{{ $t('offerExecution.completeText') }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === 'In way'"
                color="green accent-3"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
              <v-btn
                v-else
                color="green accent-3"
                class="mx-0 white--text"
                disabled
              >
                {{ $t('offerExecution.completeBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-timeline-item>

      </v-timeline>
    </v-col>
    <v-col
      cols="12"
      md="4"
      lg="4"
    >
      <v-card>
        <v-card-title>{{ $t('offerExecution.briefInformation') }}</v-card-title>
        <v-card-text>
          <div class="subtitle-font mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                Тип груза:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <template>
                    <span class="spectral-font text--primary">
                      {{ localizeName }}
                    </span>
                </template>
              </v-col>
            </v-row>
          </div>

          <div class="subtitle-font mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                Тип кузова:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <template>
                    <span class="spectral-font text--primary">
                      {{ localizeBodyType }}
                    </span>
                </template>
              </v-col>
            </v-row>
          </div>

          <div class="subtitle-font mt-3">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
              >
                <span class="subtitle-font">{{ $t('view.dateLoading') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="8"
                lg="8"
              >
                  <span
                    class="spectral-font text--primary">
                    {{ $t('view.from') }} {{ parseDate.loadingDateFrom}} {{ $t('view.by') }}
                    {{ parseDate.loadingDateBy }}
                  </span>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import {faTruckLoading, faTruckMoving} from '@fortawesome/free-solid-svg-icons'
    import {parseCargoDate} from '../../../service/cargo/parseDate'

    export default {
        name: "offer-cargo-id",
        async fetch({store, params}) {
            await store.dispatch('cargo/getCargoAction', Number(params.id));
        },
        data() {
            return {}
        },
        computed: {
            faTruckLoading() {
                return faTruckLoading
            },

            faTruckMoving() {
                return faTruckMoving
            },

            cargoView() {
                return this.$store.getters['cargo/getCargoView']
            },

            localizeName() {
                let cargo = this.$store.getters['cargo/getCargoView'];

                let nameCargo = cargo.typesCargo.find(item => {
                    if (item.type === 'nameCargo') {
                        return item;
                    }
                });

                if (nameCargo) {
                    if (this.$i18n.localeProperties.code === 'en') {
                        return nameCargo.enName;
                    } else if (this.$i18n.localeProperties.code === 'ua') {
                        return nameCargo.uaName;
                    } else {
                        return nameCargo.ruName
                    }
                }
            },

            localizeBodyType() {
                let cargo = this.$store.getters['cargo/getCargoView'];

                let bodyType = cargo.typesCargo.find(item => {
                    if (item.type === 'bodyType') {
                        return item;
                    }
                    if(item.type === 'vesselType'){
                        return item;
                    }
                    if(item.type === 'carType'){
                        return item;
                    }
                });

                if (bodyType) {
                    if (this.$i18n.localeProperties.code === 'en') {
                        return bodyType.enName;
                    } else if (this.$i18n.localeProperties.code === 'ua') {
                        return bodyType.uaName;
                    } else {
                        return bodyType.ruName
                    }
                }
            },

            parseDate() {
                let cargo = this.$store.getters['cargo/getCargoView'];

                let loadingDateFrom = cargo.loadingDateFrom;
                let loadingDateBy = cargo.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy, this.$i18n.localeProperties.code);
            },

            getCargoType() {
                return this.$store.getters['cargo/getCargoView']
            }
        },
        methods: {
            async changeStatus() {
                let body = {
                    cargo: this.cargoView,
                    checkChangeStatus: false,
                    store: this.$store
                };

                await this.$store.dispatch('offer/changeStatusCargoAction', body);
                await this.$store.dispatch('cargo/getCargoAction', this.cargoView.id);
            }
        },
        mounted() {
            console.log(this.cargoView);
        }
    }
</script>

<style scoped>
  .change_color_icon {
    color: white;
  }
</style>
