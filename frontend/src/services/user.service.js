
import { httpService } from "./http.service.js"
export const userService = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByToken,
}
const withToken= true

async function getUsers(num) {
  try {
    const users = await httpService.get(`user`)
    return users[num]
  } catch (err) {
    console.log("Cannot Get users from service", err)
    throw err
  }
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



