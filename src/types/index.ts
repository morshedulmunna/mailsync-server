export type UserData = {
  user: {
    name: string;
    email: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
