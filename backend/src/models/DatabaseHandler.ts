import { MongoClient } from "mongodb";

export async function connectToCluster(
    connectionString: string,
    callbackFunction: (client: MongoClient) => void
) {
    const client: MongoClient = new MongoClient(connectionString);
    const connectedClient = await client.connect();
    callbackFunction(connectedClient);
    client.close();
    console.log("Connection closed db");
}
