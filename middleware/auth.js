const API_URL = 'http://localhost:9090/auth/';

export default function ({store, redirect, $axios}) {
  let user = store.state.initialState.user;
  let hasToken = store.getters['hasToken'];
  if (user) {
    $axios.post(API_URL + 'validate-user', {}, {params: {token: user.token}}).then(response => {
      console.log('Validate user', response.data);
      console.log('TRUE REQUEST');
      store.commit('loginSuccess', user);

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
