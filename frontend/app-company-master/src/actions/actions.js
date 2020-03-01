export const addComment = (form, id) => ({ type: "ADD_COMMENT", formMessage: form, id: id});
export const refUsers = () => ({ type: "REF_USERS" });
export const getUsers = () => ({ type: "GET_USERS" });
export const refreshUsers = () => ({ type: "REFRESH_USERS"});
export const getClientData = () => ({ type: "GET_CLIENT_DATA" });
export const loadClientData = () => ({type: "LOAD_CLIENT_DATA"});
export const authorization = (data) => ({type: "AUTH_USER", data: data});
export const redirect = () => ({type: "USER_REDIRECT"});
export const loginerr = () => ({type: "LOGIN_ERR"});
export const logout = () => ({type: "LOG_OUT"});
export const getUsersData = () => ({type: "GET_USERS_DATA"});
export const loadUsersData = () => ({type: "LOAD_USERS_DATA"});
export const openModalUser = (data) => ({type: "OPEN_MODAL_USER", data: data})
export const closeModalUser = () => ({type: "CLOSE_MODAL_USER"})
export const changeUserData = (data) => ({type: "CHANGE_USER_DATA", data: data})
export const addUser = (data) => ({type: "ADD_USER", data: data})
export const removeUser = (data) => ({type: "REMOVE_USER", data: data})
