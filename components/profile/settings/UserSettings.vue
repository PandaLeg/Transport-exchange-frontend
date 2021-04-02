<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
      lg="12"
    >
      <v-card
      >
        <v-card-title>
          Личные данные
        </v-card-title>

        <div class="list-title-information-font ml-5 mt-3">
          <v-row>
            <v-col
              cols="12"
              md="3"
              lg="3"
            >
              ФИО:
            </v-col>
            <v-col
              cols="12"
              md="9"
              lg="9"
            >
                <span class="list-subtitle-information-font">
                  {{ getUser.firstName }}
                  {{ getUser.lastName }}
                  {{ getUser.patronymic }}
                </span>
            </v-col>
          </v-row>
        </div>
        <div class="list-title-information-font ml-5 mt-3">
          <v-row>
            <v-col
              cols="12"
              md="3"
              lg="3"
            >
              Эл. почта:
            </v-col>
            <v-col
              cols="12"
              md="9"
              lg="9"
            >
              <span class="list-subtitle-information-font">{{ getUser.email }}</span>
            </v-col>
          </v-row>
        </div>

        <div class="list-title-information-font ml-5 mt-3">
          <v-row>
            <v-col
              cols="12"
              md="3"
              lg="3"
            >
              Номер:
            </v-col>
            <v-col
              cols="12"
              md="9"
              lg="9"
            >
              <span class="list-subtitle-information-font">{{ getUser.phone }}</span>
            </v-col>
          </v-row>
        </div>
        <div class="list-title-information-font ml-5 mt-3">
          <v-row>
            <v-col
              cols="12"
              md="3"
              lg="3"
            >
              <v-btn
                color="primary"
                @click="redirectEditPersonalData"
              >
                Редактировать
                <fa-icon :icon="faUserEdit" class="ml-1"/>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      md="12"
      lg="12"
    >
      <v-card
      >
        <v-card-title>
          Смена пароля
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="12"
            lg="12"
          >
            <div class="list-title-information-font ml-5 mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  lg="3"
                >
                  Пароль:
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  lg="9"
                >
                  <span class="list-subtitle-information-font"> ******* </span>
                </v-col>
              </v-row>
            </div>
            <div class="list-title-information-font ml-5 mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  lg="3"
                >
                  <v-btn
                    color="primary"
                    @click="redirectEditPassword"
                  >
                    Редактировать
                    <fa-icon :icon="faUserEdit" class="ml-1"/>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      md="12"
      lg="12"
    >
      <v-card
      >
        <v-card-title>
          Фон профиля
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="12"
            lg="12"
          >
            <v-img
              class="background-image"
              max-height="800"
              :height="height"
              :src="backgroundImageClub"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import backgroundImageClub from '../../../assets/Kaliforniya_1.jpg'
    import {faUserEdit} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "UserSettings",
        props: ['getUser'],
        data() {
            return {
                backgroundImageClub: backgroundImageClub
            }
        },
        computed: {
            faUserEdit() {
                return faUserEdit
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
                        return 400;
                    case 'xl':
                        return 700;
                }
            }
        },
        methods: {
            redirectEditPersonalData() {
                this.$router.push('/profile/settings/edit-personal-data')
            },

            redirectEditPassword(){
                this.$router.push('/profile/settings/edit-password')
            }
        }
    }
</script>

<style scoped>

</style>
