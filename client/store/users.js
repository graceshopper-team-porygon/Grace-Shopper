import axios from "axios";

const ALL_USERS = "ALL_USERS";
const DELETE_USER = "DELETE_USER";
const CLEAR_USERS = "CLEAR_USERS";
const TOKEN = "token";

const allUsers = (users) => {
  return {
    type: ALL_USERS,
    users,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const clearUsers = () => {
  return {
    type: CLEAR_USERS,
  };
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get("/api/users", {
        headers: { authorization: token },
      });
      dispatch(allUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchDeleteUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.delete(`/api/users/${id}`, {
        headers: { authorization: token },
      });
      dispatch(deleteUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function allUsersReducer(state = [], action) {
  switch (action.type) {
    case ALL_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    case CLEAR_USERS:
      return [];
    default:
      return state;
  }
}
