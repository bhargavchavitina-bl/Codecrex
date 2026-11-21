export function mapAuthError(error: unknown): string {
  if (!error) return "An unexpected error occurred. Please try again.";

  const err = error as { message?: string; code?: string; status?: number; error_description?: string };
  const rawMsg = (err.message || err.error_description || String(error)).toLowerCase();
  const code = (err.code || "").toLowerCase();

  if (
    code === "invalid_credentials" ||
    rawMsg.includes("invalid login credentials") ||
    rawMsg.includes("invalid username or password")
  ) {
    return "Incorrect email or password. Please verify your credentials and try again.";
  }

  if (
    code === "email_not_confirmed" ||
    rawMsg.includes("email not confirmed")
  ) {
    return "Your email address has not been confirmed. Please check your inbox or click 'Resend confirmation email'.";
  }

  if (
    code === "user_already_exists" ||
    rawMsg.includes("user already registered") ||
    rawMsg.includes("already registered")
  ) {
    return "An account with this email address already exists. Please log in instead.";
  }

  if (
    code === "weak_password" ||
    rawMsg.includes("password should be at least") ||
    rawMsg.includes("password is too short")
  ) {
    return "Password is too weak. Please choose a password with at least 6 characters.";
  }

  if (
    code === "over_email_send_rate_limit" ||
    code === "over_request_rate_limit" ||
    rawMsg.includes("rate limit") ||
    err.status === 429
  ) {
    return "Too many requests. Please wait a few moments before trying again.";
  }

  if (
    rawMsg.includes("network") ||
    rawMsg.includes("failed to fetch") ||
    rawMsg.includes("connection refused")
  ) {
    return "Network error. Please check your internet connection and try again.";
  }

  if (
    code === "email_address_invalid" ||
    rawMsg.includes("email address") && rawMsg.includes("is invalid")
  ) {
    return "Please enter a valid email address.";
  }

  // Fallback cleanly formatted
  return (err.message || "An unexpected error occurred. Please try again.")
    .replace(/^AuthApiError:\s*/i, "")
    .trim();
}
