import AuthService from '../service/auth.service'

const cookieparser = process.server ? require('cookieparser') : undefined;

const API_URL_AUTH = 'http://localhost:9090/auth/';
const API_USER_URL = 'http://localhost:9090/user/';
const API_URL = 'http://localhost:9090/';

export const state = () => ({
  initialState: {
    loggedIn: false,
    user: null,
    token: null,
  },
  countCargo: 0,
  countTransports: 0
});

export const mutations = {
  loginSuccess(state, token) {
    state.initialState.loggedIn = true;
    state.initialState.token = token;
  },

  setUser(state, user) {
    state.initialState.user = user;
    console.log("Set User", user);
  },

  loginFailure(state) {
    state.initialState.loggedIn = false;
    state.initialState.user = null;
  },

  logout(state) {
    state.initialState.loggedIn = false;
    state.initialState.user = null;
  },

  setCountCargo(state, data){
    state.countCargo = data;
  },

  setCountTransports(state, data){
    state.countTransports = data;
  }
};

export const actions = {
  async nuxtServerInit({commit, dispatch}, {req}) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        token = JSON.parse(parsed.token);
        console.log(token);
      } catch (err) {
        // No valid cookie found
      }
    }

    if (token) {
      await dispatch('getUserAction', token);
      console.log("nuxtServerInit");
      commit('loginSuccess', token)
    }
  },

  async login({commit, app}, user) {
    const response = await this.$axios.post(API_URL_AUTH + 'sign-in-user', {
      email: user.email,
      password: user.password
    });

    const data = await response.data;

    console.log("DATA AUTH", data);
    if (data) {
      this.$cookies.set('token', JSON.stringify(data), {
        path: '/',
        maxAge: 86400
      });
    }

    if (data) {
      commit('loginSuccess', data);
      return Promise.resolve(data);
    } else {
      commit('loginFailure');
      return Promise.reject(error);
    }
  },

  logout({commit}) {
    this.$cookies.remove('token', {
      path: '/'
    });
    commit('logout');
  },

  async getUserAction({commit}, token) {
    const response = await this.$axios.get(API_USER_URL + 'get-user', {params: {jwtToken: token}});

    const data = await response.data;

    if (data) {
      commit('setUser', data)
    }
  },

  async getCountCargoAndTransportsAction({commit}) {
    const response = await this.$axios.get(API_URL + 'get-count-cargo-transports');
    const data = await response.data;

    if (data) {
      commit('setCountCargo', data.countCargo);
      commit('setCountTransports', data.countTransports);
    }
  }
};

export const getters = {
  hasToken: state => state.initialState.loggedIn,
  getUser: state => state.initialState.user,
  getToken: state => state.initialState.token,
  getCountCargo: state => state.countCargo,
  getCountTransports: state => state.countTransports,
};
