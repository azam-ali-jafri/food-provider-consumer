export const fetchUser = () => {
  const user =
    window.localStorage.getItem("user") === "undefined"
      ? null
      : JSON.parse(window.localStorage.getItem("user"));

  return user;
};
