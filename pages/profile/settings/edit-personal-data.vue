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
            Сохранить
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-row justify="center">
        <v-col lg="8">
          <v-card class="text-center">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card-title></v-card-title>
              <v-container>
                <v-row no-gutters align="center" justify="center">
                  <v-col
                    cols="12"
                    md="12"
                    lg="12"
                  >
                    <v-avatar
                      class="avatar-profile-and-name"
                      size="150"
                    >
                      <v-img
                        :src="profilePicture"
                      >
                      </v-img>
                    </v-avatar>
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

                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Фамилия:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="surname"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Имя:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="name"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Отчество:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="patronymic"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Мобильный телефон:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="phone"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Эл. почта:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="email"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
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
    import {faUserEdit} from '@fortawesome/free-solid-svg-icons'
    import profilePageAvatar from '../../../assets/AllisonProfilePage.jpg'

    export default {
        name: "edit-personal-data",
        data() {
            return {
                surname: '',
                name: '',
                patronymic: '',
                phone: '',
                email: null,
                isSelecting: false,
                photoProfile: null,
                photoUrl: '',
                formData: null,
                valid: true,
                dialog: true
            }
        },
        created() {
            this.surname = this.getUser.lastName;
            this.name = this.getUser.firstName;
            this.patronymic = this.getUser.patronymic;
            this.phone = this.getUser.phone;
            this.email = this.getUser.email;
            this.photoUrl = this.getUser.profilePicture ? this.getUser.profilePicture : profilePageAvatar
        },
        computed: {
            faUserEdit() {
                return faUserEdit
            },

            getUser() {
                return this.$store.getters['getUser']
            },

            getToken() {
                return this.$store.getters['getToken']
            },

            profilePicture() {
                return this.photoUrl
            },
        },
        methods: {
            closeDialog() {
                this.$router.push('/profile/settings')
            },

            async redirectSettings() {
                this.formData = new FormData();
                let checkUpdate = false;

                const personalData = {
                    id: this.getUser.id,
                    lastName: this.surname,
                    firstName: this.name,
                    patronymic: this.patronymic,
                    phone: this.phone,
                    email: this.email
                };

                this.formData.append("photo", this.photoProfile);
                this.formData.append("personalData", new Blob([JSON.stringify(personalData)],
                    {type: "application/json"}));

                await this.$store.dispatch('settings/updatePersonalDataAction', {
                    store: this.$store, formData: this.formData, user: this.getUser
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
                        this.photoProfile = files[0];
                        console.log("SELECTED 1", this.photoProfile);
                    });
                }
            },
        }
    }
</script>

<style scoped>
  .avatar-profile-and-name {
    text-align: center;
  }
</style>
