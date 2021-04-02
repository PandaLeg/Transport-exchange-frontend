export default function authHeader(store) {
  let user = store.state.initialState.user;

  if (user && user.token) {
    return {Authorization: 'Bearer ' + user.token}
  } else {
    return {};
  }
}
