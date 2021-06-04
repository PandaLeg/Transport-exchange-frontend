<template>
  <div v-if="getUser">
    <v-card
      class="mx-auto"
    >
      <v-img
        class="background-image"
        max-height="800"
        :height="height"
        :src="backgroundImageProfile"
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
                :src="avatarProfile"
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
                  <div
                    v-if="checkRoleUser"
                  >
                    {{ getUser.fullName }}
                  </div>
                  <div
                    v-else
                  >
                    {{ getUser.firstName }}
                    {{ getUser.lastName }}
                    {{ getUser.patronymic}}
                  </div>
                </v-list-item-title>
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
                <v-list-item-subtitle>{{ $t('profile.cargoOffers') }}</v-list-item-subtitle>
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
                <v-list-item-subtitle>{{ $t('profile.transportsOffers') }}</v-list-item-subtitle>
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
                  0
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('profile.successful') }}</v-list-item-subtitle>
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
          max-height="400"
        >
          <v-card-title class="blue white--text text-center">
            <span class="title-information-font">{{ $t('profile.contactInformation') }}</span>
          </v-card-title>
          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.fullName') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <template
                  v-if="checkRoleUser"
                >
                <span class="list-subtitle-information-font">
                  {{ getUser.fullName }}
                </span>
                </template>
                <template
                  v-else
                >
                   <span class="list-subtitle-information-font">
                     {{ getUser.firstName }}
                     {{ getUser.lastName }}
                     {{ getUser.patronymic }}
                </span>
                </template>
              </v-col>
            </v-row>
          </div>

          <template
            v-if="!checkRoleUser"
          >
            <div class="list-title-information-font ml-5 mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  {{ $t('profile.country') }}:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                <span class="list-subtitle-information-font">
                  {{ getUser.country }}
                </span>
                </v-col>
              </v-row>
            </div>

            <div class="list-title-information-font ml-5 mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  {{ $t('profile.city') }}:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                <span class="list-subtitle-information-font">
                  {{ getUser.city }}
                </span>
                </v-col>
              </v-row>
            </div>
          </template>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.email') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">{{ getUser.email }}</span>
              </v-col>
            </v-row>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.phoneNumber') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">{{ getUser.phone }}</span>
              </v-col>
            </v-row>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.lastVisit') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">28.03.21 18:00</span>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-if="checkRoleUser"
        cols="12"
        md="5"
        lg="5"
        xl="6"
        class="mt-12 mb-10"
      >
        <v-card
          max-height="400"
        >
          <v-card-title class="blue white--text text-center">
            <span class="title-information-font">{{ $t('profile.informationAboutCompany') }}</span>
          </v-card-title>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.name') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">
                  {{ getUser.companyName }}
                </span>
              </v-col>
            </v-row>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.country') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">
                  {{ getUser.country }}
                </span>
              </v-col>
            </v-row>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="4"
                lg="4"
              >
                {{ $t('profile.city') }}:
              </v-col>
              <v-col
                cols="12"
                md="8"
                lg="8"
              >
                <span class="list-subtitle-information-font">
                  {{ getUser.city }}
                </span>
              </v-col>
            </v-row>
          </div>

          <div
            class="list-title-information-font ml-5 mt-3"
          >
            <v-row>
              <v-col
                cols="12"
                md="12"
                lg="12"
              >
                <template
                  v-if="getUser.status !== null"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      lg="4"
                    >
                      Статус:
                    </v-col>
                    <v-col
                      cols="12"
                      md="8"
                      lg="8"
                    >
                      <span class="list-subtitle-information-font">
                        {{ getUser.status }}
                      </span>
                    </v-col>
                  </v-row>
                </template>
                <template
                  v-else
                >
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="justify-btn mx-2"
                        color="primary"
                        elevation="2"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="getStatus"
                      >
                        Подтвердить
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Подтверждение</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <template
                              v-if="checkRoleUser"
                            >
                              <v-col
                                cols="12"
                                sm="12"
                                md="12"
                              >
                                <v-text-field
                                  v-model="getUser.fullName"
                                  label="Full name"
                                  required
                                  disabled
                                ></v-text-field>
                              </v-col>
                            </template>

                            <template
                              v-else
                            >
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="getUser.firstName"
                                  label="First name"
                                  required
                                  disabled
                                ></v-text-field>
                              </v-col>

                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="getUser.lastName"
                                  label="Last name"
                                  required
                                  disabled
                                ></v-text-field>
                              </v-col>

                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="getUser.patronymic"
                                  label="Patronymic"
                                  required
                                  disabled
                                ></v-text-field>
                              </v-col>
                            </template>

                            <v-col cols="12">
                              <v-text-field
                                v-model="getUser.email"
                                label="Email"
                                required
                                disabled
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-textarea
                                v-model="description"
                                label="Description"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="sendConfirmation"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-col>
            </v-row>
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
                description: '',
                tabs: null,
                tabsClub: null,
                dialog: false
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            checkRoleUser() {
                let user = this.$store.getters['getUser'];
                return user.roles.map(role => role.name).includes('ROLE_LEGAL_USER');
            },

            getStatus() {
                return this.$store.getters['getStatus']
            },

            getCountCargo() {
                return this.$store.getters['profile/getCountCargo']
            },

            getCountTransports() {
                return this.$store.getters['profile/getCountTransports']
            },

            avatarProfile() {
                return this.getUser.profilePicture ? this.getUser.profilePicture : profilePageAvatar
            },

            backgroundImageProfile() {
                return this.getUser.profileBackground ? this.getUser.profileBackground : backgroundImageClub
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
        methods: {
            async sendConfirmation() {
                const confirmation = Object.assign({}, {description: this.description});

                const body = {
                    id: this.getUser.id,
                    confirmation: confirmation,
                    store: this.$store
                };
                await this.$store.dispatch('profile/sendConfirmationAction', body);
                this.$store.commit('setStatusUser', true);
                this.dialog = false;
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

  .justify-btn {
    float: right;
  }
</style>
