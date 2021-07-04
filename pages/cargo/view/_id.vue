<template>
  <v-container>
    <v-row justify="center">
      <v-col
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
              <v-card-subtitle class="spectral-font">{{ $t('view.offerPublished') }} - {{ dateAddedCargo }}</v-card-subtitle>
            </v-col>

            <v-col
              lg="4"
              v-if="getUser !== null && userFromCargo.id !== getUser.id && !getCheckUserFromOffer"
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
                    :disabled="checkSendingOffer"
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

          <v-card-title class="name-font">{{ getLocalizeCargoName() }}</v-card-title>

          <v-card-text>
            <v-row justify="start">
              <v-col
                v-if="cargoView.typeTransportation === 'seaTransportation'"
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">Контейнер:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span class="spectral-font text--primary">
                    {{ cargoView.nameContainer}}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="cargoView.typeTransportation === 'seaTransportation'"
              justify="start"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">Количество:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span class="spectral-font text--primary">
                    {{ cargoView.count}} шт
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
                <span class="subtitle-font">{{ $t('view.fromWhere') }}:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                <template v-for="point in getPointsCargo">
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
                <template v-for="point in getPointsCargo">
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
                    <div id="directions-cargo-panel"></div>
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
                  v-if="cargoView.weightFrom === cargoView.weightUpTo"
                  class="spectral-font text--primary"
                >
                    {{ cargoView.weightFrom}} {{ $t('view.ton') }}
                </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ cargoView.weightFrom}} - {{ cargoView.weightUpTo }} {{ $t('view.ton') }}
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.volumeFrom !== '' || cargoView.volumeUpTo !== ''">
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
                    v-if="cargoView.volumeFrom !== '' && cargoView.volumeUpTo !== '' &&
                    cargoView.volumeFrom === cargoView.volumeUpTo"
                    class="spectral-font text--primary"
                  >
                    {{ cargoView.volumeFrom}} {{ $t('view.cubicMeters') }}
                  </span>
                <span
                  v-else-if="cargoView.volumeFrom !== ''"
                  class="spectral-font text--primary"
                >
                    {{ cargoView.volumeFrom}} {{ $t('view.cubicMeters') }}
                  </span>
                <span
                  v-else-if="cargoView.volumeUpTo !== ''"
                  class="spectral-font text--primary"
                >
                    {{ cargoView.volumeUpTo }} {{ $t('view.cubicMeters') }}
                  </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ cargoView.volumeFrom}} - {{ cargoView.volumeUpTo }} {{ $t('view.cubicMeters') }}
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.lengthCargo !== '' || cargoView.widthCargo !== '' ||
            cargoView.heightCargo !== ''">
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
                  v-if="cargoView.lengthCargo !== '' && cargoView.widthCargo !== '' &&
                    cargoView.heightCargo !== ''"
                  class="spectral-font text--primary"
                >
                  {{ cargoView.lengthCargo }} {{ $t('view.metersLong') }},
                  {{ cargoView.widthCargo }} {{ $t('view.metersWide') }},
                  {{ cargoView.heightCargo }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== '' && cargoView.widthCargo === '' &&
                  cargoView.heightCargo === ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.lengthCargo }} {{ $t('view.metersLong') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === '' && cargoView.widthCargo !== '' &&
                  cargoView.heightCargo === ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.widthCargo }} {{ $t('view.metersWide') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === '' && cargoView.widthCargo === '' &&
                  cargoView.heightCargo !== ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.heightCargo }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== '' && cargoView.widthCargo !== '' &&
                  cargoView.heightCargo === ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.lengthCargo }} {{ $t('view.metersLong') }},
                  {{ cargoView.widthCargo }} {{ $t('view.metersWide') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== '' && cargoView.widthCargo === '' &&
                  cargoView.heightCargo !== ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.lengthCargo }} {{ $t('view.metersLong') }},
                  {{ cargoView.heightCargo }} {{ $t('view.metersHigh') }}
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === '' && cargoView.widthCargo !== '' &&
                  cargoView.heightCargo !== ''"
                  class="spectral-font text--primary"
                >
                   {{ cargoView.widthCargo }} {{ $t('view.metersWide') }},
                  {{ cargoView.heightCargo }} {{ $t('view.metersHigh') }}
                </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.adr !== null && cargoView.adr !== ''">
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
                    {{ cargoView.adr}}
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
              justify="start"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span
                  v-if="cargoView.typeTransportation === 'roadTransportation'"
                  class="subtitle-font"
                >
                  {{ $t('view.bodyType') }}:
                </span>
                <span
                  v-else-if="cargoView.typeTransportation === 'seaTransportation'"
                  class="subtitle-font"
                >
                  Тип судна:
                </span>
                <span
                  v-else
                  class="subtitle-font"
                >
                  Тип вагона:
                </span>

              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span
                    class="spectral-font text--primary">
                    {{ getLocalizeBodyType() }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="cargoView.typeTransportation === 'seaTransportation'"
              justify="start"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">Загрузка контейнера:</span>
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
                    v-if="prop.property === 'containerLoading'"
                    :key="prop.id"
                    class="spectral-font text--primary">
                    {{ prop.name }}
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row
              v-if="cargoView.typeTransportation === 'seaTransportation'"
              justify="start"
            >
              <v-col
                cols="12"
                sm="3"
                md="3"
                lg="3"
              >
                <span class="subtitle-font">Инкотермс:</span>
              </v-col>
              <v-col
                cols="12"
                sm="9"
                md="9"
                lg="9"
              >
                  <span
                    class="spectral-font text--primary">
                    {{ cargoView.incoterms }}
                  </span>
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
                v-for="photo in getPhotoCargo"
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
                    v-for="photo in getPhotoCargo"
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
                <span class="photo-font text--primary">{{ $t('view.documentTitle') }}</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="4"
                v-for="file in getFilesCargo"
                :key="file.id"
              >
                <v-card>
                  <v-card-title>{{ file.filename }}</v-card-title>
                  <v-card-actions>
                    <v-btn
                      :href="file.fileUrl"
                      color="primary"
                      outlined
                    >
                      {{ $t('view.documentRedirect') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

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
        lg="4"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="localePath('/profile/' + userFromCargo.id)"
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
                      {{ userFromCargo.fullName }}
                    </span>
                  </template>
                  <template
                    v-else
                  >
                    <span class="spectral-font text--primary">
                      {{ userFromCargo.firstName }}
                      {{ userFromCargo.lastName }}
                      {{ userFromCargo.patronymic }}
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
                  <span class="spectral-font text--primary">{{ userFromCargo.email }}</span>
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
                  <span class="spectral-font text--primary">{{ userFromCargo.city }}, {{ userFromCargo.country }}</span>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-dialog
              v-if="getUser !== null && userFromCargo.id !== getUser.id"
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

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      <p>{{ $t('view.snackBarOffers') }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          {{ $t('view.closeBtn') }}
        </v-btn>
      </template>
    </v-snackbar>

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
  </v-container>
</template>

<script>
    import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
    import {parseCargoDate} from '../../../service/cargo/parseDate'
    import * as VueGoogleMaps from 'vue2-google-maps'

    export default {
        name: "cargo-view-id",
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        async fetch({store, params}) {
            let body = {
                idCargo: Number(params.id),
                user: store.getters['getUser'],
                store: store
            };

            if (Object.keys(store.getters['cargo/getCargoView']).length !== 0) {
                if (store.getters['cargo/getCargoView'].id !== Number(params.id)) {
                    await store.dispatch('cargo/getCargoAction', params.id);
                    await store.dispatch('cargo/getPhotoCargoAction', params.id);
                }
            } else {
                await store.dispatch('cargo/getCargoAction', params.id);
                await store.dispatch('cargo/getPhotoCargoAction', params.id);
            }

            await store.commit('cargo/setCheckUserFromOffer');

            if (body.user !== null) {
                await store.dispatch('cargo/checkUserSentOfferAction', body);
            }
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
                map: null,
                multiLine: true,
                snackbar: false,
                snackbarMessage: false,
                checkSendingOffer: false
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            cargoView() {
                return this.$store.getters['cargo/getCargoView']
            },

            userFromCargo() {
                return this.$store.getters['cargo/getUserFromCargo']
            },

            checkRoleUser() {
                let user = this.$store.getters['cargo/getUserFromCargo'];
                return user.roles.map(role => role.name).includes('ROLE_LEGAL_USER');
            },

            getCheckUserFromOffer() {
                return this.$store.getters['cargo/getCheckUserFromOffer']
            },

            checkUser() {
                return this.$store.getters['cargo/checkUser']
            },

            faAngleLeft() {
                return faAngleLeft
            },

            getPageSize() {
                return this.$store.getters['cargo/getPageSize']
            },

            getPathToSearch() {
                return this.$store.getters['cargo/getPathToSearch']
            },

            dateAddedCargo(){
                let dateAdded = this.cargoView.dateAdded;

                return parseCargoDate.parseDate(dateAdded, null, this.$i18n.localeProperties.code);
            },

            parseDate() {
                let loadingDateFrom = this.cargoView.loadingDateFrom;
                let loadingDateBy = this.cargoView.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy, this.$i18n.localeProperties.code);
            },

            getPointsCargo() {
                return this.$store.getters['cargo/getPointsCargo']
            },

            getPhotoCargo() {
                return this.$store.getters['cargo/getPhotoCargo']
            },

            getFilesCargo() {
                return this.$store.getters['cargo/getFilesCargo']
            },

            getDataResultSearch() {
                return this.$store.getters['cargo/getDataResultSearch']
            },

            google: VueGoogleMaps.gmapApi
        },
        created() {
            this.$store.commit('cargo/setResultDataSearch');
            this.$store.commit('cargo/setPageSize', 3);
            this.filteringProperties();
            if (this.getUser !== null) {
                this.firstName = this.getUser.firstName;
                this.lastName = this.getUser.lastName;
                this.patronymic = this.getUser.patronymic;
                this.email = this.getUser.email;
            }
        },
        methods: {
            getLocalizeCargoName() {
                let nameCargo = this.cargoView.typesCargo.find(i => i.type === 'nameCargo');

                if (this.$i18n.localeProperties.code === 'en') {
                    return nameCargo.enName;
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return nameCargo.uaName;
                } else {
                    return nameCargo.ruName;
                }
            },

            getLocalizeBodyType() {
                let bodyType = this.cargoView.typesCargo.find(i => i.type === 'bodyType' || 'vesselType' || 'carType');

                if (this.$i18n.localeProperties.code === 'en') {
                    return bodyType.enName;
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return bodyType.uaName;
                } else {
                    return bodyType.ruName;
                }
            },

            checkFullnessProperties() {
                this.cargoView.propertiesCargo.forEach(prop => {
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
                this.cargoView.propertiesCargo.map(prop => {
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

                    const summaryPanel = document.getElementById("directions-cargo-panel");
                    summaryPanel.innerHTML = "";

                    this.map = new this.google.maps.Map(document.getElementById("map"), {
                        center: this.center,
                        zoom: 7,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullScreenControl: true,
                        zoomControl: true
                    });

                    dR.setMap(this.map);

                    for (let i = 1; i < this.getPointsCargo.length; i++) {
                        if (this.getPointsCargo[i].cityFrom !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsCargo[i].latFirstPoint,
                                    lng: this.getPointsCargo[i].lngFirstPoint
                                },
                                stopover: true
                            });
                        }

                        if (this.getPointsCargo[i].cityTo !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsCargo[i].latSecondPoint,
                                    lng: this.getPointsCargo[i].lngSecondPoint
                                },
                                stopover: true
                            });
                        }
                    }

                    let request = {
                        origin: {
                            lat: this.getPointsCargo[0].latFirstPoint,
                            lng: this.getPointsCargo[0].lngFirstPoint
                        },
                        destination: {
                            lat: this.getPointsCargo[0].latSecondPoint,
                            lng: this.getPointsCargo[0].lngSecondPoint
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
                            summaryPanel.innerHTML = "~" + dist + route.legs[0].distance.text
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
                const cargoOffer = Object.assign({}, {
                    additional: this.additional
                });

                const body = {
                    id: this.$route.params.id,
                    user: this.getUser,
                    cargoOffer: cargoOffer,
                    store: this.$store
                };

                await this.$store.dispatch('offer/sendCargoOfferAction', body)
                    .then(() => {
                        this.checkSendingOffer = true;
                        this.snackbar = true;
                        this.dialogSendingOffer = false;
                        this.additional = '';
                    }).catch(err => {
                        console.log(err);
                    });
            },

            async sendMessage() {
                const chatMessage = Object.assign({}, {
                    message: this.message
                });

                const body = {
                    user: this.getUser,
                    userCompanion: this.userFromCargo,
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
        },
        mounted() {
            const resultData = this.getDataResultSearch;
            const data = {...resultData.data};
            this.queryResultSearch = Object.assign({}, {page: resultData.page}, {pageSize: 3}, data);
            this.$store.commit('cargo/setPageSize', 3);

            console.log(this.cargoView);
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
