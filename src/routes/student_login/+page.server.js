import { authorize } from "../../lib/auth";
import { redirect } from "@sveltejs/kit";

export const actions = {
    login: async ({ locals, request, cookies }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);
        
        let record;
        try  {
            const login = data.login;

            record = await locals.pb.collection('accounts').getFirstListItem(`username='${login}' && role=\"user\"`, {});

            authorize(login, "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f", cookies);
        } catch (err) {
            console.log("Error: ", err);

            return {
                error: true,
                error_text: "Неверные данные для входа",
                login: data.login
            }
        }

        throw redirect(303, "/profile");
    },
    logout: async ({ cookies }) => {
        console.log("LOGOUT!");
        cookies.delete("session", { path: "/" });
    }
}
