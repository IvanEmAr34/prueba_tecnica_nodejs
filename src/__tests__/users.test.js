import userService from "../app/services/userService";
const dataSet = [
  [
    {
      _id: null,
      roles: [],
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    false,
  ],
  [
    {
      _id: null,
      roles: [],
      name: "some",
      userName: "value",
      password: "",
      confirmPassword: "",
      email: "",
    },
    false,
  ],
  [
    {
      _id: null,
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password",
      confirmPassword: "not equal password",
      email: "mail",
    },
    false,
  ],
  [
    {
      _id: null,
      roles: ["admin"],
      name: "name test",
      userName: "username test",
      password: "password123",
      confirmPassword: "password123",
      email: "mail",
    },
    true,
  ],
];
describe("userService", () => {
  test.each(dataSet)("Validatse payload", (userInfo, expected) => {
    expect(userService.validatePayload(userInfo)).toBe(expected);
  });
});
