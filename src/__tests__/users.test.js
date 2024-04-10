import { validatePayload } from "@/app/services/userService";

describe("userService", () => {
  test("Validate payload", () => {
    let isValid = null;
    isValid = validatePayload({
      _id: null,
      roles: [],
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
    expect(isValid).toBe(false);
  });
});
