import env from "@/app/env";

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite"

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key

console.log('Server client initialized with:', {
    endpoint: env.appwrite.endpoint,
    projectId: env.appwrite.projectId,
    hasApiKey: !!env.appwrite.apikey
});

const databases = new Databases(client)
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client)


export { client, databases, users, avatars, storage}