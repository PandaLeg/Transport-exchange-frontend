<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        flat
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="redirectSettings"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-row justify="center">
        <v-col lg="8">
          <v-card class="text-center">
            <v-row no-gutters align="center" justify="center">
              <v-col
                cols="12"
                md="12"
                lg="12"
              >
                <v-img
                  class="background-image"
                  max-height="800"
                  :src="profilePicture"
                  aspect-ratio="2"
                  contain
                >
                </v-img>
              </v-col>
              <v-col
                class="mt-5"
                cols="12"
                md="12"
                lg="12"
              >
                <v-btn
                  plain
                  :loading="isSelecting"
                  @click="onLoadingPhoto"
                >
                  Добавить
                </v-btn>
                <input
                  ref="image"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                >
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                plain
                @click="closeDialog"
              >
                Отменить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        name: "edit-background",
        data() {
            return {
                isSelecting: false,
                photoBackgroundProfile: null,
                photoUrl: '',
                formData: null,
                valid: true,
                dialog: true
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            getToken() {
                return this.$store.getters['getToken']
            },

            profilePicture() {
                return this.photoBackgroundProfile ? this.photoUrl : 'https://picsum.photos/510/300?random'
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
            closeDialog() {
                this.$router.push('/profile/settings')
            },

            async redirectSettings() {
                this.formData = new FormData();
                let checkUpdate = false;

                this.formData.append("photoBackground", this.photoBackgroundProfile);

                await this.$store.dispatch('settings/updateBackgroundProfileAction', {
                    store: this.$store, formData: this.formData, user: this.getUser, token: this.getToken
                })
                    .then(
                        () => {
                            this.$store.commit('loginSuccess', this.getToken);
                            checkUpdate = true;
                        }, error => {
                            console.log(error);
                        }
                    );

                if (checkUpdate) {
                    const token = this.$cookies.get('token');
                    await this.$store.dispatch('getUserAction', token)
                        .then(
                            () => {
                                this.$router.push('/profile/settings')
                            }, error => {
                                console.log(error);
                            }
                        );
                }
            },

            onLoadingPhoto() {
                this.isSelecting = true;
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {once: true});

                this.$refs.image.click()
            },

            onFileChanged(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    if (files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);

                    fr.addEventListener('load', () => {
                        this.photoUrl = fr.result;
                        this.photoBackgroundProfile = files[0];
                        console.log("SELECTED 1", this.photoBackgroundProfile);
                    });
                }
            },

        }
    }
</script>

<style scoped>
  .background-image {
    border-radius: 5px;
    background: center no-repeat;
    background-size: cover;
  }
</style>
