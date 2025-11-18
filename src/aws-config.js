export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      loginWith: {
        email: true
      }
    }
  }
};

export const apiConfig = {
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  region: import.meta.env.VITE_AWS_REGION
};
