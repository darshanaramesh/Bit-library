import { describe, it, expect } from 'vitest';
import { validateInstitutionalEmail } from '../src/utils/institutionalEmail';

describe('BIT login email validator', () => {
  it('enforces the @bitsathy.ac.in domain rule with exact messages', () => {
    // Accepted
    expect(validateInstitutionalEmail('student@bitsathy.ac.in')).toBe('');
    expect(validateInstitutionalEmail('faculty@bitsathy.ac.in')).toBe('');
    expect(validateInstitutionalEmail(' STUDENT@BITSATHY.AC.IN ')).toBe('');

    // Rejected with exact message
    expect(validateInstitutionalEmail('a@gmail.com')).toBe(
      'Please use your BIT institutional email address (@bitsathy.ac.in).'
    );
    expect(validateInstitutionalEmail('b@yahoo.com')).toBe(
      'Please use your BIT institutional email address (@bitsathy.ac.in).'
    );
    expect(validateInstitutionalEmail('c@outlook.com')).toBe(
      'Please use your BIT institutional email address (@bitsathy.ac.in).'
    );
    expect(validateInstitutionalEmail('a@sub.bitsathy.ac.in')).toBe(
      'Please use your BIT institutional email address (@bitsathy.ac.in).'
    );
    expect(validateInstitutionalEmail('not-an-email')).toBe(
      'Please enter a valid email address.'
    );
    expect(validateInstitutionalEmail('')).toBe(
      'Please enter your BIT institutional email address.'
    );
    expect(validateInstitutionalEmail('   ')).toBe(
      'Please enter your BIT institutional email address.'
    );
    expect(validateInstitutionalEmail('@bitsathy.ac.in')).toBe(
      'Please enter a valid email address.'
    );
    expect(validateInstitutionalEmail('noatsign')).toBe(
      'Please enter a valid email address.'
    );
    expect(validateInstitutionalEmail('good@bitsathy.ac.in ')).toBe('');
  });
});
