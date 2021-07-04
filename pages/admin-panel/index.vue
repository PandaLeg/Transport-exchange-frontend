<template>
  <v-container
    id="dashboard"
    class="mt-4"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="600"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="white"
            elevation="10"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :value="getCountUsersOfMonth"
              :labels="getLabelsOfMonth"
              :gradient="gradients[0]"
              show-labels
              label-size="12"
              padding="15"
              height="120"
              auto-line-width
              smooth
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text>
            <div class="title font-weight-light mb-2">
              {{ $t('adminPanel.titleRegistrationCard') }}
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>

            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last registration 37 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="600"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="white"
            elevation="10"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :value="getCountCargoOfMonth"
              :labels="getLabelsOfMonth"
              :gradient="gradients[1]"
              label-size="12"
              padding="15"
              height="120"
              auto-line-width
              smooth
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text>
            <div class="title font-weight-light mb-2">
              {{ $t('adminPanel.titleCargoCard') }}
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>

            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="600"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="white"
            elevation="10"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :value="getCountTransportsOfMonth"
              :labels="getLabelsOfMonth"
              :gradient="gradients[2]"
              label-size="12"
              padding="15"
              height="120"
              auto-line-width
              smooth
            >
            </v-sparkline>
          </v-sheet>

          <v-card-text>
            <div class="title font-weight-light mb-2">
              {{ $t('adminPanel.titleTransportCard') }}
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>

            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        lg="3"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="700"
        >
          <v-row>
            <v-col
              lg="7"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="'#42b3f4'"
                elevation="10"
                max-width="calc(100% - 55px)"
                height="85"
                rounded
              >
                <v-container
                  fluid
                  fill-height
                >
                  <fa-icon
                    :icon="faBox"
                    class="center-icon"
                    size="2x"
                    color="white"
                  >
                    mdi-account
                  </fa-icon>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col
              lg="5"
            >
              <v-card-subtitle class="title-font">
                {{ getCargoAndTransport.countCargo }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text>
            <div class="subtitle-font">
              {{ $t('adminPanel.titleCargoOffersTotal') }}
            </div>
            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="3"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="700"
        >
          <v-row>
            <v-col
              lg="7"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="'#42b3f4'"
                elevation="10"
                max-width="calc(100% - 55px)"
                height="85"
                rounded
              >
                <v-container
                  fluid
                  fill-height
                >
                  <fa-icon
                    :icon="faBox"
                    class="center-icon"
                    size="2x"
                    color="white"
                  >
                    mdi-account
                  </fa-icon>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col
              lg="5"
            >
              <v-card-subtitle class="title-font">
                {{ getCargoAndTransport.countCargoToday }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text>
            <div class="subtitle-font">
              {{ $t('adminPanel.titleCargoOffersToday') }}
            </div>
            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="3"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="700"
        >
          <v-row>
            <v-col
              lg="7"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="'#42b3f4'"
                elevation="10"
                max-width="calc(100% - 55px)"
                height="85"
                rounded
              >
                <v-container
                  fluid
                  fill-height
                >
                  <fa-icon
                    :icon="faTruckMoving"
                    class="center-icon"
                    size="2x"
                    color="white"
                  >
                    mdi-account
                  </fa-icon>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col
              lg="5"
            >
              <v-card-subtitle class="title-font">
                {{ getCargoAndTransport.countTransports }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text>
            <div class="subtitle-font">
              {{ $t('adminPanel.titleTransportOffersTotal') }}
            </div>
            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        lg="3"
      >
        <v-card
          class="mt-4 mx-auto"
          max-width="700"
        >
          <v-row>
            <v-col
              lg="7"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                :color="'#42b3f4'"
                elevation="10"
                max-width="calc(100% - 55px)"
                height="85"
                rounded
              >
                <v-container
                  fluid
                  fill-height
                >
                  <fa-icon
                    :icon="faTruckMoving"
                    class="center-icon"
                    size="2x"
                    color="white"
                  >
                    mdi-account
                  </fa-icon>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col
              lg="5"
            >
              <v-card-subtitle class="title-font">
                {{ getCargoAndTransport.countTransportsToday }}
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text>
            <div class="subtitle-font">
              {{ $t('adminPanel.titleTransportOffersToday') }}
            </div>
            <v-divider class="my-2"></v-divider>

            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey--text font-weight-light">last added 40 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {faBox, faTruckMoving} from '@fortawesome/free-solid-svg-icons'


    export default {
        name: "adminPanel",
        layout: 'admin-bar',
        data() {
            return {
                labels: [
                    'JA',
                    'FE',
                    'MA',
                    'AP',
                    'MAI',
                    'JU',
                    'JUL',
                    'AU',
                    'SE',
                    'OC',
                    'NO',
                    'DE',
                ],
                value: [
                    0,
                    200,
                    400,
                    600,
                    800,
                    200,
                    300,
                    450,
                    150,
                    360,
                    520,
                    756,
                ],
                chartData: {
                    datasets: [{
                        label: [
                            'JA',
                            'FE',
                            'MA',
                            'AP',
                            'MAI',
                            'JU',
                            'JUL',
                            'AU',
                            'SE',
                            'OC',
                            'NO',
                            'DE',],
                        data: [
                            0,
                            200,
                            400,
                            600,
                            800,
                            200,
                            300,
                            450,
                            150,
                            360,
                            520,
                            756,]
                    }]
                },
                gradients: [
                    ['#42b3f4'],
                    ['purple', 'violet'],
                    ['#00c6ff', '#F0F', '#FF0']
                ]
            }
        },
        created() {
            this.statisticsCargoAndTransport();
        },
        computed: {
            getLabelsOfMonth() {
                return this.$store.getters['admin/getLabelsOfMonth']
            },

            getCountCargoOfMonth() {
                return this.$store.getters['admin/getCountCargoOfMonth']
            },

            getCountTransportsOfMonth() {
                return this.$store.getters['admin/getCountTransportsOfMonth']
            },

            getCountUsersOfMonth() {
                return this.$store.getters['admin/getCountUsersOfMonth']
            },

            getCargoAndTransport() {
                return this.$store.getters['admin/getCargoAndTransport']
            },

            faBox() {
                return faBox
            },

            faTruckMoving() {
                return faTruckMoving
            },
        },
        methods: {
            async statisticsCargoAndTransport() {
                await this.$store.dispatch('admin/statisticsCargoAction');
                await this.$store.dispatch('admin/statisticsTransportAction');
                await this.$store.dispatch('admin/statisticsUsersActions');
                await this.$store.dispatch('admin/statisticsCountsCargoAndTransportActions');
            }
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .title-font {
    font-family: 'Spectral', serif;
    font-weight: bold;
    font-size: 18px;
  }

  .subtitle-font {
    font-family: 'Roboto Slab', serif;
    font-weight: initial;
  }

  .v-sheet--offset {
    top: -24px;
    position: relative;
  }

  .center-icon {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
</style>
