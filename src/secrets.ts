import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const secrets = dotenv.config({ path: ".env" }).parsed!;

//export const PORT = process.env.PORT;
//export const MONGOOSE_URL = process.env.MONGOOSE_URL!;
//export const HASH_SECRET = process.env.HASH_SECRET!;
