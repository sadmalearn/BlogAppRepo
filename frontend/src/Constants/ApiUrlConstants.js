import { getActivProfile } from "../Profiles/Profiles";
import { ProfileConstant } from "./ProfileConstants";

const baseURL = getActivProfile(ProfileConstant.Dev);

export const Url = {
  registerUser : baseURL + "registerUser",
  login : baseURL + "login",
  getAllBlogs : baseURL + 'getAllBlogs',
  getBlogById : baseURL + 'getBlogbyId/:id',
  addBlogs : baseURL + "addBlogs",
  getLastBlogId : baseURL + "getLastBlogId",
}