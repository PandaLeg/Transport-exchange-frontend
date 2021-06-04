import authHeader from "../service/auth-header";

const API_USER = 'http://localhost:9090/user/';

export const state = () => ({});

export const mutations = {};

export const actions = {
  async updatePersonalDataAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_USER + 'edit-personal-data', body.formData,
      {
        headers: Object.assign(authHeader(body.store), {"Content-Type": undefined}),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  },

  async updateBackgroundProfileAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_USER + 'edit-background-profile', body.formData,
      {
        headers: Object.assign(authHeader(body.store), {"Content-Type": undefined}),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER', jwt: body.token}
      });
    const data = await response.data;

    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  },

  async updatePasswordAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.put(API_USER + 'edit-password', body.personalData,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'}
      });
    const data = await response.data;

    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  },
};

export const getters = {};
