
import { httpService } from "./http.service.js"
export const userService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByToken,
}
const withToken= true

async function getUsers(filterBy, element) {
  console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  let url = "users/getusers";
  if (filterBy && element) {
    url += `/?${filterBy}=${element}`;
  }
  const response = await httpService.get(url);
  console.log(response);
  return response;
}

async function getUserById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

async function getUserByToken() {
  const user = await httpService.get(`users/token` ,null, withToken)
  return user
}

async function updateUser(user) {
  console.log('service',user);
  const savedUser = await httpService.patch(`users/updateMe`, user)

  return savedUser
}
async function deleteUser(user) {
  console.log('service',user);
  const savedUser = await httpService.delete(`/users/deleteMe`, user)
  return savedUser
}



