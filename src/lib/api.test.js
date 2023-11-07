import { describe, it, expect, beforeEach, vi } from "vitest";
import { loginUser, logoutUser } from "./api";

// Mocking localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mocking fetch
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          accessToken: "fake_token",
          email: "test@example.com",
        }),
    }),
  ),
);

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

describe("userAuth", () => {
  it("loginUser stores token on successful login", async () => {
    const data = await loginUser({
      email: "test@example.com",
      password: "password",
    });

    expect(data.accessToken).toBe("fake_token");
    expect(localStorage.getItem("jwt")).toBe("fake_token");
    expect(localStorage.getItem("user_email")).toBe("test@example.com");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("logoutUser clears the token from localStorage", () => {
    // Først, "logg inn" en bruker
    localStorage.setItem("jwt", "fake_token");
    localStorage.setItem("user_email", "test@example.com");

    // Nå, logg ut brukeren
    logoutUser();

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(localStorage.getItem("user_email")).toBeNull();
  });
});
