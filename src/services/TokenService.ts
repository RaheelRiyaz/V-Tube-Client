/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_SERVICE } from "./BaseService";
import { TokenRefreshRequest, TokenRefreshResponse } from "../../models/User";
import { NavigateToLogin } from "../shared/components/NavigateToLogin";

export function getAccessToken() {
  const credentials = getCredentials();
  
  if (!credentials?.accessToken) return null;

  const isExpired = isTokenExpired(credentials?.accessToken);
  console.log("is token expired", isExpired);

  if (isExpired) return null;
  return credentials?.accessToken;
}

export function isTokenExpired(token:string) {
  try {
    const [, payloadBase64] = token.split(".");
    const payloadJson = atob(payloadBase64); // Decode base64 payload
    const payload = JSON.parse(payloadJson);

    if (payload && payload.exp) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const expirationTime = payload.exp;

      return expirationTime < currentTimeInSeconds;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

export async function refreshToken(config:any) {
  console.log("inside refresh token");
  try {
    const credentials = getCredentials();
    if (!credentials) throw new Error("No Credentials");

    if (!credentials?.refreshToken)
      throw new Error("Refresh token is not valid");

    const request = new TokenRefreshRequest();
    request.refreshToken = credentials?.refreshToken;

    BASE_SERVICE.Post<TokenRefreshRequest, TokenRefreshResponse>(
      "auth/refresh-token",
      request,
      false
    )
      .then((res) => {
        if (res.isSuccess) {
          savetokens(res.result);
          config.headers.Authorization = `Bearer ${res.result?.accessToken}`;
        } else {
          NavigateToLogin();
        }
      })
      .catch(() => {
        NavigateToLogin();
      });
  } catch (error) {
    NavigateToLogin();
  }
}

export function savetokens(credentials:unknown) {
  localStorage.setItem(
    "v-tube-credentials",
    JSON.stringify(credentials)
  );
}

export function getCredentials() {
  const credentials = localStorage.getItem("v-tube-credentials")
    ? JSON.parse(localStorage["v-tube-credentials"])
    : null;

  return credentials;
}
