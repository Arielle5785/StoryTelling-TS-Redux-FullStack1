export const authHeader = (accessToken) => {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};
