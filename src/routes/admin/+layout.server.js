import { redirect } from "@sveltejs/kit";
import { get_current_user } from "../../lib/auth.js"

export async function load({ locals, cookies }) {
    let user = await get_current_user(locals, cookies);

    if (!user) {
        throw redirect(303, "/");
    }
    if (!(user.role === "admin" || user.role === "moder")) {
        throw redirect(303, "/");
    }

    user.password = "Do not try hacking this app ;)";

    return {
        user
    }
}
