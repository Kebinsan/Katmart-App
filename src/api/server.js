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
 * FETCH SINGLE PRODUCT
 * @returns single product object
 */
export const fetchProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error /GET single product!", err);
  }
};

/**
 * FETCH ALL CATEGORIES
 * @returns array of category objects
 */
export const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error /GET all categories!", err);
  }
};

/**
 * REGISTER USER
 * @param {*} user object
 * @returns user object
 */
export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
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
    const response = await fetch(`${BASE_URL}/auth/login`, {
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

/**TODO
 * FETCH USER DATA
 * @param {*} token
 * @returns array of user data
 */
export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("Error /GET user data!", err);
  }
};
