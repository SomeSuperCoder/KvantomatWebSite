import { redirect } from '@sveltejs/kit';
import { hashValue } from "../lib/hashing";
import { authorize, check_login_credentials } from '../lib/auth';
import { get_current_user } from '../lib/auth';

export async function load({locals, cookies}) {
    const current_user = await get_current_user(locals, cookies);

    if (current_user) {
        if (current_user.role === "user") {
            throw redirect(303, "/profile");
        } else if (current_user.role === "moder" || current_user.role === "admin") {
            throw redirect(303, "/admin");
        }
    }

    return {};
}

export const actions = {
    login: async ({ locals, request, cookies }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        
        const login = data.login;
        const hashed_password = await hashValue(data.password);

        let record = await check_login_credentials(login, hashed_password, locals);
        
        if (record) {
            authorize(login, hashed_password, cookies);
        } else {
            return {
                error: true,
                error_text: "Неверные данные для входа",
                login: data.login
            }
        }
        
        if (record.role === "admin" || record.role === "moder") {
            throw redirect(303, "/admin");
        } else {
            throw redirect(303, "/profile");
        }
    },
    logout: async ({ cookies }) => {
        console.log("LOGOUT!");
        cookies.delete("session", { path: "/" });
    }
}
