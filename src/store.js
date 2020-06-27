import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import sidebar from './containers/slice'
import auth  from './views/pages/login/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const initialState = {
  sidebarShow: 'responsive'
}
const reducers = combineReducers(
  {
    auth,
    sidebar,
  }
)
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};
const changeState = (state = initialState, { type, ...rest }) => {
  console.log("Change state")
  console.log(type)
  console.log(rest)
  
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
 // if (action.type === "auth/logout") {
 //   state = undefined;
 // }

  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const store = createStore(changeState)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})
export default store