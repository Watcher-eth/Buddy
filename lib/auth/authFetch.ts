import { getToken } from './index';

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getToken();
  const headers = {
    ...(init.headers ?? {}),
    Authorization: token ? `Bearer ${token}` : '',
  };
  return fetch(input, { ...init, headers });
}
