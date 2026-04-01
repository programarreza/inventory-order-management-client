import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (key: any, value: any, options = {}) => {
  cookies.set(key, value, {
    path: "/", // Makes the cookie accessible throughout the app
    secure: false, // Use secure cookies in production
    ...options,
  });
};
