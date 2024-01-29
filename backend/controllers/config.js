// config.js

export const session = {
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    // Other session configurations...
  };
  
  export const jwt = {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    // Other JWT configurations...
  };
  