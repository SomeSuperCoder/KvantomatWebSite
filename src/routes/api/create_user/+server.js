import { get_current_user } from '../../../lib/auth.js';
import { hashValue } from "../../../lib/hashing.js";
import { gen_login } from '../../../lib/login_genarate.js';

async function does_exist(username) {
    try {
        await locals.pb.collection('account').getFirstListItem(`username="${url.searchParams.username}"`);
        return true;
    } catch {
        return false;
    }
}

export async function POST({ request, cookies, locals }) {
    let user = await get_current_user(locals, cookies);

    if (!user) {
        throw redirect(303, "/");
    }
    if (!(user.role === "admin" || user.role === "moder")) {
        throw redirect(303, "/admin");
    }

    const body = await request.json();

    if (!body.name && !body.role) {
        throw new Error("Missing required fields");
    }

    let username;

    do {
        username = gen_login(body.name);
    } while (await does_exist(username))
    
    const data = {
        name: body.name,
        username,
        password: await hashValue("12345678"),
        balance: 0,
        raiting: 0,
        role: "user"
    };
    
    await locals.pb.collection('accounts').create(data);

    return new Response();
};
