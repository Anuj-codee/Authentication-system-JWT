import dotenv from "dotenv"

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Mongo_URI is not defined in enviroment variables");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in enviroment variables");
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID is not defined in enviroment variables");
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in enviroment variables");
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("REFRESH_TOKEN_SECRET is not defined in enviroment variables");
}

if(!process.env.GOOGLE_USER_EMAIL){
    throw new Error("GOOGLE_USER_EMAIL is not defined in enviroment variables");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER_EMAIL: process.env.GOOGLE_USER_EMAIL
}

export default config;