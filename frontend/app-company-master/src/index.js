import "babel-polyfill"
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createStore,combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, Switch} from "react-router-dom";
import  HomePage  from "../src/components/pages/homePage";
import  statisticsPage  from "../src/components/pages/statisticsPage"
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import {rootSaga} from './sagas/sagas'
import './css/main.css'
import  UsersPage  from "../src/components/pages/usersPage";

function homePage() {  

  return <HomePage/>
}



const initialState = {
  users: [],
  clientData: new Object,
  user: {admin: false},
  loggedIn: false,
  modalUser: {
    open: false,
    type: "CHANGE",
    data: {}
  },
  errors: {
    loginError: false
  }
}


let foundIndex, newUser, emptyUser;
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":  
       newUser =  Object.assign({},action.data);
       state.users.push(newUser);
       state.modalUser.open = false;
    return { ...state, users: [...state.users],modalUser: state.modalUser};
    case "REMOVE_USER":  
      foundIndex = state.users.findIndex(element => element.username===action.data.username);
      state.users.splice(foundIndex, 1);
    return { ...state, users: [...state.users]};

    case "REFRESH_USERS":     
      
      return { ...state, users: [...state.users]};
    case "ADD_COMMENT":     

        const formMessage = action.formMessage;
        const comment = new Object;
        
        comment.title = formMessage.title.value;
        comment.message = formMessage.comment.value;
        comment.phone = formMessage.phone.value; 
        state.users[action.id].comments.push(comment);

      return { ...state, users: [...state.users]};

      case "GET_USERS":
 
      return { ...state, users: [...state.users]};

      case "REF_USERS":

      state.users = [...action.data];
            
      return { ...state, users: [...state.users]};  

      case "LOAD_CLIENT_DATA":
    

      return { ...state, clientData: action.data};  

      case "GET_CLIENT_DATA":
      

      return { ...state, clientData: state.clientData};  

      case "AUTH_USER":
    
  
      return { ...state};
      
      case "USER_REDIRECT":

      state.errors.loginError = false;
      return { ...state, user: action.data, loggedIn: true, errors: Object.assign({},state.errors) };
      
      case "LOGIN_ERR":
      
      state.errors.loginError = true;
      return { ...state, errors: Object.assign({},state.errors)};
      
      
      case "GET_USERS_DATA":
      
      console.log('GET_USERS_DATA');
  
      return { ...state};

      case "LOAD_USERS_DATA":
      
        console.log('LOAD_USERS_DATA');
        console.log(action.data);
      return { ...state, users: action.data};

      case "LOG_OUT":

      emptyUser = {
          admin: false
      } 

      return { ...state, user: emptyUser, loggedIn: false };

      case "CHANGE_USER":
      
      return { ...state};

      case "OPEN_MODAL_USER":
      
       state.modalUser = {
          open: true,
          data: action.data.form,
          type: action.data.type
        }
 
      return { ...state, modalUser: state.modalUser};
      
      case "CLOSE_MODAL_USER":
      
      state.modalUser = {
        open: false,
        data: {}
      }
      
      return { ...state, modalUser: state.modalUser};

      case "CHANGE_USER_DATA":
        foundIndex = state.users.findIndex(element => element.username===action.data.User.data.username);
        state.users[foundIndex]=action.data.newUser; 
        state.modalUser.data=action.data.newUser;
        return { ...state, modalUser: state.modalUser, users: [...state.users]};
      
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    reducer: reducer,
    routing: routerReducer,
  }),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(createHistory(), store);


ReactDOM.render((    

    <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={homePage}>
            </Route>
            <Route exact path="/users" component={UsersPage}/>
            <Route path="/statistics" component={statisticsPage}/>
          </Switch> 
        </Router>
    </Provider>

    ), document.getElementById('root'))

    