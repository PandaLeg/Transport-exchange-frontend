<template>
  <v-container class="mt-4">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        lg="8"
      >
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
                    {{ $t('settings.add') }}
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

              <v-row
                align="start" justify="start"
              >
                <v-col
                  md="2"
                  lg="2"
                >
                  <v-subheader>
                    {{ $t('settings.surname') }}:
                  </v-subheader>
                </v-col>
                <v-col
                  cols="12"
                  md="10"
                  lg="10"
                >
                  <v-text-field
                    v-model="lastName"
                    color="blue-grey lighten-2"
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
                    {{ $t('settings.name') }}:
                  </v-subheader>
                </v-col>
                <v-col
                  cols="12"
                  md="10"
                  lg="10"
                >
                  <v-text-field
                    v-model="firstName"
                    color="blue-grey lighten-2"
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
                    {{ $t('settings.patronymic') }}:
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

              <v-row
                align="start" justify="start"
              >
                <v-col
                  md="2"
                  lg="2"
                >
                  <v-subheader>
                    {{ $t('settings.phone') }}:
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

              <v-row
                align="start" justify="start"
              >
                <v-col
                  md="2"
                  lg="2"
                >
                  <v-subheader>
                    {{ $t('settings.email') }}:
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
              color="primary"
              plain
              @click="updateUser"
            >
              {{ $t('adminPanel.updateBtn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import profilePageAvatar from '../../assets/AllisonProfilePage.jpg'

    export default {
        name: "admin-panel-profile",
        layout: 'admin-bar',
        data() {
            return {
                lastName: '',
                firstName: '',
                patronymic: '',
                phone: '',
                email: '',
                isSelecting: false,
                photoProfile: null,
                photoUrl: '',
                formData: null,
                valid: true
            }
        },
        created() {
            this.filledUser();
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            profilePicture() {
                return this.photoUrl ? this.photoUrl : profilePageAvatar
            }
        },
        methods: {
            filledUser() {
                this.firstName = this.getUser.firstName;
                this.lastName = this.getUser.lastName;
                this.patronymic = this.getUser.patronymic;
                this.phone = this.getUser.phone;
                this.email = this.getUser.email;
                this.photoUrl = this.getUser.profilePicture;
            },

            async updateUser() {
                this.formData = new FormData();
                let checkUpdate = false;

                const personalData = {
                    id: this.getUser.id,
                    lastName: this.lastName,
                    firstName: this.firstName,
                    patronymic: this.patronymic,
                    phone: this.phone,
                    email: this.email
                };

                this.formData.append("photo", this.photoProfile);
                this.formData.append("personalData", new Blob([JSON.stringify(personalData)],
                    {type: "application/json"}));

                await this.$store.dispatch('admin/updatePersonalDataAction', {
                    store: this.$store, formData: this.formData
                }).then(
                    () => {
                        checkUpdate = true;
                    });

                if (checkUpdate) {
                    const token = this.$cookies.get('token');
                    await this.$store.dispatch('getUserAction', token);
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
            }
        }
    }
</script>

<style scoped>

</style>
