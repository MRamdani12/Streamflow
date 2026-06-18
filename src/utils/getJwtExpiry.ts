export default function getJwtExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // payload.exp is in seconds
    return payload.exp ?? null;
  } catch (error) {
    console.error("Error when parsing JWT expiry date: " + error);
    return null;
  }
}
