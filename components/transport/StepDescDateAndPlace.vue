<template>
  <v-card
    dark
    v-if="n === 1"
  >
    <v-row
      class="pa-4"
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <h3 class="headline">
          {{ $t('addTransport.dateAndPlaceTitle') }}
        </h3>
      </v-col>
    </v-row>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>

        <v-row>
          <v-col>
            <v-subheader inset>
              {{ $t('addTransport.dateAndPlaceTitle') }}
            </v-subheader>
            <v-divider inset></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.loadingDate') }}
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
                  :error-messages="loadingDateFromErrors"
                  :label="$t('addTransport.selectDateFrom')"
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
                  :error-messages="loadingDateByErrors"
                  :label="$t('addTransport.selectDateBy')"
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
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.loading') }}
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
              :error-messages="firstLoadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceLoading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointTwo') }}
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
              :label="$t('addTransport.selectPlaceLoading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointThree') }}
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
              :error-messages="firstLoadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceLoading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointFour') }}
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
              :error-messages="firstLoadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceLoading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointFive') }}
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
              :error-messages="firstLoadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceLoading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.add') }}
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
              {{ $t('addTransport.unloading') }}
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
              :error-messages="firstUnloadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceUnloading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointTwo') }}
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
              :error-messages="firstUnloadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceUnloading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointThree') }}
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
              :error-messages="firstUnloadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceUnloading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointFour') }}
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
              :error-messages="firstUnloadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceUnloading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.pointFive') }}
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
              :error-messages="firstUnloadingPointErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="fields.alternate_names"
              item-value="recordid"
              :label="$t('addTransport.selectPlaceUnloading')"
              :placeholder="$t('addTransport.search')"
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
              {{ $t('addTransport.add') }}
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
        :disabled="!valid"
        color="blue-grey darken-3"
        depressed
        @click="nextStep(n)"
      >
        <fa-icon :icon="faArrowAltCircleRight"></fa-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "StepDescDateAndPlace",
        mixins: [validationMixin],
        props: ['n', 'e1', 'setE1', 'steps'],
        data() {
            return {
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
                menu: '',
                menu2: '',
                loadingDateFrom: '',
                loadingDateBy: '',
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
                isLoading: false,
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
                searchCity: '',
                valid: true,
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
        validations: {
            firstLoadingPoint: {
                required
            },
            firstUnloadingPoint: {
                required
            },
            loadingDateFrom: {
                required
            },
            loadingDateBy: {
                required
            }
        },
        computed: {
            faArrowAltCircleRight(){
                return faArrowAltCircleRight
            },

            getInitialTransport() {
                return this.$store.getters['transport/getInitialTransport']
            },

            itemsFirstLoadingPoint() {
                return this.entriesFirstLoadingPoint;
            },

            itemsFirstUnloadingPoint() {
                return this.entriesFirstUnloadingPoint;
            },

            firstLoadingPointErrors() {
                const errors = [];
                if (!this.$v.firstLoadingPoint.$dirty) return errors;
                !this.$v.firstLoadingPoint.required && errors.push('First loading point is required.');

                return errors;
            },

            firstUnloadingPointErrors() {
                const errors = [];
                if (!this.$v.firstUnloadingPoint.$dirty) return errors;
                !this.$v.firstUnloadingPoint.required && errors.push('First unloading point is required.');

                return errors;
            },

            loadingDateFromErrors() {
                const errors = [];
                if (!this.$v.loadingDateFrom.$dirty) return errors;
                !this.$v.loadingDateFrom.required && errors.push('Loading date from is required.');

                return errors;
            },

            loadingDateByErrors() {
                const errors = [];
                if (!this.$v.loadingDateBy.$dirty) return errors;
                !this.$v.loadingDateBy.required && errors.push('Loading date by is required.');

                return errors;
            }
        },
        watch: {
            firstLoadingPoint() {
                if(this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6){
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
                if(this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6){
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
                let checkFilled = false;

                if (this.itemsFirstLoadingPoint.length > 0) {
                    for (let i = 0; i < this.itemsFirstLoadingPoint.length; i++) {
                        if (this.firstLoadingPoint === this.itemsFirstLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFirstPointFrom) return;

                    this.isLoadingFirstPointFrom = true;

                    console.log("FIRST SEARCH", val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFirstLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFirstPointFrom = false))
                }
            },

            searchSecondLoadingPoint(val) {
                let checkFilled = false;

                if (this.entriesSecondLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesSecondLoadingPoint.length; i++) {
                        if (this.secondLoadingPoint === this.entriesSecondLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingSecondPointFrom) return;

                    this.isLoadingSecondPointFrom = true;

                    console.log("SECOND SEARCH", val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesSecondLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingSecondPointFrom = false))
                }
            },

            searchThirdLoadingPoint(val) {
                let checkFilled = false;
                if (this.entriesThirdLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesThirdLoadingPoint.length; i++) {
                        if (this.thirdLoadingPoint === this.entriesThirdLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingThirdPointFrom) return;

                    this.isLoadingThirdPointFrom = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesThirdLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingThirdPointFrom = false))
                }
            },

            searchFourthLoadingPoint(val) {
                let checkFilled = false;
                if (this.entriesFourthLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFourthLoadingPoint.length; i++) {
                        if (this.fourthLoadingPoint === this.entriesFourthLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFourthPointFrom) return;

                    this.isLoadingFourthPointFrom = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFourthLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFourthPointFrom = false))
                }
            },

            searchFifthLoadingPoint(val) {
                let checkFilled = false;
                if (this.entriesFifthLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFifthLoadingPoint.length; i++) {
                        if (this.fifthLoadingPoint === this.entriesFifthLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFifthPointFrom) return;

                    this.isLoadingFifthPointFrom = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFifthLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFifthPointFrom = false))
                }
            },

            searchFirstUnloadingPoint(val) {
                let checkFilled = false;
                if (this.itemsFirstUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.itemsFirstUnloadingPoint.length; i++) {
                        if (this.firstUnloadingPoint === this.itemsFirstUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFirstPointTo) return;

                    this.isLoadingFirstPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFirstUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFirstPointTo = false))
                }
            },

            searchSecondUnloadingPoint(val) {
                let checkFilled = false;
                if (this.entriesSecondUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesSecondUnloadingPoint.length; i++) {
                        if (this.secondUnloadingPoint === this.entriesSecondUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingSecondPointTo) return;

                    this.isLoadingSecondPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesSecondUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingSecondPointTo = false))
                }
            },

            searchThirdUnloadingPoint(val) {
                let checkFilled = false;
                if (this.entriesThirdUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesThirdUnloadingPoint.length; i++) {
                        if (this.thirdUnloadingPoint === this.entriesThirdUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingThirdPointTo) return;

                    this.isLoadingThirdPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesThirdUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingThirdPointTo = false))
                }
            },

            searchFourthUnloadingPoint(val) {
                let checkFilled = false;
                if (this.entriesFourthUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFourthUnloadingPoint.length; i++) {
                        if (this.fourthUnloadingPoint === this.entriesFourthUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFourthPointTo) return;

                    this.isLoadingFourthPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFourthUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFourthPointTo = false))
                }
            },

            searchFifthUnloadingPoint(val) {
                let checkFilled = false;
                if (this.entriesFifthUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFifthUnloadingPoint.length; i++) {
                        if (this.firstUnloadingPoint === this.entriesFifthUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFifthPointTo) return;

                    this.isLoadingFifthPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFifthUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFifthPointTo = false))
                }
            },
        },
        methods:{
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

            nextStep(n) {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                let places = [
                    {
                        cityFrom: this.firstLoadingPoint.fields.name, countryFrom: this.firstLoadingPoint.fields.country,
                        cityTo: this.firstUnloadingPoint.fields.name, countryTo: this.firstUnloadingPoint.fields.country,
                        latFirstPoint: this.firstLoadingPoint.fields.coordinates[0],
                        lngFirstPoint: this.firstLoadingPoint.fields.coordinates[1],
                        latSecondPoint: this.firstUnloadingPoint.fields.coordinates[0],
                        lngSecondPoint: this.firstUnloadingPoint.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.secondLoadingPoint?.fields.name, countryFrom: this.secondLoadingPoint?.fields.country,
                        cityTo: this.secondUnloadingPoint?.fields.name, countryTo: this.secondUnloadingPoint?.fields.country,
                        latFirstPoint: this.secondLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.secondLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.secondUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.secondUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.thirdLoadingPoint?.fields.name, countryFrom: this.thirdLoadingPoint?.fields.country,
                        cityTo: this.thirdUnloadingPoint?.fields.name, countryTo: this.thirdUnloadingPoint?.fields.country,
                        latFirstPoint: this.thirdLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.thirdLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.thirdUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.thirdUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.fourthLoadingPoint?.fields.name, countryFrom: this.fourthLoadingPoint?.fields.country,
                        cityTo: this.fourthUnloadingPoint?.fields.name, countryTo: this.fourthUnloadingPoint?.fields.country,
                        latFirstPoint: this.fourthLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.fourthLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.fourthUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.fourthUnloadingPoint?.fields.coordinates[1]
                    },
                    {
                        cityFrom: this.fifthLoadingPoint?.fields.name, countryFrom: this.fifthLoadingPoint?.fields.country,
                        cityTo: this.fifthUnloadingPoint?.fields.name, countryTo: this.fifthUnloadingPoint?.fields.country,
                        latFirstPoint: this.fifthLoadingPoint?.fields.coordinates[0],
                        lngFirstPoint: this.fifthLoadingPoint?.fields.coordinates[1],
                        latSecondPoint: this.fifthUnloadingPoint?.fields.coordinates[0],
                        lngSecondPoint: this.fifthUnloadingPoint?.fields.coordinates[1]
                    },
                ];

                this.$store.commit('transport/setPlacesTransport', places);

                let transport = {
                    loadingDateFrom: this.loadingDateFrom, loadingDateBy: this.loadingDateBy
                };

                this.$store.commit('transport/setInitialTransport', Object.assign(this.getInitialTransport, transport));

                if (n === this.steps) {
                    this.setE1(1);
                } else {
                    this.setE1(n + 1);
                }
            }
        }
    }
</script>

<style scoped>
  .marg-b {
    float: right;
  }
</style>
