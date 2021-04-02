import authHeader from '../service/auth-header'

const API_URL = 'http://localhost:9090/test/';


export const state = () => ({
  userContent: ''
});

export const mutations = {
  userContentMutation(state, string) {
    state.userContent = string;
  }
};

export const actions = {
  async userContentAction({commit}, store) {
    try {
      const response = await this.$axios.get(API_URL + 'admin', {headers: authHeader(store)});
      const data = await response.data;
      console.log("userContent", data);
      commit('userContentMutation', data);
    } catch (err) {
      console.log(err);
      commit('userContentMutation', '')
    }
  }
};

export const getters = {
  userContent: state => state.userContent
};
