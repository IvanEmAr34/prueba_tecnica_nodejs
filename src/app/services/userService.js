const serverHost = process.env.API_URL ?? "http://127.0.0.1:8000";
const headers = {
  "Content-Type": "application/json",
};
export const validatePayload = (userInfo) => {
  let isValidForm = !Object.keys(userInfo).some((userInfoKey) => {
    return (
      userInfoKey !== "_id" &&
      (!userInfo[userInfoKey] ||
        userInfo[userInfoKey] === "" ||
        userInfo[userInfoKey].length === 0)
    );
  });
  return isValidForm;
};
const userService = {
  getUsers: async () => {
    const response = await fetch(`${serverHost}/api/users`, {
      method: "GET",
      headers,
    });
    return await response.json();
  },
  addUser: async (body) => {
    const response = await fetch(`${serverHost}/api/users`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  updateUser: async (userId, body) => {
    const response = await fetch(`${serverHost}/api/users/${userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  getUser: async (userId) => {
    const response = await fetch(`${serverHost}/api/users/${userId}`, {
      method: "GET",
      headers,
    });
    return await response.json();
  },
  validatePayload,
};
export default userService;
