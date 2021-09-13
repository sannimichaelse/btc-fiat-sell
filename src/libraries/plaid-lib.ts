import plaid from 'plaid';

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
  options: {
    version: '2020-09-14',
  },
});

export const getAccounts = async (accessToken: string) => {
  const accounts_response = await plaidClient.getAccounts(accessToken);
  return accounts_response.accounts;
}

export const getInstitutions = async () => {
  const count = 10;
  const offset = 0;
  const country_codes = ['US', 'GB', 'ES', 'NL', 'FR', 'IE', 'CA']
  const response = await plaidClient.getInstitutions(count, offset, country_codes);
  return response.institutions
}

export const getPlaidAccessToken = async (institutionId: string, products: string[]) => {
  const publicTokenResponse = await plaidClient.sandboxPublicTokenCreate(institutionId, products);
  const publicToken = publicTokenResponse.public_token;
  // The generated public_token can now be exchanged for an access_token
  const exchangeTokenResponse = await plaidClient.exchangePublicToken(publicToken);
  const { access_token, item_id } = exchangeTokenResponse;
  return { access_token, item_id }
}