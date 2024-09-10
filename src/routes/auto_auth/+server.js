import { redirect } from '@sveltejs/kit';
import { authorize, check_login_credentials } from '../../lib/auth';

export async function GET({ url, cookies, locals }) {
    const login = url.searchParams.get("login");
    const hashed_password = url.searchParams.get("hashed_password");

    if (await check_login_credentials(login, hashed_password, locals)) {
        console.log("Authorizing!");
        authorize(login, hashed_password, cookies);
    }
    console.log("NOT Authorizing!");

    throw redirect(303, "/");
}
