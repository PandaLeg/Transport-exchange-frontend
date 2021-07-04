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
              class="avatar-profile-and-name img"
              size="150"
            >
              <template
                v-if="avatarProfile !== ''"
              >
                <v-img
                  :src="avatarProfile"
                >
                </v-img>
              </template>
              <template
                v-else
              >
                <v-icon
                  size="185"
                >
                  mdi-account-circle
                </v-icon>
              </template>
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
                    {{ getUserProfile.fullName }}
                  </div>
                  <div
                    v-else
                  >
                    {{ getUserProfile.firstName }}
                    {{ getUserProfile.lastName }}
                    {{ getUserProfile.patronymic}}
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
                  {{ getCountCargoNotComplete }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('profile.unfinished') }}</v-list-item-subtitle>
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
                  {{ getCountCargoComplete }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('profile.successful') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="12"
        lg="12"
      >
        <v-dialog
          v-if="getUser !== null && getUserProfile.id !== getUser.id"
          v-model="dialogSendingMessage"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              class="text-center"
            >
              <v-btn
                outlined
                color="red accent-2"
                class="white--text subtitle-font mt-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ $t('view.writeMessage') }}
              </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t('view.message') }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-textarea
                      v-model="message"
                      :label="$t('view.message')"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                plain
                @click="dialogSendingMessage = false"
              >
                {{ $t('view.closeBtn') }}
              </v-btn>
              <v-btn
                color="blue darken-1"
                dark
                @click="sendMessage"
              >
                {{ $t('view.sendBtn') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

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
                  {{ getUserProfile.fullName }}
                </span>
                </template>
                <template
                  v-else
                >
                   <span class="list-subtitle-information-font">
                     {{ getUserProfile.firstName }}
                     {{ getUserProfile.lastName }}
                     {{ getUserProfile.patronymic }}
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
                  {{ getUserProfile.country }}
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
                  {{ getUserProfile.city }}
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
                <span class="list-subtitle-information-font">{{ getUserProfile.email }}</span>
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
                <span class="list-subtitle-information-font">{{ getUserProfile.phone }}</span>
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
                <span class="list-subtitle-information-font">{{ dateLastVisit }}</span>
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
                  {{ getUserProfile.companyName }}
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
                  {{ getUserProfile.country }}
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
                  {{ getUserProfile.city }}
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
                  v-if="getUserProfile.status !== null"
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
                        {{ getUserProfile.status }}
                      </span>
                    </v-col>
                  </v-row>
                </template>

                <template
                  v-if="getUser.status === null && getUser.id === Number($route.params.id) && checkRoleUser"
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
                        {{ $t('profile.сonfirm') }}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ $t('profile.сonfirmation') }}</span>
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
                                  :label="$t('profile.fullName')"
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
                                  :label="$t('profile.firstName')"
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
                                  :label="$t('profile.lastName')"
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
                                  :label="$t('profile.patronymic')"
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
                                :label="$t('profile.description')"
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
                          {{ $t('view.closeBtn') }}
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="sendConfirmation"
                        >
                          {{ $t('profile.btnSave') }}
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
    <v-snackbar
      v-model="snackbarMessage"
      :multi-line="multiLine"
    >
      <p>{{ $t('view.snackBarMessage') }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarMessage = false"
        >
          {{ $t('view.closeBtn') }}
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="snackbarConfirm"
      :multi-line="multiLine"
    >
      <p>{{ $t('profile.snackbarConfirm') }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarConfirm = false"
        >
          {{ $t('view.closeBtn') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
    import profilePageAvatar from '../../assets/User_font_awesome.png'
    import backgroundImageClub from '../../assets/Kaliforniya_1.jpg'
    import {parseCargoDate} from '../../service/cargo/parseDate'

    export default {
        name: "profile_id",
        async fetch({store, params}) {
            let body = {
                id: params.id,
                store: store,
                user: store.getters['getUser']
            };
            store.commit('profile/clearCountCargo');
            store.commit('profile/clearCountTransports');

            await store.dispatch('profile/getCountCargoAction', body);
            await store.dispatch('profile/getCountTransportAction', body);
            await store.dispatch('profile/getCountCompleteAction', body);
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
                dialog: false,
                message: '',
                dialogSendingMessage: false,
                multiLine: true,
                snackbarMessage: false,
                snackbarConfirm: false
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            getUserProfile() {
                return this.$store.getters['profile/getUserProfile']
            },

            checkRoleUser() {
                let user = this.$store.getters['profile/getUserProfile'];
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

            getCountCargoComplete() {
                return this.$store.getters['profile/getCountCargoComplete']
            },

            getCountCargoNotComplete() {
                return this.$store.getters['profile/getCountCargoNotComplete']
            },

            avatarProfile() {
                return this.getUserProfile.profilePicture ? this.getUserProfile.profilePicture : ''
            },

            backgroundImageProfile() {
                return this.getUserProfile.profileBackground ? this.getUserProfile.profileBackground : backgroundImageClub
            },

            dateLastVisit(){
                console.log(this.getUserProfile);
                let dateAdded = this.getUserProfile.lastVisit;

                return parseCargoDate.parseDate(dateAdded, null, this.$i18n.localeProperties.code);
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
                await this.$store.dispatch('profile/sendConfirmationAction', body)
                    .then(() => {
                        this.snackbarConfirm = true;
                    });
                this.$store.commit('setStatusUser', true);
                this.dialog = false;
            },

            async sendMessage() {
                const chatMessage = Object.assign({}, {
                    message: this.message
                });

                const body = {
                    user: this.getUser,
                    userCompanion: this.getUserProfile,
                    chatMessage: chatMessage,
                    store: this.$store
                };

                if (this.message !== '' && this.message !== null) {
                    await this.$store.dispatch('chat/sendMessageAction', body)
                        .then(() => {
                            this.snackbarMessage = true;
                        });
                }

                this.dialogSendingMessage = false;
                this.message = '';
            }
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

  .img {
    border: 4px solid #555;
    background-color: white;
  }

  .justify-btn {
    float: right;
  }
</style>
