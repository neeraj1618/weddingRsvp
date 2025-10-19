// MongoDB connection configuration - EXAMPLE FILE
// 
// For development:
// 1. Copy this file to mongodb.ts
// 2. Replace the placeholder values with your actual MongoDB Atlas connection string
//
// For production:
// Use environment variables instead of hardcoded values

// Example using environment variables (recommended for production):
export const MONGODB_URI = Deno.env.get("MONGODB_URI") || "mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority";
export const DB_NAME = Deno.env.get("DB_NAME") || "wedding_website";
export const COLLECTION_NAME = Deno.env.get("COLLECTION_NAME") || "rsvps";

// Example for development (hardcoded values):
// export const MONGODB_URI = "mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";
// export const DB_NAME = "wedding_website";
// export const COLLECTION_NAME = "rsvps";

/*
TO GET YOUR MONGODB CONNECTION STRING:

1. Log in to MongoDB Atlas (https://cloud.mongodb.com/)
2. Click on your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Select "Driver: Node.js" and version "5.5 or later"
6. Copy the connection string
7. Replace <password> with your database user password
8. Replace <dbname> with your database name (e.g., "wedding_website")

Example connection string format:
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wedding_website?retryWrites=true&w=majority

IMPORTANT SECURITY NOTES:
- Never commit mongodb.ts with real credentials to version control
- Add mongodb.ts to .gitignore
- Use environment variables in production
- Keep your database password secure
*/
