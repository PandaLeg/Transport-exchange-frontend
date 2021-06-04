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
              <v-card-subtitle class="spectral-font">{{ $t('view.offerPublished') }} - 13 марта</v-card-subtitle>
            </v-col>

            <v-col
              lg="4"
              v-if="getUser !== null && userFromTransport.id !== getUser.id && !getCheckUserFromOffer"
            >
              <v-dialog
                v-model="dialogSendingOffer"
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
                    {{ $t('view.respond') }}
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ $t('view.cargoOffer') }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="lastName"
                            :label="$t('view.surname')"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="firstName"
                            :label="$t('view.name')"
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="patronymic"
                            :label="$t('view.patronymic')"
                            disabled
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-text-field
                            v-model="email"
                            label="Email"
                            disabled
                          ></v-text-field>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="12"
                          md="12"
                        >
                          <v-textarea
                            v-model="additional"
                            :label="$t('view.wishes')"
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
                      @click="dialogSendingOffer = false"
                    >
                      {{ $t('view.closeBtn') }}
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      dark
                      @click="sendOffer"
                    >
                      {{ $t('view.sendBtn') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
          <v-card-title class="name-font">{{ transportView.bodyType }}</v-card-title>
          <v-card-text>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.fromWhere') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template v-for="point in getPointsTransport">
                  <span
                    v-if="point.cityFrom !== null && point.countryFrom !== null"
                    class="spectral-font text--primary"
                  >
                    {{ point.cityFrom }}, {{ point.countryFrom }} <br>
                  </span>
                </template>
              </v-col>
            </v-row>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.whereTo') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template v-for="point in getPointsTransport">
                  <span
                    v-if="point.cityTo !== null && point.countryTo !== null"
                    class="spectral-font text--primary"
                  >
                    {{ point.cityTo }}, {{ point.countryTo }} <br>
                  </span>
                </template>
              </v-col>
            </v-row>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.distance') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span
                    class="spectral-font text--primary">
                    <div id="directions-transport-panel">

                    </div>
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
                <span class="subtitle-font">{{ $t('view.dateLoading') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span
                    class="spectral-font text--primary">
                    {{ $t('view.from') }} {{ parseDate.loadingDateFrom}} {{ $t('view.by') }}
                    {{ parseDate.loadingDateBy }}
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
                <span class="subtitle-font">{{ $t('view.weight') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  v-if="transportView.carryingCapacityFrom === transportView.carryingCapacityUpTo"
                  class="spectral-font text--primary"
                >
                    {{ transportView.carryingCapacityFrom}} {{ $t('view.ton') }}
                </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ transportView.carryingCapacityFrom}} - {{ transportView.carryingCapacityUpTo }}
                  {{ $t('view.ton') }}
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.volumeFrom !== '' || transportView.volumeUpTo !== ''">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.volume') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span
                    v-if="transportView.volumeFrom !== '' && transportView.volumeUpTo !== '' &&
                    transportView.volumeFrom === transportView.volumeUpTo"
                    class="spectral-font text--primary"
                  >
                    {{ transportView.volumeFrom}} {{ $t('view.cubicMeters') }}
                  </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ transportView.volumeFrom}} - {{ transportView.volumeUpTo }} {{ $t('view.cubicMeters') }}
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.lengthTransport !== '' || transportView.widthTransport !== '' ||
            transportView.heightTransport !== ''">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.dimensions') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <span
                  v-if="transportView.lengthTransport !== '' && transportView.widthTransport !== '' &&
                    transportView.heightTransport !== ''"
                  class="spectral-font text--primary"
                >
                  {{ transportView.lengthTransport }} {{ $t('view.metersLong') }},
                  {{ transportView.widthTransport }} {{ $t('view.metersWide') }},
                  {{ transportView.heightTransport }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== '' && transportView.widthTransport === '' &&
                  transportView.heightTransport === ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.lengthTransport }} {{ $t('view.metersLong') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport === '' && transportView.widthTransport !== '' &&
                  transportView.heightTransport === ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.widthTransport }} {{ $t('view.metersWide') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport === '' && transportView.widthTransport === '' &&
                  transportView.heightTransport !== ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.heightTransport }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== '' && transportView.widthTransport !== '' &&
                  transportView.heightTransport === ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.lengthTransport }} {{ $t('view.metersLong') }},
                  {{ transportView.widthTransport }} {{ $t('view.metersWide') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== '' && transportView.widthTransport === '' &&
                  transportView.heightTransport != ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.lengthTransport }} {{ $t('view.metersLong') }},
                  {{ transportView.heightTransport }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="transportView.lengthTransport === '' && transportView.widthTransport !== '' &&
                  transportView.heightTransport !== ''"
                  class="spectral-font text--primary"
                >
                   {{ transportView.widthTransport }} {{ $t('view.metersWide') }},
                  {{ transportView.heightTransport }} {{ $t('view.metersHigh') }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.adr !== '' && transportView.adr !== ''">
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">ADR:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span class="spectral-font text--primary">
                    {{ transportView.adr}}
                  </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="12"
              >
                <span class="photo-font text--primary">{{ $t('view.transport') }}</span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkLoading"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.loading') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'loading'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkUnloading"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.unloading') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'unloading'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPermissionType"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.permissions') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'permissionType'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkTypePayment"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.paymentType') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'typePayment'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkCostPer"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.cost') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'costPer'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ cargoView.cost }} {{ cargoView.currency }} / {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPaymentForm"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.paymentForm') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'paymentForm'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPaymentTime"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">{{ $t('view.paymentTime') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template
                  v-for="prop in properties"
                >
                  <span
                    v-if="prop.property === 'paymentTime'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="12"
              >
                <span class="photo-font text--primary">{{ $t('view.photo') }}</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="4"
                v-for="photo in getPhotosTransport"
                :key="photo.id"
              >
                <v-card
                  @click="dialog = true"
                >
                  <v-img
                    :src="photo.photoUrl"
                    aspect-ratio="1.7"
                    cover
                  >
                  </v-img>
                </v-card>
              </v-col>
            </v-row>

            <v-dialog
              v-model="dialog"
              transition="dialog-top-transition"
              max-width="800"
              max-height="500"
            >
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="dialog = false"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-carousel
                  height="500"
                  show-arrows-on-hover
                >
                  <v-carousel-item
                    v-for="photo in getPhotosTransport"
                    :key="photo.id"
                  >
                    <v-img
                      :src="photo.photoUrl"
                    >
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card>
            </v-dialog>

            <v-row>
              <v-col
                lg="12"
              >
                <div id="map"></div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="{path: getPathToSearch, query: queryResultSearch}"
                       class="subtitle-font nuxt-link-active">
              {{ $t('view.profile') }}
            </nuxt-link>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="photo-font">{{ $t('view.contactInformation') }}</v-card-title>

          <v-card-text>
            <div class="subtitle-font mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  {{ $t('view.fullName') }}:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                  <template
                    v-if="checkRoleUser"
                  >
                    <span class="spectral-font text--primary">
                      {{ userFromTransport.fullName }}
                    </span>
                  </template>
                  <template
                    v-else
                  >
                    <span class="spectral-font text--primary">
                      {{ userFromTransport.firstName }}
                      {{ userFromTransport.lastName }}
                      {{ userFromTransport.patronymic }}
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
                  {{ $t('view.email') }}:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                  <span class="spectral-font text--primary">{{ userFromTransport.email }}</span>
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
                  {{ $t('view.location') }}:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                  <span class="spectral-font text--primary">{{ userFromTransport.city }}, {{ userFromTransport.country }}</span>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-dialog
              v-if="getUser !== null && userFromTransport.id !== getUser.id && getCheckUserFromOffer"
              v-model="dialogSendingMessage"
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
                  {{ $t('view.writeMessage') }}
                </v-btn>
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
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
    import {parseCargoDate} from '../../../service/cargo/parseDate'
    import * as VueGoogleMaps from 'vue2-google-maps'

    export default {
        name: "transport-view-id",
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        async fetch({store, params}) {
            let body = {
                idTransport: Number(params.id),
                user: store.getters['getUser'],
                store: store
            };

            if (Object.keys(store.getters['transport/getTransportView']).length !== 0) {
                if (store.getters['transport/getTransportView'].id !== Number(params.id)) {
                    await store.dispatch('transport/getTransportAction', params.id);
                    await store.dispatch('transport/getPhotosTransportAction', params.id);
                }
            } else {
                await store.dispatch('transport/getTransportAction', params.id);
                await store.dispatch('transport/getPhotosTransportAction', params.id);
            }

            await store.commit('transport/setCheckUserFromOffer');
            await store.dispatch('transport/checkUserSentOfferAction', body);
        },
        data() {
            return {
                id: '',
                firstName: '',
                lastName: '',
                patronymic: '',
                email: '',
                additional: '',
                message: '',
                properties: [],
                checkLoading: false,
                checkUnloading: false,
                checkPermissionType: false,
                checkTypePayment: false,
                checkCostPer: false,
                checkPaymentForm: false,
                checkPaymentTime: false,
                dialog: false,
                dialogSendingOffer: false,
                dialogSendingMessage: false,
                queryResultSearch: {},
                distance: 0,
                center: {lat: 55.75222, lng: 37.61556},
                markers: [
                    {
                        position: {lat: 50.45466, lng: 30.5238}
                    },
                    {
                        position: {lat: 55.75222, lng: 37.61556}
                    },
                    {
                        position: {lat: 53.9, lng: 27.56667}
                    }
                ],
                path: [
                    {lat: 50.45466, lng: 30.5238},
                    {lat: 55.75222, lng: 37.61556},
                    {lat: 53.9, lng: 27.56667}
                ],
                map: null
            }
        },
        created() {
            this.$store.commit('transport/setResultDataSearch');
            this.$store.commit('transport/setPageSize', 3);
            this.filteringProperties();
            this.firstName = this.getUser.firstName;
            this.lastName = this.getUser.lastName;
            this.patronymic = this.getUser.patronymic;
            this.email = this.getUser.email;
        },
        computed: {
            faAngleLeft() {
                return faAngleLeft
            },

            getUser() {
                return this.$store.getters['getUser']
            },

            transportView() {
                return this.$store.getters['transport/getTransportView']
            },

            userFromTransport() {
                return this.$store.getters['transport/getUserFromTransport']
            },

            checkRoleUser() {
                let user = this.$store.getters['transport/getUserFromTransport'];
                return user.roles.map(role => role.name).includes('ROLE_LEGAL_USER');
            },

            getCheckUserFromOffer() {
                return this.$store.getters['transport/getCheckUserFromOffer']
            },

            checkUser() {
                return this.$store.getters['transport/checkUser']
            },

            getPageSize() {
                return this.$store.getters['transport/getPageSize']
            },

            getPathToSearch() {
                return this.$store.getters['transport/getPathToSearch']
            },

            parseDate() {
                let loadingDateFrom = this.transportView.loadingDateFrom;
                let loadingDateBy = this.transportView.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy, this.$i18n.localeProperties.code);
            },

            getPointsTransport() {
                return this.$store.getters['transport/getPointsTransport']
            },

            getPhotosTransport() {
                return this.$store.getters['transport/getPhotosTransport']
            },

            google: VueGoogleMaps.gmapApi
        },
        methods: {
            checkFullnessProperties() {
                this.transportView.propertiesTransport.forEach(prop => {
                    if (prop.property === 'loading') {
                        this.checkLoading = true;
                    }
                    if (prop.property === 'unloading') {
                        this.checkUnloading = true;
                    }
                    if (prop.property === 'permissionType') {
                        this.checkPermissionType = true;
                    }
                    if (prop.property === 'typePayment') {
                        this.checkTypePayment = true;
                    }
                    if (prop.property === 'costPer') {
                        this.checkCostPer = true;
                    }
                    if (prop.property === 'paymentForm') {
                        this.checkPaymentForm = true;
                    }
                    if (prop.property === 'paymentTime') {
                        this.checkPaymentTime = true;
                    }

                });
            },

            filteringProperties() {
                this.transportView.propertiesTransport.map(prop => {
                    if (this.$i18n.localeProperties.code === 'en') {
                        this.properties.push({name: prop.enName, property: prop.property});
                    } else if (this.$i18n.localeProperties.code === 'ua') {
                        this.properties.push({name: prop.uaName, property: prop.property});
                    } else {
                        this.properties.push({name: prop.ruName, property: prop.property});
                    }
                });
            },

            initMap() {
                this.$gmapApiPromiseLazy().then(() => {
                    let dS = new this.google.maps.DirectionsService();
                    let dR = new this.google.maps.DirectionsRenderer();
                    let waypts = [];
                    let dist = 0;

                    const distancePanel = document.getElementById("directions-transport-panel");
                    distancePanel.innerHTML = "";

                    this.map = new this.google.maps.Map(document.getElementById("map"), {
                        center: this.center,
                        zoom: 7,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullScreenControl: true,
                        zoomControl: true
                    });

                    dR.setMap(this.map);

                    for (let i = 1; i < this.getPointsTransport.length; i++) {
                        if (this.getPointsTransport[i].cityFrom !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsTransport[i].latFirstPoint,
                                    lng: this.getPointsTransport[i].lngFirstPoint
                                },
                                stopover: true
                            });
                        }

                        if (this.getPointsTransport[i].cityTo !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsTransport[i].latSecondPoint,
                                    lng: this.getPointsTransport[i].lngSecondPoint
                                },
                                stopover: true
                            });
                        }
                    }

                    let request = {
                        origin: {
                            lat: this.getPointsTransport[0].latFirstPoint,
                            lng: this.getPointsTransport[0].lngFirstPoint
                        },
                        destination: {
                            lat: this.getPointsTransport[0].latSecondPoint,
                            lng: this.getPointsTransport[0].lngSecondPoint
                        },
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'
                    };

                    dS.route(request, function (response, status) {
                        if (status === 'OK' && response) {
                            dR.setDirections(response);

                            const route = response.routes[0];

                            for (let i = 0; i < route.legs.length; i++) {
                                // С помощью replace убираем пробелы для больших чисел, чтобы преобразовать строку
                                // в число
                                dist += parseFloat(route.legs[i].distance.text
                                    .substring(0, route.legs[i].distance.text.lastIndexOf(' ')).replace(/\s+/g, ''));
                            }
                            distancePanel.innerHTML = "~" + dist + route.legs[0].distance.text
                                .substring(route.legs[0].distance.text.lastIndexOf(' '));
                        }
                    });
                })
            },

            setMarker(Points) {
                this.$gmapApiPromiseLazy().then(() => {
                    const markers = new this.google.maps.Marker({
                        position: Points,
                        map: this.map
                    })
                });
            },

            async sendOffer() {
                const transportOffer = Object.assign({}, {
                    additional: this.additional
                });

                const body = {
                    id: this.$route.params.id,
                    user: this.getUser,
                    transportOffer: transportOffer,
                    store: this.$store
                };

                await this.$store.dispatch('offer/sendTransportOfferAction', body);

                this.dialogSendingOffer = false;
                this.additional = '';
            },

            async sendMessage() {
                const chatMessage = Object.assign({}, {
                    message: this.message
                });

                const body = {
                    user: this.getUser,
                    userCompanion: this.userFromTransport,
                    chatMessage: chatMessage,
                    store: this.$store
                };

                if (this.message !== '' && this.message !== null) {
                    console.log('MESSAGE SENDING');
                    await this.$store.dispatch('chat/sendMessageAction', body);
                }

                this.dialogSendingMessage = false;
                this.message = '';
            }
        },
        mounted() {
            const resultData = this.$store.getters['transport/getDataResultSearch'];
            const data = {...resultData.data};
            this.queryResultSearch = Object.assign({}, {page: resultData.page}, {pageSize: 3}, data);

            this.checkFullnessProperties();

            this.initMap();
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .name-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 28px;
  }

  .photo-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 18px;
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

  .nuxt-link-active {
    text-decoration: none;
  }

  #map {
    height: 600px;
  }
</style>
