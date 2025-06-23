export const serializerUser = (user) => ({
  ...user,
  is_producer: Boolean(user.is_producer),
});

export const serializerUsers = (users) => users.map(serializerUser);
