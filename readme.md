REST API for store using JWT authentication.

Routes are divided in three files -

1. Admin Routes - for delete, update, ads product (using isRequestValid & isAdmin middleware)
2. Login/register - for registering and logging in user. Bcrypt library is used to store hash password
3. User Routes - for only getting products details
