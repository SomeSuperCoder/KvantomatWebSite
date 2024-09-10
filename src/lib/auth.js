export async function get_current_user(locals, cookies) {
    try {
        const authData = JSON.parse(cookies.get("session"));
        const user = await locals.pb.collection('accounts').getFirstListItem(`username='${authData.login}' && password='${authData.hashed_password}'`, {});

        return user;
    } catch (err) {
        console.log("Error: ", err);
        return null;
    }
}

export function authorize(login, hashed_password, cookies) {
    cookies.set('session', JSON.stringify({login, hashed_password}), {
        path: '/',
        httpOnly: true, // This makes the cookie HttpOnly
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365 * 60 // 60 years
    });
}

export async function check_login_credentials(login, hashed_password, locals) {
    try {
        return await locals.pb.collection('accounts').getFirstListItem(`username='${login}' && password='${hashed_password}'`, {});
    } catch (err) {
        console.log("Invalid login or password!");
        
        return null;
    }
}
