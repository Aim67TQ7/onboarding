import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "687b79101a90733c21a9961f", 
  requiresAuth: true // Ensure authentication is required for all operations
});
