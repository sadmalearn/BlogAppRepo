import { getActivProfile } from "../Profiles/Profiles";
import { ProfileConstant } from "./ProfileConstants";

const baseURL = getActivProfile(ProfileConstant.Dev);

export const Url = {
  getAllBlogs : baseURL + 'getAllBlogs',
  getBlogById : baseURL + 'getBlogbyId/:id',
  addBlogs : baseURL + "addBlogs"
}