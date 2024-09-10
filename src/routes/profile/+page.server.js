import { redirect } from "@sveltejs/kit";
import { get_current_user } from "../../lib/auth.js"

export async function load({ locals, cookies }) {
    let user = await get_current_user(locals, cookies);
    let place;

    if (!user) {
        throw redirect(303, "/");
    }
    if (user.role === "admin" || user.role === "moder") {
        throw redirect(303, "/admin");
    }

    const txes = await locals.pb.collection('transactions').getFullList({
        filter: `target="${user.id}"`,
        sort: '-created',
        expand: 'by,target'
    });
    let places = await locals.pb.collection('accounts').getFullList({
        filter: 'role="user"',
        sort: '-raiting',
    });
    places.forEach((element, index) => {
        if (element.id == user.id) {
            place = index + 1;
        }
    });
    user.password = "Do not try hacking this app ;)";

    return {
        user,
        txes,
        place
    }
}
