import { get_current_user } from '../../../lib/auth.js';

export async function POST({ request, cookies, locals }) {
    let user = await get_current_user(locals, cookies);

    if (!user) {
        throw redirect(303, "/");
    }
    const body = await request.json();
    
    await locals.pb.collection('groups').delete(body.id);
    
    return new Response();
    
};
