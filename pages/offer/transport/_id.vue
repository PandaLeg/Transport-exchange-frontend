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
                v-if="transportView.status === '' || transportView.status === 'In processing'"
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
                v-if="transportView.status === 'Loading'"
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
                v-if="transportView.status === 'In way'"
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
          <span>
            {{ transportView.bodyType }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import {faTruckLoading, faTruckMoving} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "offer-transport-id",
        async fetch({store, params}) {
            await store.dispatch('transport/getTransportAction', Number(params.id));
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

            transportView() {
                return this.$store.getters['transport/getTransportView']
            },
        },
        methods: {
            async changeStatus() {
                let body = {
                    transport: this.transportView,
                    checkChangeStatus: false,
                    store: this.$store
                };

                await this.$store.dispatch('offer/changeStatusTransportAction', body);
                await this.$store.dispatch('transport/getTransportAction', this.transportView.id);
            }
        },
        mounted() {
            console.log(this.transportView);
        }
    }
</script>

<style scoped>
  .change_color_icon {
    color: white;
  }
</style>
