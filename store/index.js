import AuthService from '../service/auth.service'

const cookieparser = process.server ? require('cookieparser') : undefined;

const API_URL = 'http://localhost:9090/auth/';

export const state = () => ({
  initialState: {
    loggedIn: false,
    user: null
  }
});

export const mutations = {
  loginSuccess(state, user) {
    state.initialState.loggedIn = true;
    state.initialState.user = user;

    console.log("LOGINSUCCES", user);
  },

  loginFailure(state) {
    state.initialState.loggedIn = false;
    state.initialState.user = null;
  },

  logout(state) {
    state.initialState.loggedIn = false;
    state.initialState.user = null;
  }
};

export const actions = {
  nuxtServerInit({commit}, {req}) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
        console.log(user);
      } catch (err) {
        // No valid cookie found
      }
    }
    if (user) {
      console.log("nuxtServerInit");
      commit('loginSuccess', user)
    }
  },

  async login({commit, app}, user) {
    const response = await this.$axios.post(API_URL + 'sign-in-user', {
      email: user.email,
      password: user.password
    });

    const data = await response.data;

    console.log(data);
    if (data.token) {
      this.$cookies.set('user', JSON.stringify(data), {
        path: '/',
        maxAge: 86400
      })
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
    this.$cookies.remove('user', {
      path: '/'
    });
    this.$cookies.remove('user', {
      path: '/profile/settings'
    });
    commit('logout');
  }
};

export const getters = {
  hasToken: state => state.initialState.loggedIn,
  getUser: state => state.initialState.user
};
