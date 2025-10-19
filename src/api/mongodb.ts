// MongoDB connection configuration
// For development: Replace the default value with your MongoDB Atlas connection string
// For production: Set these as environment variables

export const MONGODB_URI = Deno.env.get("MONGODB_URI") || "mongodb+srv://neeraj007rockers_db_user:dAw6zTRqtkuXg3pp@neerajmongo.qdp4i2b.mongodb.net/?retryWrites=true&w=majority&appName=neerajMongo";
export const DB_NAME = Deno.env.get("DB_NAME") || "wedding_website";
export const COLLECTION_NAME = Deno.env.get("COLLECTION_NAME") || "rsvps";

/*
SETUP INSTRUCTIONS:

1. Get your MongoDB Atlas connection string from https://cloud.mongodb.com/
2. Replace "YOUR_MONGODB_ATLAS_CONNECTION_STRING" above with your actual connection string
   
   Example:
   export const MONGODB_URI = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";

3. For production deployment, set environment variables instead:
   - MONGODB_URI: Your MongoDB connection string
   - DB_NAME: Database name (default: "wedding_website")
   - COLLECTION_NAME: Collection name (default: "rsvps")

For detailed setup instructions, see MONGODB_SETUP.md
*/