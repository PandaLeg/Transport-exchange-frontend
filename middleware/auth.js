const API_URL = 'http://localhost:9090/auth/';

export default function ({store, redirect, $axios}) {
  let token = store.state.initialState.token;
  let hasToken = store.state.initialState.loggedIn;
  if (token) {
    $axios.post(API_URL + 'validate-user', {}, {params: {token: token}}).then(response => {
      console.log('Validate user', response.data);
      console.log('TRUE REQUEST');
      store.commit('loginSuccess', token);

    }, error => {
      console.log('FALSE REQUEST');
      store.dispatch('logout');

      redirect('/authentication');
    });
  } else {
    console.log("ШАГ 4");
    redirect('/authentication')
  }
}
