const BASE_URL = "http://localhost:8080";

/**
 * REGISTER USER
 * @param {*} user object
 * @returns user object
 */
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error /POST user object!", err);
  }
};

/**
 * LOG-IN USER
 * @param {*} user object
 * @returns user object
 */
export const loginUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error /POST user login object!", err);
  }
};
