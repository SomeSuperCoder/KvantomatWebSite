import PocketBase from "pocketbase";
import { SECRET_PB_EMAIL, SECRET_PB_PASSWORD } from '$env/static/private';

export async function handle({event, resolve}) {
    event.locals.pb = new PocketBase("http://127.0.0.1:8090");

    await event.locals.pb.admins.authWithPassword(SECRET_PB_EMAIL, SECRET_PB_PASSWORD);

    const response = await resolve(event);
    
    return response;
}
