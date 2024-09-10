import { get_current_user } from '../../../lib/auth.js';

export async function POST({ request, cookies, locals }) {
    let user = await get_current_user(locals, cookies);

    if (!user) {
        throw redirect(303, "/");
    }
    if (!(user.role === "admin" || user.role === "moder")) {
        throw redirect(303, "/admin");
    }

    const body = await request.json();
    const result = await locals.pb.collection('accounts').delete(body.target);
    
    return new Response();
};
