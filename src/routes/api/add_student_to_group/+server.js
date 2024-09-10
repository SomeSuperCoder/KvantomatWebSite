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

    const old_students = await locals.pb.collection('groups').getOne(body.group);

    const data = {
        students: [
            body.id,
            ...old_students.students
        ],
        owner: user.id
    };
    
    await locals.pb.collection('groups').update(body.group, data);
    
    return new Response();
};
