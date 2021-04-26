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
              Загрузка
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>Этот статус обозначает, момент, когда машина едет на загрузку в первоначальную точку.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === '' || cargoView.status === 'In processing'"
                color="red accent-2"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                Завершить
              </v-btn>
              <v-btn
                v-else
                color="red accent-2"
                class="mx-0 white--text"
                disabled
              >
                Завершить
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
              В пути
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>Этот статус обозначает, момент, когда машина находится в пути, к конечной точке выгрузки.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === 'Loading'"
                color="amber accent-2"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                Завершить
              </v-btn>
              <v-btn
                v-else
                color="amber accent-2"
                class="mx-0 white--text"
                disabled
              >
                Завершить
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
              Выгрузка
            </v-card-title>
            <v-card-text class="white text--primary">
              <p>Этот статус обозначает, момент, когда машина приехала на выгрузку в конечную точку и можно завершить
                выполнение заказа.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="cargoView.status === 'In way'"
                color="green accent-3"
                class="mx-0 white--text"
                @click="changeStatus"
              >
                Завершить
              </v-btn>
              <v-btn
                v-else
                color="green accent-3"
                class="mx-0 white--text"
                disabled
              >
                Завершить
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
        <v-card-title>Краткая информация</v-card-title>
        <v-card-text>
          <span>
            {{ cargoView.name }}
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import {faTruckLoading, faTruckMoving} from '@fortawesome/free-solid-svg-icons'

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
