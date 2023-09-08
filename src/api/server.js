const BASE_URL = "https://fakestoreapi.com";

/**
 * FETCH ALL PRODUCTS
 * @returns array of product objects
 */
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error /GET all products!", err);
  }
};

/**
 * LOG-IN USER
 * @param {*} newUser object
 * @returns user object
 */
export const registerUser = async (newUser) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
      }),
    });
    const result = await response.json();
    console.log("registered" + result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

/**
 * LOG-IN USER
 * @param {*} username
 * @param {*} password
 * @returns user object
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log("logged In" + result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
