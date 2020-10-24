
let initState = {
  userInfo: null,
  isLogin: false
};

if (sessionStorage.getItem("store")){
  initState = JSON.parse(sessionStorage.getItem("store"));
}

export function reducer(state = initState, action) {

  let newState = JSON.parse(JSON.stringify(state));

  if (action.type === 'changeUserInfo'){
    newState.userInfo = action.value;
    console.log("newState", newState);
  }

  if (action.type === 'changeLoginState'){
    newState.isLogin = action.value;
    console.log("newState", newState);
  }

  sessionStorage.setItem("store", JSON.stringify(newState));

  return newState;
}
