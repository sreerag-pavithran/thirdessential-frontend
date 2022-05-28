import { combineReducers } from "redux";
import admin from "./admin";
import dashboard from "./dashboard";
import user from "./user";

export default combineReducers({
  admin,
  dashboard,
  user,
});
