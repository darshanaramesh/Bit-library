/**
 * BIT institutional email rules.
 *
 * Only @bitsathy.ac.in addresses may be used to sign in to the portal.
 * This is a UI-level check today; when authentication is implemented the
 * backend MUST apply the same rule server-side (reject any request whose
 * email is outside the domain) so it cannot be bypassed by editing the
 * input or calling the API directly.
 */

export const BIT_EMAIL_DOMAIN = '@bitsathy.ac.in';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_REQUIRED_ERROR =
  'Please enter your BIT institutional email address.';

export const EMAIL_FORMAT_ERROR = 'Please enter a valid email address.';

export const EMAIL_DOMAIN_ERROR =
  'Please use your BIT institutional email address (@bitsathy.ac.in).';

/**
 * Validate a sign-in email.
 * @returns {string} an error message, or '' when the address is acceptable.
 */
export function validateInstitutionalEmail(value) {
  const email = (value || '').trim();
  if (!email) return EMAIL_REQUIRED_ERROR;
  if (!EMAIL_PATTERN.test(email)) return EMAIL_FORMAT_ERROR;
  if (!email.toLowerCase().endsWith(BIT_EMAIL_DOMAIN)) return EMAIL_DOMAIN_ERROR;
  return '';
}
