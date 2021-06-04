<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        lg="8"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="{path: getPathToSearch, query: queryResultSearch}"
                       class="subtitle-font nuxt-link-active">
              <fa-icon :icon="faAngleLeft"></fa-icon>
              {{ $t('view.toSearchResult') }}
            </nuxt-link>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col
              lg="8"
            >
              <v-card-title class="title-font">{{ $t('adminPanel.titleIdentificationCompany') }}</v-card-title>
            </v-col>

            <v-col
              lg="4"
            >
              <v-dialog
                v-model="dialogConfirmCompany"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="red accent-2"
                    class="white--text subtitle-font mt-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ $t('offer.confirmation') }}
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ $t('view.cargoOffer') }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <p> {{ $t('adminPanel.textAboutConfirmation') }}</p>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      plain
                      @click="dialogConfirmCompany = false"
                    >
                      {{ $t('view.closeBtn') }}
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      dark
                      @click="confirmCompany"
                    >
                      {{ $t('adminPanel.confirmBtn') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-card-text>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('settings.fullName') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  class="spectral-font text--primary"
                >
                  {{ firstName }}
                  {{ lastName }}
                  {{ patronymic }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('settings.email') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  class="spectral-font text--primary"
                >
                  {{ email }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('settings.phone') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  class="spectral-font text--primary"
                >
                  {{ phone }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('adminPanel.companyName') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  class="spectral-font text--primary"
                >
                  {{ companyName }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('adminPanel.companyCode') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  class="spectral-font text--primary"
                >
                  {{ companyCode }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "admin-panel-notifications-id",
        layout: 'admin-bar',
        data() {
            return {
                firstName: '',
                lastName: '',
                patronymic: '',
                email: '',
                phone: '',
                companyName: '',
                companyCode: '',
                queryResultSearch: {},
                dialogConfirmCompany: false
            }
        },
        created() {
            this.$store.commit('admin/setPathToSearch');
        },
        computed: {
            faAngleLeft() {
                return faAngleLeft
            },

            getConfirmationNotification() {
                return this.$store.getters['admin/getConfirmationNotification'];
            },

            getDataAboutPage() {
                return this.$store.getters['admin/getDataAboutPage']
            },

            getPathToSearch() {
                return this.$store.getters['admin/getPathToSearch']
            },
        },
        methods: {
            async getNotification() {
                let body = {
                    id: this.$route.params.id,
                    store: this.$store,
                };

                await this.$store.dispatch('admin/getConfirmationNotificationAction', body)
                    .then(data => {
                        console.log(data);
                        this.firstName = data.user.firstName;
                        this.lastName = data.user.lastName;
                        this.patronymic = data.user.patronymic;
                        this.email = data.user.email;
                        this.phone = data.user.phone;
                        this.companyName = data.user.companyName;
                        this.companyCode = data.user.companyCode;
                    });

                await this.$store.dispatch('admin/getConfirmationNotificationAction', body)
            },

            async confirmCompany() {
                let body = {
                    id: this.getConfirmationNotification.id,
                    store: this.$store,
                };

                await this.$store.dispatch('admin/confirmationCompanyAction', body)
                    .then(() => {
                        this.dialogConfirmCompany = false;
                        this.$router.push('/admin-panel/notifications')
                    })


            }
        },
        mounted() {
            this.getNotification();
            console.log(this.getDataAboutPage);
            this.queryResultSearch = Object.assign({}, {page: this.getDataAboutPage.page}, {pageSize: 2});
        }
    }
</script>

<style scoped>
  .title-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 20px;
  }

  .subtitle-font {
    font-family: 'Vollkorn', serif;
    font-weight: normal;
    font-size: 16px;
  }

  .spectral-font {
    font-family: 'Spectral', serif;
    font-weight: bold;
    font-size: 18px;
  }
</style>
