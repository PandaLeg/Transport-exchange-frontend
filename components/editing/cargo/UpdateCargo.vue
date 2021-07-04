<template>
  <v-card dark class="text-center">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-title></v-card-title>
      <v-container>
        <v-row align="start" justify="start">
          <v-col
            cols="12"
            md="4"
            lg="4"
          >

            <v-hover v-slot="{ hover }">
              <v-card
                color="grey lighten-4"
                max-width="300"
              >
                <v-img
                  :src="urlFirstPhoto"
                  aspect-ratio="1.7"
                  cover
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3"
                      style="height: 100%;"
                    >
                      <v-btn
                        color="orange"
                        class="white--text"
                        absolute
                        fab
                        :loading="isSelecting"
                        @click="onLoadingPhoto"
                      >
                        <v-icon>
                          cloud_upload
                        </v-icon>
                      </v-btn>
                      <input
                        ref="image"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onFirstFileChanged"
                      >
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-col
            cols="12"
            md="4"
            lg="4"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                color="grey lighten-4"
                max-width="300"
              >
                <v-img
                  :src="urlSecondPhoto"
                  aspect-ratio="1.7"
                  cover
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3"
                      style="height: 100%;"
                    >
                      <v-btn
                        color="orange"
                        class="white--text"
                        absolute
                        fab
                        :loading="isSelecting"
                        @click="onLoadingPhoto"
                      >
                        <v-icon>
                          cloud_upload
                        </v-icon>
                      </v-btn>
                      <input
                        ref="image"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onSecondFileChanged"
                      >
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>

          <v-col
            cols="12"
            md="4"
            lg="4"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                color="grey lighten-4"
                max-width="300"
              >
                <v-img
                  :src="urlThirdPhoto"
                  aspect-ratio="1.7"
                  cover
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3"
                      style="height: 100%;"
                    >
                      <v-btn
                        color="orange"
                        class="white--text"
                        absolute
                        fab
                        :loading="isSelecting"
                        @click="onLoadingPhoto"
                      >
                        <v-icon>
                          cloud_upload
                        </v-icon>
                      </v-btn>
                      <input
                        ref="image"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onThirdFileChanged"
                      >
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.nameCargo') }}:
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-autocomplete
              v-model="name"
              :items="listNamesCargo"
              :loading="isLoading"
              :search-input.sync="searchName"
              color="blue-grey lighten-2"
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="id"
              :label="$t('addCargo.selectNameCargo')"
              :placeholder="$t('addCargo.search')"
              filled
              required
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row
          v-if="cargoView.typeTransportation === 'seaTransportation'"
          align="start" justify="start"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              Тип контейнера
            </v-subheader>
          </v-col>

          <v-col
            cols="6"
            md="6"
            lg="6"
          >
            <v-autocomplete
              v-model="nameContainer"
              :items="listNamesContainers"
              :loading="isLoading"
              :search-input.sync="searchName"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="id"
              label="Выберете наименование контейнера"
              placeholder="Поиск"
              filled
              required
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col
            cols="6"
            md="4"
            lg="4"
          >
            <v-text-field
              v-model="count"
              filled
              clearable
              color="blue-grey lighten-2"
              label="Количество (шт)"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.weight') }}:
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="weightFrom"
              color="blue-grey lighten-2"
              :label="$t('addCargo.from')"
              filled
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="weightUpTo"
              color="blue-grey lighten-2"
              :label="$t('addCargo.before')"
              filled
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.volume') }}:
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeFrom"
              color="blue-grey lighten-2"
              :label="$t('addCargo.from')"
              filled
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeUpTo"
              color="blue-grey lighten-2"
              :label="$t('addCargo.before')"
              filled
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.dimensions') }}:
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            md="4"
            lg="4"
          >
            <v-text-field
              v-model="lengthCargo"
              color="blue-grey lighten-2"
              filled
              clearable
              :label="$t('addCargo.length')"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="widthCargo"
              filled
              clearable
              color="blue-grey lighten-2"
              :label="$t('addCargo.width')"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="heightCargo"
              filled
              clearable
              color="blue-grey lighten-2"
              :label="$t('addCargo.height')"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              ADR:
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="10"
            md="10"
          >
            <v-select
              v-model="adr"
              :items="getListArg"
              :menu-props="{ bottom: true, offsetY: true }"
              :hint="$t('addCargo.selectAdr')"
              persistent-hint
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row
          align="start" justify="start"
        >
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.dateLoading') }}:
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="loadingDateFrom"
                  :label="$t('addCargo.selectDateFrom')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="loadingDateFrom"
                @input="menu=false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="loadingDateBy"
                  :label="$t('addCargo.selectDateBy')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="loadingDateBy"
                @input="menu2=false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.typeBody') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-autocomplete
              v-model="bodyType"
              :items="bodyTypes"
              :loading="isLoading"
              :search-input.sync="searchBodyType"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="id"
              :label="$t('addCargo.selectBodyType')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <fa-icon :icon="faTruckMoving"></fa-icon>
                <v-list-item-content class="ml-lg-5">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <template
          v-if="cargoView.typeTransportation === 'roadTransportation'"
        >
          <v-row>
            <v-col
              cols="12"
              md="2"
              lg="2"
            >
              <v-subheader>
                {{ $t('addCargo.loading') }}
              </v-subheader>
            </v-col>
            <v-col
              md="10"
              lg="10"
            >
              <v-combobox
                v-model="typesLoadingTruck"
                :items="getListLoadingCar"
                :menu-props="{ bottom: true, offsetY: true }"
                :label="$t('addCargo.selectLoadingType')"
                filled
                clearable
                multiple
              ></v-combobox>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="2"
              lg="2"
            >
              <v-subheader>
                {{ $t('addCargo.unloading') }}
              </v-subheader>
            </v-col>
            <v-col
              md="10"
              lg="10"
            >
              <v-combobox
                v-model="typesUnloadingTruck"
                :items="getListLoadingCar"
                :menu-props="{ bottom: true, offsetY: true }"
                :label="$t('addCargo.selectUnloadingType')"
                filled
                clearable
                multiple
              ></v-combobox>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              md="2"
              lg="2"
            >
              <v-subheader>
                {{ $t('addCargo.permissions') }}
              </v-subheader>
            </v-col>
            <v-col
              v-if="cargoView.typeTransportation === 'roadTransportation'"
              cols="12"
              md="10"
              lg="10"
            >
              <v-combobox
                v-model="permissions"
                :items="getListPermissions"
                :menu-props="{ bottom: true, offsetY: true }"
                :label="$t('addCargo.selectPermissionType')"
                filled
                clearable
                multiple
              ></v-combobox>
            </v-col>
            <v-col
              v-else-if="cargoView.typeTransportation === 'railwayTransportation'"
              cols="12"
              md="10"
              lg="10"
            >
              <v-combobox
                v-model="permissions"
                :items="getPermissionForTrain"
                :menu-props="{ bottom: true, offsetY: true }"
                :label="$t('addCargo.selectPermissionType')"
                filled
                clearable
              ></v-combobox>
            </v-col>
          </v-row>
        </template>

        <template
          v-if="cargoView.typeTransportation === 'seaTransportation'"
        >
          <v-row>
            <v-col
              md="2"
              lg="2"
            >
              <v-subheader>
                Инкотермс
              </v-subheader>
            </v-col>
            <v-col
              cols="12"
              md="10"
              lg="10"
            >
              <v-select
                v-model="incoterms"
                :items="getIncoterms"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Выберите тип"
                filled
                clearable
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              md="2"
              lg="2"
            >
              <v-subheader>
                Загрузка контейнера
              </v-subheader>
            </v-col>
            <v-col
              cols="12"
              md="10"
              lg="10"
            >
              <v-combobox
                v-model="containerLoading"
                :items="getLoadingVessel"
                :menu-props="{ bottom: true, offsetY: true }"
                label="Выберите тип загрузки"
                filled
                clearable
                multiple
              ></v-combobox>
            </v-col>
          </v-row>
        </template>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.typePayment') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="typePayment"
              :items="getTypesPayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addCargo.selectPaymentType')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col
            cols="12"
            md="1"
            lg="1"
          >
            <v-subheader>
              {{ $t('addCargo.cost') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
            class="ml-lg-7"
          >
            <v-text-field
              v-model="cost"
              filled
              clearable
              color="blue-grey lighten-2"
              :label="$t('addCargo.sum')"
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
          >
            <v-select
              v-model="currency"
              :items="getListCurrency"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addCargo.currency')"
              filled
              clearable
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
          >
            <v-select
              v-model="costPer"
              :items="getListCostPer"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addCargo.for')"
              filled
              clearable
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.paymentForm') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="paymentForm"
              :items="getListFormPayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addCargo.selectPaymentForm')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.paymentTime') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="paymentTime"
              :items="getListTimePayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addCargo.selectPaymentTime')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.prepayment') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-text-field
              v-model="prepayment"
              filled
              clearable
              color="blue-grey lighten-2"
              label="50%"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.loading') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="10"
            md="10"
          >
            <v-autocomplete
              v-model="firstLoadingPoint"
              :items="entriesFirstLoadingPoint"
              :loading="isLoadingFirstPointFrom"
              :search-input.sync="searchFirstLoadingPoint"
              color="blue-grey lighten-2"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceLoading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledSecondPointFrom"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointTwo') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="9"
            lg="9"
          >
            <v-autocomplete
              v-model="secondLoadingPoint"
              :items="entriesSecondLoadingPoint"
              :loading="isLoadingSecondPointFrom"
              :search-input.sync="searchSecondLoadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceLoading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteLoadingPoint('secondLoading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledThirdPointFrom"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointThree') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="thirdLoadingPoint"
              :items="entriesThirdLoadingPoint"
              :loading="isLoadingThirdPointFrom"
              :search-input.sync="searchThirdLoadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceLoading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteLoadingPoint('thirdLoading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledFourthPointFrom"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointFour') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="fourthLoadingPoint"
              :items="entriesFourthLoadingPoint"
              :loading="isLoadingFourthPointFrom"
              :search-input.sync="searchFourthLoadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceLoading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteLoadingPoint('fourthLoading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledFifthPointFrom"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointFive') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="fifthLoadingPoint"
              :items="entriesFifthLoadingPoint"
              :loading="isLoadingFifthPointFrom"
              :search-input.sync="searchFifthLoadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceLoading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteLoadingPoint('fifthLoading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledTwoPointLoading && countOpenedField !== 6"
        >
          <v-col
            cols="12"
            lg="12"
          >
            <v-btn
              class="marg-b ma-2 white--text"
              @click="addNextFieldPointFrom"
            >
              {{ $t('addCargo.add') }}
              <v-icon
                right
                white
              >
                add
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>


        <v-row>
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.unloading') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="10"
            md="10"
          >
            <v-autocomplete
              v-model="firstUnloadingPoint"
              :items="entriesFirstUnloadingPoint"
              :loading="isLoadingFirstPointTo"
              :search-input.sync="searchFirstUnloadingPoint"
              color="blue-grey lighten-2"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceUnloading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledSecondPointTo"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointTwo') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="secondUnloadingPoint"
              :items="entriesSecondUnloadingPoint"
              :loading="isLoadingSecondPointTo"
              :search-input.sync="searchSecondUnloadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceUnloading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteUnloadingPoint('secondUnloading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledThirdPointTo"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointThree') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="thirdUnloadingPoint"
              :items="entriesThirdUnloadingPoint"
              :loading="isLoadingThirdPointTo"
              :search-input.sync="searchThirdUnloadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceUnloading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteUnloadingPoint('thirdUnloading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledFourthPointTo"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointFour') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="fourthUnloadingPoint"
              :items="entriesFourthUnloadingPoint"
              :loading="isLoadingFourthPointTo"
              :search-input.sync="searchFourthUnloadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceUnloading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteUnloadingPoint('fourthUnloading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-if="checkFilledFifthPointTo"
        >
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.pointFive') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="9"
            md="9"
          >
            <v-autocomplete
              v-model="fifthUnloadingPoint"
              :items="entriesFifthUnloadingPoint"
              :loading="isLoadingFifthPointTo"
              :search-input.sync="searchFifthUnloadingPoint"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addCargo.selectPlaceUnloading')"
              :placeholder="$t('addCargo.search')"
              filled
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.fields.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <v-icon left color="primary">mdi-flag</v-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            md="1"
            lg="1"
          >
            <v-btn
              icon
              smalll
              color="error"
              fab
              @click="deleteUnloadingPoint('fifthUnloading')"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          justify="end"
          v-if="checkFilledTwoPointUnloading && countOpenedField !== 6"
        >
          <v-col
            cols="12"
            lg="12"
          >
            <v-btn
              class="marg-b ma-2 white--text"
              @click="addNextFieldPointTo"
            >
              {{ $t('addCargo.add') }}
              <v-icon
                right
                white
              >
                add
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        plain
        @click="updateCargo"
      >
        {{ $t('adminPanel.updateBtn') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import profilePageAvatar from '../../../assets/AllisonProfilePage.jpg'
    import {faTruckMoving} from '@fortawesome/free-solid-svg-icons'
    import {names} from '@/json/cargo.name.json'
    import {containers} from '@/json/container.name.json'
    import {typesBody} from '../../../json/body.type.json'
    import {typesVessel} from '../../../json/vessel.type.json'
    import {typesCar} from '../../../json/car.type.json'

    export default {
        name: "UpdateCargo",
        data() {
            return {
                name: '',
                nameContainer: '',
                count: 0,
                isLoading: false,
                listNamesContainers: [],
                searchName: null,
                typeTransportation: '',
                weightFrom: '',
                weightUpTo: '',
                volumeFrom: '',
                volumeUpTo: '',
                lengthCargo: '',
                widthCargo: '',
                heightCargo: '',
                adr: '',
                loadingDateFrom: '',
                loadingDateBy: '',
                bodyType: null,
                bodyTypes: [],
                type: '',
                searchBodyType: null,
                typesLoadingTruck: [],
                typesUnloadingTruck: [],
                containerLoading: [],
                permissions: [],
                incoterms: '',
                typePayment: '',
                cost: '',
                currency: '',
                costPer: '',
                paymentForm: '',
                paymentTime: '',
                prepayment: '',
                additional: '',
                menu: '',
                menu2: '',
                isSelecting: false,
                firstPhoto: null,
                firstImageUrl: '',
                secondPhoto: null,
                secondImageUrl: '',
                thirdPhoto: null,
                thirdImageUrl: '',
                valid: true,
                properties: [],

                firstLoadingPoint: null,
                secondLoadingPoint: null,
                thirdLoadingPoint: null,
                fourthLoadingPoint: null,
                fifthLoadingPoint: null,
                firstUnloadingPoint: null,
                secondUnloadingPoint: null,
                thirdUnloadingPoint: null,
                fourthUnloadingPoint: null,
                fifthUnloadingPoint: null,

                isLoadingFirstPointFrom: false,
                isLoadingSecondPointFrom: false,
                isLoadingThirdPointFrom: false,
                isLoadingFourthPointFrom: false,
                isLoadingFifthPointFrom: false,
                isLoadingFirstPointTo: false,
                isLoadingSecondPointTo: false,
                isLoadingThirdPointTo: false,
                isLoadingFourthPointTo: false,
                isLoadingFifthPointTo: false,

                searchFirstLoadingPoint: null,
                searchSecondLoadingPoint: null,
                searchThirdLoadingPoint: null,
                searchFourthLoadingPoint: null,
                searchFifthLoadingPoint: null,
                searchFirstUnloadingPoint: null,
                searchSecondUnloadingPoint: null,
                searchThirdUnloadingPoint: null,
                searchFourthUnloadingPoint: null,
                searchFifthUnloadingPoint: null,

                entriesFirstLoadingPoint: [],
                entriesSecondLoadingPoint: [],
                entriesThirdLoadingPoint: [],
                entriesFourthLoadingPoint: [],
                entriesFifthLoadingPoint: [],
                entriesFirstUnloadingPoint: [],
                entriesSecondUnloadingPoint: [],
                entriesThirdUnloadingPoint: [],
                entriesFourthUnloadingPoint: [],
                entriesFifthUnloadingPoint: [],

                checkFilledTwoPointLoading: false,
                checkFilledTwoPointUnloading: false,
                checkFilledSecondPointFrom: false,
                checkFilledThirdPointFrom: false,
                checkFilledFourthPointFrom: false,
                checkFilledFifthPointFrom: false,
                checkFilledSecondPointTo: false,
                checkFilledThirdPointTo: false,
                checkFilledFourthPointTo: false,
                checkFilledFifthPointTo: false,
                countOpenedField: 2
            }
        },
        created() {
            this.listNamesContainers = containers;
            this.getCargo();
        },
        computed: {
            faTruckMoving() {
                return faTruckMoving
            },

            profilePicture() {
                return profilePageAvatar
            },

            cargoView() {
                return this.$store.getters['cargo/getCargoView']
            },

            getPointsCargo() {
                return this.$store.getters['cargo/getPointsCargo']
            },

            getPhotoCargo() {
                return this.$store.getters['cargo/getPhotoCargo']
            },

            getListArg() {
                return this.$store.getters['cargo/getListArg']
            },

            urlFirstPhoto() {
                return this.firstImageUrl ? this.firstImageUrl : profilePageAvatar;
            },

            urlSecondPhoto() {
                return this.secondImageUrl ? this.secondImageUrl : profilePageAvatar;
            },

            urlThirdPhoto() {
                return this.thirdImageUrl ? this.thirdImageUrl : profilePageAvatar;
            },

            listNamesCargo() {
                if (this.$i18n.localeProperties.code === 'en') {
                    return names.map(item => {
                        return Object.assign({}, {id: item.id, name: item.enName})
                    });
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return names.map(item => {
                        return Object.assign({}, {id: item.id, name: item.uaName})
                    });
                } else {
                    return names.map(item => {
                        return Object.assign({}, {id: item.id, name: item.ruName})
                    });
                }
            },

            getListLoadingCar() {
                let loadingCar = this.$store.getters['cargo/getLoadingCar'];
                return this.checkLocaleAndGetList(loadingCar);
            },

            getLoadingVessel() {
                let loading = this.$store.getters['cargo/getLoadingVessel'];
                return this.checkLocaleAndGetList(loading);
            },

            getListPermissions() {
                let permission = this.$store.getters['cargo/getPermission'];
                return this.checkLocaleAndGetList(permission);
            },

            getPermissionForTrain() {
                let permission = this.$store.getters['cargo/getPermissionForTrain'];
                return this.checkLocaleAndGetList(permission);
            },

            getIncoterms() {
                return this.$store.getters['cargo/getIncoterms'];
            },

            getTypesPayment() {
                let paymentType = this.$store.getters['cargo/getPaymentType'];
                return this.checkLocaleAndGetList(paymentType);
            },

            getListCurrency() {
                return this.$store.getters['cargo/getListCurrency']
            },

            getListCostPer() {
                let costPer = this.$store.getters['cargo/getCostPer'];
                return this.checkLocaleAndGetList(costPer);
            },

            getListFormPayment() {
                let paymentForm = this.$store.getters['cargo/getPaymentForm'];
                return this.checkLocaleAndGetList(paymentForm);
            },

            getListTimePayment() {
                let paymentTime = this.$store.getters['cargo/getPaymentTime'];
                return this.checkLocaleAndGetList(paymentTime);
            }
        },
        watch: {
            firstLoadingPoint() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6) {
                    this.checkFilledTwoPointLoading = true;
                    this.checkFilledTwoPointUnloading = true;
                }
            },

            secondLoadingPoint() {
                this.checkFilledLoadingFields(this.secondLoadingPoint);
            },

            thirdLoadingPoint() {
                this.checkFilledLoadingFields(this.thirdLoadingPoint);
            },

            fourthLoadingPoint() {
                this.checkFilledLoadingFields(this.fourthLoadingPoint);
            },

            fifthLoadingPoint() {
                this.checkFilledLoadingFields(this.fifthLoadingPoint);
            },

            firstUnloadingPoint() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6) {
                    this.checkFilledTwoPointLoading = true;
                    this.checkFilledTwoPointUnloading = true;
                }
            },

            secondUnloadingPoint() {
                this.checkFilledUnloadingFields(this.secondUnloadingPoint);
            },

            thirdUnloadingPoint() {
                this.checkFilledUnloadingFields(this.thirdUnloadingPoint);
            },

            fourthUnloadingPoint() {
                this.checkFilledUnloadingFields(this.fourthUnloadingPoint);
            },

            fifthUnloadingPoint() {
                this.checkFilledUnloadingFields(this.fifthUnloadingPoint);
            },

            searchFirstLoadingPoint(val) {
                this.searchLoadingPoint(val, this.firstLoadingPoint, this.entriesFirstLoadingPoint,
                    this.isLoadingFirstPointFrom, "fLp")
            },

            searchSecondLoadingPoint(val) {
                this.searchLoadingPoint(val, this.secondLoadingPoint, this.entriesSecondLoadingPoint,
                    this.isLoadingSecondPointFrom, "sLp")
            },

            searchThirdLoadingPoint(val) {
                this.searchLoadingPoint(val, this.thirdLoadingPoint, this.entriesThirdLoadingPoint,
                    this.isLoadingThirdPointFrom, "tLp")
            },

            searchFourthLoadingPoint(val) {
                this.searchLoadingPoint(val, this.fourthLoadingPoint, this.entriesFourthLoadingPoint,
                    this.isLoadingFourthPointFrom, "fourthLp")
            },

            searchFifthLoadingPoint(val) {
                this.searchLoadingPoint(val, this.fifthLoadingPoint, this.entriesFifthLoadingPoint,
                    this.isLoadingFifthPointFrom, "fifthLp")
            },

            searchFirstUnloadingPoint(val) {
                this.searchLoadingPoint(val, this.firstUnloadingPoint, this.entriesFirstUnloadingPoint,
                    this.isLoadingFirstPointTo, "fUp")
            },

            searchSecondUnloadingPoint(val) {
                this.searchLoadingPoint(val, this.secondUnloadingPoint, this.entriesSecondUnloadingPoint,
                    this.isLoadingSecondPointTo, "sUp")
            },

            searchThirdUnloadingPoint(val) {
                this.searchLoadingPoint(val, this.thirdUnloadingPoint, this.entriesThirdUnloadingPoint,
                    this.isLoadingThirdPointTo, "tUp")
            },

            searchFourthUnloadingPoint(val) {
                this.searchLoadingPoint(val, this.fourthUnloadingPoint, this.entriesFourthUnloadingPoint,
                    this.isLoadingFourthPointTo, "fourthUp")
            },

            searchFifthUnloadingPoint(val) {
                this.searchLoadingPoint(val, this.fifthUnloadingPoint, this.entriesFifthUnloadingPoint,
                    this.isLoadingFifthPointTo, "fifthUp")
            }
        },
        methods: {
            async getCargo() {
                let id = this.$route.params.id;

                await this.$store.dispatch('cargo/getPhotoCargoAction', this.$route.params.id);

                await this.$store.dispatch('cargo/getCargoAction', id)
                    .then(response => {
                        console.log(response);
                        if (this.getPhotoCargo && (this.getPhotoCargo.length === 1 || this.getPhotoCargo.length > 1)) {
                            this.firstImageUrl = this.getPhotoCargo[0].photoUrl;
                        }
                        if (this.getPhotoCargo && this.getPhotoCargo.length > 1) {
                            this.secondImageUrl = this.getPhotoCargo[1].photoUrl
                        }

                        if (this.getPhotoCargo && this.getPhotoCargo.length > 2) {
                            this.thirdImageUrl = this.getPhotoCargo[2].photoUrl
                        }

                        for (let i = 0; i < response.pointsLUCargo.length; i++) {
                            if (i === 0) {
                                this.firstLoadingPoint = {
                                    fields: {
                                        name: response.pointsLUCargo[i].cityFrom,
                                        country: response.pointsLUCargo[i].countryFrom,
                                        coordinates: [
                                            response.pointsLUCargo[i].latFirstPoint,
                                            response.pointsLUCargo[i].lngFirstPoint
                                        ]
                                    }
                                };
                                this.entriesFirstLoadingPoint = [
                                    this.firstLoadingPoint
                                ];

                                this.firstUnloadingPoint = {
                                    fields: {
                                        name: response.pointsLUCargo[i].cityTo,
                                        country: response.pointsLUCargo[i].countryTo,
                                        coordinates: [
                                            response.pointsLUCargo[i].latSecondPoint,
                                            response.pointsLUCargo[i].lngSecondPoint
                                        ]
                                    }
                                };
                                this.entriesFirstUnloadingPoint = [
                                    this.firstUnloadingPoint
                                ];
                            } else if (i === 1) {
                                if (response.pointsLUCargo[i].cityFrom !== null) {
                                    this.secondLoadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityFrom,
                                            country: response.pointsLUCargo[i].countryFrom,
                                            coordinates: [
                                                response.pointsLUCargo[i].latFirstPoint,
                                                response.pointsLUCargo[i].lngFirstPoint
                                            ]
                                        }
                                    };
                                    this.entriesSecondLoadingPoint = [
                                        this.secondLoadingPoint
                                    ];
                                    this.checkFilledSecondPointFrom = true;
                                    this.countOpenedField++;
                                }
                                if (response.pointsLUCargo[i].cityTo !== null) {
                                    this.secondUnloadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityTo,
                                            country: response.pointsLUCargo[i].countryTo,
                                            coordinates: [
                                                response.pointsLUCargo[i].latSecondPoint,
                                                response.pointsLUCargo[i].lngSecondPoint
                                            ]
                                        }
                                    };
                                    this.entriesSecondUnloadingPoint = [
                                        this.secondUnloadingPoint
                                    ];
                                    this.checkFilledSecondPointTo = true;
                                    this.countOpenedField++;
                                }
                            } else if (i === 2) {
                                if (response.pointsLUCargo[i].cityFrom !== null) {
                                    this.thirdLoadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityFrom,
                                            country: response.pointsLUCargo[i].countryFrom,
                                            coordinates: [
                                                response.pointsLUCargo[i].latFirstPoint,
                                                response.pointsLUCargo[i].lngFirstPoint
                                            ]
                                        }
                                    };
                                    this.entriesThirdLoadingPoint = [
                                        this.thirdLoadingPoint
                                    ];
                                    this.checkFilledThirdPointFrom = true;
                                    this.countOpenedField++;
                                }
                                if (response.pointsLUCargo[i].cityTo) {
                                    this.thirdUnloadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityTo,
                                            country: response.pointsLUCargo[i].countryTo,
                                            coordinates: [
                                                response.pointsLUCargo[i].latSecondPoint,
                                                response.pointsLUCargo[i].lngSecondPoint
                                            ]
                                        }
                                    };
                                    this.entriesThirdUnloadingPoint = [
                                        this.thirdUnloadingPoint
                                    ];
                                    this.checkFilledThirdPointTo = true;
                                    this.countOpenedField++;
                                }
                            } else if (i === 3) {
                                if (response.pointsLUCargo[i].cityFrom) {
                                    this.fourthLoadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityFrom,
                                            country: response.pointsLUCargo[i].countryFrom,
                                            coordinates: [
                                                response.pointsLUCargo[i].latFirstPoint,
                                                response.pointsLUCargo[i].lngFirstPoint
                                            ]
                                        }
                                    };
                                    this.entriesFourthLoadingPoint = [
                                        this.fourthLoadingPoint
                                    ];
                                    this.checkFilledFourthPointFrom = true;
                                    this.countOpenedField++;
                                }
                                if (response.pointsLUCargo[i].cityTo) {
                                    this.fourthUnloadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityTo,
                                            country: response.pointsLUCargo[i].countryTo,
                                            coordinates: [
                                                response.pointsLUCargo[i].latSecondPoint,
                                                response.pointsLUCargo[i].lngSecondPoint
                                            ]
                                        }
                                    };
                                    this.entriesFourthUnloadingPoint = [
                                        this.fourthUnloadingPoint
                                    ];
                                    this.checkFilledFourthPointTo = true;
                                    this.countOpenedField++;
                                }
                            } else {
                                if (response.pointsLUCargo[i].cityFrom) {
                                    this.fifthLoadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityFrom,
                                            country: response.pointsLUCargo[i].countryFrom,
                                            coordinates: [
                                                response.pointsLUCargo[i].latFirstPoint,
                                                response.pointsLUCargo[i].lngFirstPoint
                                            ]
                                        }
                                    };
                                    this.entriesFifthLoadingPoint = [
                                        this.fifthLoadingPoint
                                    ];
                                    this.checkFilledFifthPointFrom = true;
                                    this.countOpenedField++;
                                }
                                if (response.pointsLUCargo[i].cityTo) {
                                    this.fifthUnloadingPoint = {
                                        fields: {
                                            name: response.pointsLUCargo[i].cityTo,
                                            country: response.pointsLUCargo[i].countryTo,
                                            coordinates: [
                                                response.pointsLUCargo[i].latSecondPoint,
                                                response.pointsLUCargo[i].lngSecondPoint
                                            ]
                                        }
                                    };
                                    this.entriesFifthUnloadingPoint = [
                                        this.fifthUnloadingPoint
                                    ];
                                    this.checkFilledFifthPointTo = true;
                                    this.countOpenedField++;
                                }
                            }
                        }
                        console.log(response.cargo);
                        this.name = this.localizeNameAndBodyType(response.cargo.typesCargo, 'nameCargo');
                        this.weightFrom = response.cargo.weightFrom;
                        this.weightUpTo = response.cargo.weightUpTo;
                        this.volumeFrom = response.cargo.volumeFrom;
                        this.volumeUpTo = response.cargo.volumeUpTo;
                        this.length = response.cargo.length;
                        this.width = response.cargo.width;
                        this.height = response.cargo.height;
                        this.loadingDateFrom = response.cargo.loadingDateFrom;
                        this.loadingDateBy = response.cargo.loadingDateBy;
                        this.adr = response.cargo.adr;
                        this.nameContainer = containers.find(item => item.name === response.cargo.nameContainer);
                        this.count = response.cargo.count;
                        this.incoterms = response.cargo.incoterms;
                        this.prepayment = response.cargo.prepayment;

                        if (response.cargo.typeTransportation === 'roadTransportation') {
                            this.bodyTypes = this.localeBodyTypes(typesBody);
                        } else if (response.cargo.typeTransportation === 'seaTransportation') {
                            this.bodyTypes = this.localeBodyTypes(typesVessel);
                        } else {
                            this.bodyTypes = this.localeBodyTypes(typesCar);
                        }

                        this.bodyType = this.localizeNameAndBodyType(response.cargo.typesCargo);
                        this.filteringProperties();
                        this.properties.forEach(item => {
                            if (item.property === 'loading') {
                                this.typesLoadingTruck.push(item.name);
                            }
                            if (item.property === 'unloading') {
                                this.typesUnloadingTruck.push(item.name);
                            }
                            if (item.property === 'permissionType') {
                                this.permissions.push(item.name);
                            }

                            if (item.property === 'typePayment') {
                                this.typePayment = item.name;
                            }

                            if (item.property === 'costPer') {
                                this.costPer = item.name;
                            }

                            if (item.property === 'paymentForm') {
                                this.paymentForm = item.name;
                            }

                            if (item.property === 'paymentTime') {
                                this.paymentTime = item.name;
                            }

                            if (item.property === 'containerLoading') {
                                this.containerLoading.push(item.name);
                            }

                        });
                    }).catch(error => {
                        console.log(error);
                    });
            },

            localizeNameAndBodyType(typesCargo, type) {
                let name;

                if (type != null) {
                    name = typesCargo.find(i => i.type === type);
                } else {
                    name = typesCargo.find(i => {
                        if (i.type === 'bodyType') {
                            return i;
                        }
                        if (i.type === 'vesselType') {
                            return i;
                        }
                        if (i.type === 'carType') {
                            return i;
                        }
                    });
                    this.type = name.type;
                }

                if (this.$i18n.localeProperties.code === 'en') {
                    return Object.assign({}, {id: String(name.id), name: name.enName})
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return Object.assign({}, {id: String(name.id), name: name.uaName})
                } else {
                    return Object.assign({}, {id: String(name.id), name: name.ruName})
                }
            },

            localeBodyTypes(listBody) {
                if (this.$i18n.localeProperties.code === 'en') {
                    return listBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.enName})
                    });
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return listBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.uaName})
                    });
                } else {
                    return listBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.ruName})
                    });
                }
            },

            checkLocaleAndGetList(someObject) {
                if (this.$i18n.localeProperties.code === 'en') {
                    return someObject.listEn
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return someObject.listUa
                } else {
                    return someObject.listRu
                }
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

            searchLoadingPoint(val, firstLoadingPoint, entries, isLoadingPoint, checkPoint) {
                let checkFilled = false;

                if (entries.length > 0) {
                    for (let i = 0; i < entries.length; i++) {
                        if (firstLoadingPoint === entries[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (isLoadingPoint) return;

                    switch (checkPoint) {
                        case 'fLp':
                            this.isLoadingFirstPointFrom = true;
                            break;
                        case 'sLp':
                            this.isLoadingSecondPointFrom = true;
                            break;
                        case 'tLp':
                            this.isLoadingThirdPointFrom = true;
                            break;
                        case 'fourthLp':
                            this.isLoadingFourthPointFrom = true;
                            break;
                        case 'fifthLp':
                            this.isLoadingFifthPointFrom = true;
                            break;
                        case 'fUp':
                            this.isLoadingFirstPointTo = true;
                            break;
                        case 'sUp':
                            this.isLoadingSecondPointTo = true;
                            break;
                        case 'tUp':
                            this.isLoadingThirdPointTo = true;
                            break;
                        case 'fourthUp':
                            this.isLoadingFourthPointTo = true;
                            break;
                        case 'fifthUp':
                            this.isLoadingFifthPointTo = true;
                            break;
                    }


                    console.log("FIRST SEARCH", val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            switch (checkPoint) {
                                case 'fLp':
                                    this.entriesFirstLoadingPoint = res.records;
                                    this.isLoadingFirstPointFrom = false;
                                    break;
                                case 'sLp':
                                    this.entriesSecondLoadingPoint = res.records;
                                    this.isLoadingSecondPointFrom = false;
                                    break;
                                case 'tLp':
                                    this.entriesThirdLoadingPoint = res.records;
                                    this.isLoadingThirdPointFrom = false;
                                    break;
                                case 'fourthLp':
                                    this.entriesFourthLoadingPoint = res.records;
                                    this.isLoadingFourthPointFrom = false;
                                    break;
                                case 'fifthLp':
                                    this.entriesFifthLoadingPoint = res.records;
                                    this.isLoadingFifthPointFrom = false;
                                    break;
                                case 'fUp':
                                    this.entriesFirstUnloadingPoint = res.records;
                                    this.isLoadingFirstPointTo = false;
                                    break;
                                case 'sUp':
                                    this.entriesSecondUnloadingPoint = res.records;
                                    this.isLoadingSecondPointTo = false;
                                    break;
                                case 'tUp':
                                    this.entriesThirdUnloadingPoint = res.records;
                                    this.isLoadingThirdPointTo = false;
                                    break;
                                case 'fourthUp':
                                    this.entriesFourthUnloadingPoint = res.records;
                                    this.isLoadingFourthPointTo = false;
                                    break;
                                case 'fifthUp':
                                    this.entriesFifthUnloadingPoint = res.records;
                                    this.isLoadingFifthPointTo = false;
                                    break;
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }
            },

            addNextFieldPointFrom() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && !this.checkFilledSecondPointFrom) {
                    this.checkFilledSecondPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && !this.checkFilledThirdPointFrom) {
                    this.checkFilledThirdPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && this.checkFilledThirdPointFrom && !this.checkFilledFourthPointFrom) {
                    this.checkFilledFourthPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && this.checkFilledThirdPointFrom && this.checkFilledFourthPointFrom
                    && !this.checkFilledFifthPointFrom) {
                    this.checkFilledFifthPointFrom = true;
                    this.countOpenedField++;
                }

                this.checkFilledTwoPointLoading = false;
            },

            addNextFieldPointTo() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && !this.checkFilledSecondPointTo) {
                    this.checkFilledSecondPointTo = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointTo
                    && !this.checkFilledThirdPointTo) {
                    this.checkFilledThirdPointTo = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointTo
                    && this.checkFilledThirdPointTo && !this.checkFilledFourthPointTo) {
                    this.checkFilledFourthPointTo = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointTo
                    && this.checkFilledThirdPointTo && this.checkFilledFourthPointTo
                    && !this.checkFilledFifthPointTo) {
                    this.checkFilledFifthPointTo = true;
                    this.countOpenedField++;
                }

                this.checkFilledTwoPointUnloading = false;
            },

            checkFilledLoadingFields(value) {
                if (!this.checkFilledTwoPointLoading) {
                    this.checkFilledTwoPointLoading = !!(value && this.countOpenedField !== 6)
                }
            },

            checkFilledUnloadingFields(value) {
                if (!this.checkFilledTwoPointUnloading) {
                    this.checkFilledTwoPointUnloading = !!(value && this.countOpenedField !== 6);
                }
            },

            deleteLoadingPoint(checkField) {
                this.checkFilledTwoPointLoading = true;
                this.checkFilledTwoPointUnloading = true;

                if (checkField === 'secondLoading') {
                    this.checkFilledSecondPointFrom = false;
                    this.secondLoadingPoint = null;
                }

                if (checkField === 'thirdLoading') {
                    this.checkFilledThirdPointFrom = false;
                    this.thirdLoadingPoint = null;
                }

                if (checkField === 'fourthLoading') {
                    this.checkFilledFourthPointFrom = false;
                    this.fourthLoadingPoint = null;
                }

                if (checkField === 'fifthLoading') {
                    this.checkFilledFifthPointFrom = false;
                    this.fifthLoadingPoint = null;
                }

                this.countOpenedField--;
            },

            deleteUnloadingPoint(checkFilled) {
                this.checkFilledTwoPointLoading = true;
                this.checkFilledTwoPointUnloading = true;

                if (checkFilled === 'secondUnloading') {
                    this.checkFilledSecondPointTo = false;
                    this.secondUnloadingPoint = null;
                }

                if (checkFilled === 'thirdUnloading') {
                    this.checkFilledThirdPointTo = false;
                    this.thirdUnloadingPoint = null;
                }

                if (checkFilled === 'fourthUnloading') {
                    this.checkFilledFourthPointTo = false;
                    this.fourthUnloadingPoint = null;
                }

                if (checkFilled === 'fifthUnloading') {
                    this.checkFilledFifthPointTo = false;
                    this.fifthUnloadingPoint = null;
                }

                this.countOpenedField--;
            },

            onLoadingPhoto() {
                this.isSelecting = true;
                window.addEventListener('focus', () => {
                    this.isSelecting = false;
                }, {once: true});

                this.$refs.image.click()
            },

            onFirstFileChanged(e) {
                console.log("FIRST FILE");
                const files = e.target.files;
                if (files[0] !== undefined) {
                    if (files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);

                    fr.addEventListener('load', () => {
                        this.firstImageUrl = fr.result;
                        this.firstPhoto = files[0];
                    });
                }
            },

            onSecondFileChanged(e) {
                console.log("SECOND FILE");
                const files = e.target.files;
                if (files[0] !== undefined) {
                    if (files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }

                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);

                    fr.addEventListener('load', () => {
                        this.secondImageUrl = fr.result;
                        this.secondPhoto = files[0];
                    });
                }
            },

            onThirdFileChanged(e) {
                console.log("THIRD FILE");
                const files = e.target.files;
                if (files[0] !== undefined) {
                    if (files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }

                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);

                    fr.addEventListener('load', () => {
                        this.thirdImageUrl = fr.result;
                        this.thirdPhoto = files[0];
                    });
                }
            },

            async updateCargo() {
                this.formData = new FormData();

                console.log(this.name);

                const cargo = {
                    id: this.cargoView.id, nameContainer: this.nameContainer?.name,
                    count: this.count, weightFrom: this.weightFrom, weightUpTo: this.weightUpTo,
                    volumeFrom: this.volumeFrom, volumeUpTo: this.volumeUpTo, lengthCargo: this.lengthCargo,
                    widthCargo: this.widthCargo, heightCargo: this.heightCargo, adr: this.adr,
                    loadingDateFrom: this.loadingDateFrom, loadingDateBy: this.loadingDateBy,
                    incoterms: this.incoterms, cost: this.cost, currency: this.currency, prepayment: this.prepayment
                };

                const places = [
                    {
                        cityFrom: this.firstLoadingPoint.fields.name,
                        countryFrom: this.firstLoadingPoint.fields.country,
                        cityTo: this.firstUnloadingPoint.fields.name,
                        countryTo: this.firstUnloadingPoint.fields.country,
                        latFirstPoint: this.firstLoadingPoint.fields.coordinates[0],
                        lngFirstPoint: this.firstLoadingPoint.fields.coordinates[1],
                        latSecondPoint: this.firstUnloadingPoint.fields.coordinates[0],
                        lngSecondPoint: this.firstUnloadingPoint.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.secondLoadingPoint?.fields.name,
                        countryFrom: this.secondLoadingPoint?.fields.country,
                        cityTo: this.secondUnloadingPoint?.fields.name,
                        countryTo: this.secondUnloadingPoint?.fields.country,
                        latFirstPoint: this.secondLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.secondLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.secondUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.secondUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.thirdLoadingPoint?.fields.name,
                        countryFrom: this.thirdLoadingPoint?.fields.country,
                        cityTo: this.thirdUnloadingPoint?.fields.name,
                        countryTo: this.thirdUnloadingPoint?.fields.country,
                        latFirstPoint: this.thirdLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.thirdLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.thirdUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.thirdUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.fourthLoadingPoint?.fields.name,
                        countryFrom: this.fourthLoadingPoint?.fields.country,
                        cityTo: this.fourthUnloadingPoint?.fields.name,
                        countryTo: this.fourthUnloadingPoint?.fields.country,
                        latFirstPoint: this.fourthLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.fourthLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.fourthUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.fourthUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.fifthLoadingPoint?.fields.name,
                        countryFrom: this.fifthLoadingPoint?.fields.country,
                        cityTo: this.fifthUnloadingPoint?.fields.name,
                        countryTo: this.fifthUnloadingPoint?.fields.country,
                        latFirstPoint: this.fifthLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.fifthLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.fifthUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.fifthUnloadingPoint?.fields.coordinates[1]
                    },
                ];

                const propertiesCargo = {
                    name: this.name?.name, bodyType: this.bodyType?.name, type: this.type,
                    typesLoadingTruck: this.typesLoadingTruck, typesUnloadingTruck: this.typesUnloadingTruck,
                    containerLoading: this.containerLoading, permissions: this.permissions,
                    typePayment: this.typePayment, costPer: this.costPer,
                    paymentForm: this.paymentForm, paymentTime: this.paymentTime
                };

                console.log(this.type);

                this.formData.append("firstPhoto", this.firstPhoto);
                this.formData.append("secondPhoto", this.secondPhoto);
                this.formData.append("thirdPhoto", this.thirdPhoto);

                const imagesUrl = [this.firstImageUrl, this.secondImageUrl, this.thirdImageUrl];

                this.formData.append("cargo", new Blob([JSON.stringify(cargo)],
                    {type: "application/json"}));

                this.formData.append("placesCargo", new Blob([JSON.stringify(places)],
                    {type: "application/json"}));

                this.formData.append("propertiesCargo", new Blob([JSON.stringify(propertiesCargo)],
                    {type: "application/json"}));

                this.formData.append("imagesUrl", new Blob([JSON.stringify(imagesUrl)],
                    {type: "application/json"}));

                await this.$store.dispatch('admin/updateCargoAction', {
                    store: this.$store, formData: this.formData, typeTransportation: this.cargoView.typeTransportation
                }).then(() => {
                    this.$router.push(this.localePath('/offer/cargo'));
                });
            }
        }
    }
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
</style>
