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
    let new_students = [];
    
    // total garbage code
    for (var i = 0; i < old_students.students.length; i++) {
        const element = old_students.students[i];
        if (element != body.id) {
            console.log("Adding: ", element);
            new_students.push(element);
        }   
    }

    console.log(new_students);

    const data = {
        students: new_students,
        owner: user.id
    };
    
    await locals.pb.collection('groups').update(body.group, data);

    return new Response();
};
