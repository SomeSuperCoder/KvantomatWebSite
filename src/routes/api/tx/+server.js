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

    console.log(body)
    
    const data = {
        by: body.by,
        target: body.target,
        reason: body.reason,
        amount: body.amount
    };
    
    // TODO: update user balance and raiting

    const old_account = await locals.pb.collection('accounts').getOne(body.target);
    if (!old_account) {
        return new Response();
    }
    old_account.balance += body.amount;
    if (body.amount > 0) {
        old_account.raiting += body.amount;
    }
    await locals.pb.collection('transactions').create(data);
    const record = await locals.pb.collection('accounts').update(old_account.id, old_account);
    console.log("Record:")
    console.log(record);

    return new Response();
};
