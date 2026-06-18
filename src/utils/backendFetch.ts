export async function backendFetch(
  url: string,
  accessToken: string,
  options?: RequestInit,
) {
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
  });
}
