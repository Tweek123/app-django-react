import { put, takeEvery, call, all } from 'redux-saga/effects'






export function* watchAuthorization() {
  yield takeEvery('AUTH_USER', requestAuth);
}

export function* watchGetClientData() {
  yield takeEvery('GET_CLIENT_DATA', requestGetClientData);
}

export function* watchGetUsersData() {
  yield takeEvery('GET_USERS_DATA', requestGetUsersData);
}

export function* watchChangeUserData() {
  yield takeEvery('CHANGE_USER_DATA', requestChangeUser);
}

export function* watchRemoveUser() {
  yield takeEvery('REMOVE_USER', requestRemoveUser);
}

export function* watchAddUser() {
  yield takeEvery('ADD_USER', requestAddUser);
}


function* requestAddUser(action) {
  console.log(action);   
try {
const data = yield call(() => {
  return fetch('http://127.0.0.1:8000/addUser/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(action.data) // body data type must match "Content-Type" header
  })
  }
);

} catch (error) {

}
}

function* requestRemoveUser(action) {
  console.log(action);   
try {
const data = yield call(() => {
  return fetch('http://127.0.0.1:8000/removeUser/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(action.data) // body data type must match "Content-Type" header
  })
  }
);

} catch (error) {

}
}

function* requestGetUsersData() {
  
  try {
    const data = yield call(() => {
      return fetch('http://127.0.0.1:8000/getUsersData/')
              .then(res => res.json())
      }
    );
    console.log(data);
    yield put({ type: 'LOAD_USERS_DATA', data: data});
  } catch (error) {

  }
}

function* requestChangeUser(action) {
      console.log(action);   
  try {
    const data = yield call(() => {
      return fetch('http://127.0.0.1:8000/changeUser/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(action.data) // body data type must match "Content-Type" header
      })
      }
    );
    
  } catch (error) {

}
}



function* requestAuth(action) {
    
      try {
        const data = yield call(() => {
          return fetch('http://127.0.0.1:8000/authUser/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(action.data) // body data type must match "Content-Type" header
          }).then(res => {
            
            let status = res.status;
            return new Promise((resolve) => {
                    res.json().then(res => {
                      resolve(
                        {
                          data: res,
                          status:status 
                        })
                    })
                    }) 
            })
          
          .then(res=> {
                  return res;
          })
          }
        );
        

        if(data.status === 200){
            yield put({ type: 'USER_REDIRECT', data: data.data});
        } else {
            yield put({ type: 'LOGIN_ERR'});
        }
        
      } catch (error) {
        console.log('Err');
        yield put({ type: 'LOGIN_ERR'});

  }
}




function* requestGetClientData(action) {
  console.log(action);
  try {
    const data = yield call(() => {
      return fetch('http://127.0.0.1:8000/getClientData/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(
          {
            key: 1,
            timeStart: action.range[0],
            timeEnd: action.range[1]
          }
          
          ) // body data type must match "Content-Type" header
        }).then(res => {

        return res.json() 
        })
      
      .then(data => {
              console.log(data);
      })
      }
    );
  } catch (error) {
    console.log('Err');
    yield put({ type: 'LOGIN_ERR'});

  }
}


export function* rootSaga() {
  yield all([
    watchGetClientData(),
    watchGetUsersData(),
    watchAuthorization(),
    watchChangeUserData(),
    watchRemoveUser(),
    watchAddUser()

  ])
}
