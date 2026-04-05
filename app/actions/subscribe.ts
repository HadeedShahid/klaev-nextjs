'use server';

export type FormState = {
  error?: string;
  success?: string;
};

export async function subscribe(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || '';
    const domain = rawDomain.replace(/^https?:\/\//, '');
    const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!domain || !token) {
      console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN');
      return { error: 'Server configuration error.' };
    }

    const response = await fetch(
      `https://${domain}/admin/api/2024-01/customers.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify({
          customer: {
            email,
            email_marketing_consent: {
              state: "subscribed",
              opt_in_level: "single_opt_in",
              consent_updated_at: new Date().toISOString(),
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shopify API Error:', errorData);

      // Handle the case where the customer already exists
      if (JSON.stringify(errorData).includes('taken')) {
        return { success: "You're already on the list! We'll be in touch." };
      }

      return { error: 'Error signing up. Please try again.' };
    }

    return { success: "Thanks for signing up! We'll keep you updated." };
  } catch (e) {
    console.error('Signup error:', e);
    return { error: 'Something went wrong. Please try again later.' };
  }
}
