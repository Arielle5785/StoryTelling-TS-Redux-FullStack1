export const retryFailedRequest = async (originalRequest, refreshEndpoint, dispatch) => {
  try {
    const refreshResponse = await fetch(refreshEndpoint, {
      method: 'POST',
      credentials: 'include', // Include HTTP-only refresh token
    });

    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      dispatch(setAccessToken(accessToken));

      // Update the original request with the new token
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      const retryResponse = await fetch(originalRequest.url, originalRequest);
      return retryResponse;
    } else {
      throw new Error('Unable to refresh token.');
    }
  } catch (err) {
    console.error('Failed to retry request:', err);
    throw err;
  }
};
