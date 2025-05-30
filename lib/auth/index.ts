import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';

const API_BASE = process.env.API_BASE_URL ?? 'https://api.yourdomain.com';

export async function signInWithApple() {
  // 1) Prompt Apple login
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  // 2) Build payload (Apple only sends name/email once)
  const body = {
    identityToken: credential.identityToken!,
    fullName: credential.fullName
      ? `${credential.fullName.givenName ?? ''} ${credential.fullName.familyName ?? ''}`.trim()
      : null,
    email: credential.email ?? null,
  };

  // 3) Send to our backend
  const res = await fetch(`${API_BASE}/auth/apple`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Authentication failed');

  const { token } = await res.json() as { token: string };

  // 4) Store JWT securely
  await SecureStore.setItemAsync('app_jwt', token);
  return token;
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync('app_jwt');
}

export async function signOut() {
  await SecureStore.deleteItemAsync('app_jwt');
}
