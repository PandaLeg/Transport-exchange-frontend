<template>
  <div v-if="getUser">
    <v-card
      class="mx-auto"
    >
      <v-img
        class="background-image"
        max-height="800"
        :height="height"
        :src="backgroundImageClub"
      >
        <v-row
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col
            class="mb-10"
            justify="center"
            cols="12"
          >
            <v-avatar
              class="avatar-profile-and-name"
              size="150"
            >
              <v-img
                :src="avatarInstitute"
              >
              </v-img>
            </v-avatar>
          </v-col>

          <v-col
            justify="center"
            class="mt-16"
            cols="12"
          >
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content class="avatar-profile-and-name">
                <v-list-item-title class="title-information-font">
                  {{ getUser.firstName }} {{ getUser.lastName }} {{ getUser.patronymic}}
                </v-list-item-title>
                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col
            justify="center"
            cols="3"
          >
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              three-line
              dark
            >
              <v-list-item-content class="avatar-profile-and-name title-information-font">
                <v-list-item-title class="title">
                  {{ getCountCargo }}
                </v-list-item-title>
                <v-list-item-subtitle>Заявок по грузу</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col
            justify="center"
            two-line
            cols="3"
          >
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              three-line
              dark
            >
              <v-list-item-content class="avatar-profile-and-name title-information-font">
                <v-list-item-title class="title">
                  {{ getCountTransports }}
                </v-list-item-title>
                <v-list-item-subtitle>Заявок по транспорту</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col
            justify="center"
            cols="3"
          >
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              three-line
              dark
            >
              <v-list-item-content class="avatar-profile-and-name title-information-font">
                <v-list-item-title class="title">
                  26
                </v-list-item-title>
                <v-list-item-subtitle>Успешных</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>

    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="5"
        lg="5"
        xl="6"
        class="mt-12 mb-10"
      >
        <v-card
          height="220"
          max-height="250"
        >
          <v-card-title class="blue white--text text-center">
            <span class="title-information-font">Контактная информация</span>
          </v-card-title>
          <div class="list-title-information-font ml-5 mt-3">
            ФИО:
            <span class="list-subtitle-information-font">
              {{ getUser.firstName }}
              {{ getUser.lastName }}
              {{ getUser.patronymic }}
            </span>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            Email:
            <span class="list-subtitle-information-font">{{ getUser.email }}</span>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            Номер:
            <span class="list-subtitle-information-font">{{ getUser.phone }}</span>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            Последнее посещение:
            <span class="list-subtitle-information-font">28.03.21 18:00</span>
          </div>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="5"
        lg="5"
        xl="6"
        class="mt-12 mb-10"
      >
        <v-card
          height="220"
          max-height="250"
        >
          <v-card-title class="blue white--text text-center">
            <span class="title-information-font">Информация о предприятии</span>
          </v-card-title>

          <div class="list-title-information-font ml-5 mt-3">
            Наименование:
            <span class="list-subtitle-information-font">
              {{ getUser.firstName }}
              {{ getUser.lastName }}
              {{ getUser.patronymic }}
            </span>
          </div>

          <div class="list-title-information-font ml-5 mt-8">
            Страна:
            <span class="list-subtitle-information-font">{{ getUser.country }}</span>
          </div>

          <div class="list-title-information-font ml-5 mt-8">
            Город:
            <span class="list-subtitle-information-font">{{ getUser.city }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import profilePageAvatar from '../../assets/AllisonProfilePage.jpg'
    import backgroundImageClub from '../../assets/Kaliforniya_1.jpg'

    export default {
        name: "profile",
        async fetch({store}) {
            let body = {
                user: store.getters['getUser'],
                store: store
            };
            store.commit('profile/clearCountCargo');
            store.commit('profile/clearCountTransports');

            await store.dispatch('profile/getCountCargoAction', body);
            await store.dispatch('profile/getCountTransportAction', body);
        },
        data() {
            return {
                avatarInstitute: profilePageAvatar,
                backgroundImageClub: backgroundImageClub,
                users: [
                    {
                        name: 'Kurt',
                        surname: 'Lansfer',
                        icon: profilePageAvatar
                    },
                    {
                        name: 'Vladik',
                        surname: 'Chudo',
                        icon: profilePageAvatar
                    },
                    {
                        name: 'Gerzog',
                        surname: 'Udo',
                        icon: profilePageAvatar
                    }
                ],
                tabs: null,
                tabsClub: null,
                dialog: false
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            getCountCargo() {
                return this.$store.getters['profile/getCountCargo']
            },

            getCountTransports() {
                return this.$store.getters['profile/getCountTransports']
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
                        return 450;
                    case 'xl':
                        return 700;
                }
            }
        },
        mounted() {
            console.log("PROFILE", this.getUser);
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600&family=Roboto:wght@400;500&family=Rubik:wght@400;500;600&family=Source+Sans+Pro:wght@400;600&display=swap');

  .title-information-font {
    font-family: 'Merriweather', sans-serif;
    font-weight: bold;
    font-size: 28px;
  }

  .list-title-information-font {
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    font-size: 18px;
  }

  .list-subtitle-information-font {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
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

  .avatar-profile-and-name {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    color: #fff;
  }
</style>
