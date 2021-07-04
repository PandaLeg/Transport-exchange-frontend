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
          {{ $t('addTransport.additionalAndPhotoTitle') }}
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
              {{ $t('addTransport.additional') }}
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
              :label="$t('addTransport.additionalInformation')"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col
            md="12"
            lg="12"
          >
            <v-subheader>
              {{ $t('addTransport.photo') }}
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

        <v-row justify="space-between">
          <v-col
            md="12"
            lg="12"
          >
            <v-subheader>
              {{ $t('view.documentTitle') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="4"
          >
            <v-file-input
              v-model="firstFile"
              chips
              show-size
              truncate-length="15"
            ></v-file-input>
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="4"
          >
            <v-file-input
              v-model="secondFile"
              chips
              show-size
              truncate-length="15"
            ></v-file-input>
          </v-col>
          <v-col
            cols="12"
            md="4"
            lg="4"
          >
            <v-file-input
              v-model="thirdFile"
              chips
              show-size
              truncate-length="15"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue-grey darken-3"
        depressed
        @click="addTransport"
      >
        <span>{{ $t('addTransport.add') }}</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "StepDescPhotoAndAdditional",
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
                firstFile: null,
                secondFile: null,
                thirdFile: null
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

            getInitialTransport() {
                return this.$store.getters['transport/getInitialTransport']
            },

            getPlacesTransport() {
                return this.$store.getters['transport/getPlacesTransport']
            },

            getPropertiesTransport() {
                return this.$store.getters['transport/getPropertiesTransport']
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
                    });
                }
            },

            async addTransport() {
                let transport = Object.assign(this.getInitialTransport, {additional: this.additional});

                let formData = new FormData();

                formData.append("firstPhoto", this.firstPhoto);
                formData.append("secondPhoto", this.secondPhoto);
                formData.append("thirdPhoto", this.thirdPhoto);

                formData.append("fistFile", this.firstFile);
                formData.append("secondFile", this.secondFile);
                formData.append("thirdFile", this.thirdFile);

                formData.append("transport", new Blob([JSON.stringify(transport)],
                    {type: "application/json"}));

                formData.append("placesTransport", new Blob([JSON.stringify(this.getPlacesTransport)],
                    {type: "application/json"}));

                formData.append("propertiesTransport", new Blob([JSON.stringify(this.getPropertiesTransport)],
                    {type: "application/json"}));

                await this.$store.dispatch('transport/addTransportAction', {
                    store: this.$store, formData: formData, userToken: this.getToken
                }).then(
                    () => {
                        this.$router.push(this.localePath('/transport/search-transport'));
                    }
                );
            },
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
