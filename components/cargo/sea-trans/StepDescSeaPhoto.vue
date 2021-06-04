<template>
  <v-card
    dark
    v-if="n === 3"
  >
    <v-row
      class="pa-4"
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <h3 class="headline">
          {{ $t('addCargo.additionalAndPhoto') }}
        </h3>
      </v-col>
    </v-row>

    <v-form>
      <v-container>
        <v-row>
          <v-col
            md="12"
            lg="12"
          >
            <v-subheader>
              {{ $t('addCargo.additional') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="12"
            lg="12"
          >
            <v-textarea
              v-model="additional"
              filled
              name="input-7-4"
              :label="$t('addCargo.additionalInformation')"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col
            md="12"
            lg="12"
          >
            <v-subheader>
              {{ $t('addCargo.photo') }}
            </v-subheader>
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
      </v-container>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue-grey darken-3"
        depressed
        @click="nextStep(n)"
      >
        <span>{{ $t('addCargo.add') }}</span>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
    import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "StepDescPhoto",
        props: ['n', 'e1', 'setE1', 'steps'],
        data() {
            return {
                additional: '',
                listPhoto: [],
                isSelecting: false,
                firstPhoto: null,
                firstImageUrl: '',
                secondPhoto: null,
                secondImageUrl: '',
                thirdPhoto: null,
                thirdImageUrl: '',
                formData: null
            }
        },
        computed: {
            faArrowAltCircleRight() {
                return faArrowAltCircleRight
            },

            getUser() {
                return this.$store.getters['getUser']
            },

            getToken() {
                return this.$store.getters['getToken']
            },

            getInitialCargo() {
                return this.$store.getters['cargo/getInitialCargo']
            },

            getPlacesCargo() {
                return this.$store.getters['cargo/getPlacesCargo']
            },

            getPropertiesCargo() {
                return this.$store.getters['cargo/getPropertiesCargo']
            },

            urlFirstPhoto() {
                return this.firstPhoto ? this.firstImageUrl : 'https://picsum.photos/510/300?random'
            },

            urlSecondPhoto() {
                return this.secondPhoto ? this.secondImageUrl : 'https://picsum.photos/510/300?random'
            },

            urlThirdPhoto() {
                return this.thirdPhoto ? this.thirdImageUrl : 'https://picsum.photos/510/300?random'
            }
        },

        methods: {
            async nextStep(n) {
                Object.assign(this.getInitialCargo, {additional: this.additional});

                this.formData = new FormData();
                this.formData.append("firstPhoto", this.firstPhoto);
                this.formData.append("secondPhoto", this.secondPhoto);
                this.formData.append("thirdPhoto", this.thirdPhoto);
                this.formData.append("cargo", new Blob([JSON.stringify(this.getInitialCargo)],
                    {type: "application/json"}));

                this.formData.append("placesCargo", new Blob([JSON.stringify(this.getPlacesCargo)],
                    {type: "application/json"}));

                this.formData.append("propertiesCargo", new Blob([JSON.stringify(this.getPropertiesCargo)],
                    {type: "application/json"}));

                await this.$store.dispatch('cargo/addCargoAction', {
                    store: this.$store, formData: this.formData,
                    userToken: this.getToken, typeTransportation: 'seaTransportation'
                }).then(
                    () => {
                        this.$router.push(this.localePath('/cargo/search-cargo'));
                    }
                );
            },

            onLoadingPhoto() {
                this.isSelecting = true;
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {once: true});

                this.$refs.image.click()
            },

            onFirstFileChanged(e) {
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
                        console.log("SELECTED 1", this.firstPhoto);
                    });
                }
            },

            onSecondFileChanged(e) {
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
                        console.log("SELECTED 2", this.secondPhoto);
                    });
                }
            },

            onThirdFileChanged(e) {
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
                        console.log("SELECTED 3", this.thirdPhoto);
                    });
                }
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
