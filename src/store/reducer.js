import {ActionTypes} from "./action-types";

let initState = {
  userInfo: null,
  isLogin: false,
  name: "AlanLee"
};

if (sessionStorage.getItem("store")){
  initState = JSON.parse(sessionStorage.getItem("store"));
}

export function reducer(state = initState, action) {

  let newState = JSON.parse(JSON.stringify(state));

  if (action.type === ActionTypes.user.UPDATE_USER_INFO){
    newState.userInfo = action.value;
    console.log("newState", newState);
  }

  if (action.type === ActionTypes.user.UPDATE_LOGIN_STATE){
    newState.isLogin = action.value;
    console.log("newState", newState);
  }

  if (action.type === 'updateName'){
    newState.name = action.value;
    console.log("newState", newState);
  }

  sessionStorage.setItem("store", JSON.stringify(newState));

  return newState;
}
