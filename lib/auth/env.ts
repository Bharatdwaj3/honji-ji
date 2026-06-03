export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;

export const JWT_ACC_SECRECT = process.env.JWT_ACC_SECRECT;
export const JWT_ACC_EXPIRES_IN = process.env.JWT_ACC_EXPIRES_IN || "15m";
export const JWT_REF_SECRECT = process.env.JWT_REF_SECRECT;
export const JWT_REF_EXPIRES_IN = process.env.JWT_REF_EXPIRES_IN || "7d";

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const Fbase_project_id = process.env.Fbase_project_id || '';
export const Fbase_public_key = process.env.Fbase_public_key || '';
export const Fbase_private_key_id = process.env.Fbase_private_key_id || '';
export const Fbase_client_email = process.env.Fbase_client_email || '';
export const Fbase_client_id = process.env.Fbase_client_id || '';
export const Fbase_auth_uri = process.env.Fbase_auth_uri || '';
export const Fbase_token_uri = process.env.Fbase_token_uri || '';
export const Fbase_auth_provider_x509_cert_url = process.env.Fbase_auth_provider_x509_cert_url || '';
export const Fbase_client_x509_cert_url = process.env.Fbase_client_x509_cert_url || '';
export const Fbase_universe_domain = process.env.Fbase_universe_domain || 'googleapis.com';