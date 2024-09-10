import { get_current_user } from '../../../lib/auth.js';
import { hashValue } from "../../../lib/hashing.js";

export async function POST({ request, cookies, locals }) {
    let user = await get_current_user(locals, cookies);

    if (!user) {
        throw redirect(303, "/");
    }
    if (!(user.role === "admin" || user.role === "moder")) {
        throw redirect(303, "/admin");
    }

    const body = await request.json();
    console.log(body);

    const data = {
        password: await hashValue(body.password)
    };
    
    console.log(data)

    const record = await locals.pb.collection('accounts').update(body.target, data);
    
    return record;
};
