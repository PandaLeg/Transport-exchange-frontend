<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-img
        class="background-image"
        max-height="800"
        :height="height"
        :src="backgroundImage"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            justify="center"
            class="mt-16"
            cols="12"
          >
            <span class="title-main title-information-font">
              CARGO&TRANSPORT - {{ $t('main.title') }}. <br>
            </span>
          </v-col>
        </v-row>

        <v-row
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col
            justify="center"
            cols="3"
          >
            <v-card
              dark
              class="statistics-card title-information-font"
              max-width="300"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <fa-icon
                      :icon="faBox"
                      dark
                    >
                    </fa-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="card-statistics-font">
                      {{ getCargoAndTransport.countCargo }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="$t('main.titleCargoTotal')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col
            justify="center"
            cols="3"
          >
            <v-card
              dark
              class="statistics-card title-information-font"
              max-width="300"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <fa-icon
                      :icon="faBox"
                      dark
                    >
                    </fa-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="card-statistics-font">
                      {{ getCargoAndTransport.countCargoToday }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="$t('main.titleCargoToday')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col
            justify="center"
            cols="3"
          >
            <v-card
              dark
              class="statistics-card title-information-font"
              max-width="300"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <fa-icon
                      :icon="faTruckMoving"
                      dark
                    >
                    </fa-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="card-statistics-font">
                      {{ getCargoAndTransport.countTransports }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="$t('main.titleTransportTotal')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col
            justify="center"
            cols="3"
          >
            <v-card
              dark
              class="statistics-card title-information-font"
              max-width="300"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <fa-icon
                      :icon="faTruckMoving"
                      dark
                    >
                    </fa-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title class="card-statistics-font">
                      {{ getCargoAndTransport.countTransportsToday }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="$t('main.titleTransportToday')"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
    import mainPhoto from '../assets/main_photo.jpg'
    import profilePageAvatar from '../assets/AllisonProfilePage.jpg'
    import {faBox, faTruckMoving} from '@fortawesome/free-solid-svg-icons'

    export default {
        async fetch({store}) {
            await store.dispatch('getCountCargoAndTransportsAction')
        },
        data() {
            return {
                pageTitle: 'Main Page',
                backgroundImage: mainPhoto,
                avatarProfile: profilePageAvatar
            }
        },
        created(){
            this.statisticsCargoAndTransport();
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
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

            height() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 450;
                    case 'sm':
                        return 700;
                    case 'md':
                        return 500;
                    case 'lg':
                        return 640;
                    case 'xl':
                        return 700;
                }
            }
        },
        methods:{
            async statisticsCargoAndTransport(){
                await this.$store.dispatch('admin/statisticsCountsCargoAndTransportActions');
            }
        }
    }
</script>


<style scoped>
  .title-information-font {
    font-family: 'Merriweather', sans-serif;
    font-weight: bold;
    font-size: 28px;
  }

  .card-statistics-font {
    font-family: 'Rubik', sans-serif;
    font-weight: bold;
    font-size: 32px;
  }

  .background-image {
    border-radius: 4px;
    background: center no-repeat;
    background-size: cover;
  }

  .background-image:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 2;
  }

  .title-main {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    color: #fff;
  }

  .statistics-card {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    color: #fff;
  }

</style>
