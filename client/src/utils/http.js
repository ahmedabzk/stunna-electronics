import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const server_url = import.meta.env.VITE_SERVER_URL;
console.log(server_url);

export const fetchData = async (url) => {
  const res = await fetch(`${server_url}/api/v1/product/get/${url}`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    return error;
  }

  const products = await res.json();
  
  return products;
};

export const register = async (formData) => {
  const res = await fetch(`${server_url}/api/v1/auth/sign-up`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const error = new Error("failed to create user");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const response = await res.json();
  return response;
};

export const fetchLogin = async (formData) => {
  const res = await fetch(`${server_url}/api/v1/auth/sign-in`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData)
  });
  if (!res.ok) {
    const error = new Error("could not login");
    error.code = res.statusCode;
    error.info = await res.json();
    // console.log(error);
    throw error;
  }

  const data = await res.json();
  return data;
};

 export const fetchLogOut = async () => {
   const res = await fetch(`${server_url}/api/v1/auth/logout`, {
     method: "POST",
     headers: {
       "content-type": "application/json",
     },
     credentials: "include",
   });

   if (!res.ok) {
     const error = new Error("could not login");
     error.code = res.statusCode;
     error.info = await res.json();
     throw error;
   }

   const data = await res.json();
   return data;
 }

export const UpdateUserProfile = async (id, formData) => {
  const res = await fetch(`${server_url}/api/v1/user/update/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const error = new Error("failed to update user profile");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const data = await res.json();
  
  return data;


}

export const createProduct = async (formData) => {
  const res = await fetch(`${server_url}/api/v1/admin/create/product`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const error = new Error("failed to create user");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }
  const response = await res.json();
  return response;
};

export const fetchProductsByBrand = async (brand) => {
  const res = await fetch(`${server_url}/api/v1/product/get/${brand}`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const products = await res.json();
  console.log(products);

  return products;
};


export const fetchProductsByBrandWithLimit = async (brand) => {
  const res = await fetch(
    `${server_url}/api/v1/product/get/brand?brand=${brand}`
  );

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const products = await res.json();
  console.log(products);

  return products;
};

export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${server_url}/api/v1/product/get/${category}`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const products = await res.json();

  return products;
};


export const fetchAllProducts = async () => {
  const res = await fetch(`${server_url}/api/v1/admin/products/all`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const products = await res.json();

  return products;
};

export const editProduct = async (id, formData) => {
  const res = await fetch(`${server_url}/api/v1/admin/products/update/${id}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const error = new Error("failed to update user profile");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const data = await res.json();

  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`${server_url}/api/v1/admin/products/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error = new Error("failed to update user profile");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const data = await res.json();

  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${server_url}/api/v1/admin/products/delete/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = new Error("failed to update user profile");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const data = await res.json();

  return data;
};

export const fetchAllUsers = async () => {
  const res = await fetch(`${server_url}/api/v1/admin/users/all`);

  if (!res.ok) {
    const error = new Error("failed to fetch different items");
    error.code = res.statusCode;
    error.info = await res.json();
    throw error;
  }

  const users = await res.json();

  return users;
};
