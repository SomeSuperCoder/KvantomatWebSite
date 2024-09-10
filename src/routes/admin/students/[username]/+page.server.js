/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    let edit_account;
    let txes;
    let places;
    let place = "Ошибка вычисления места";

    try {
        edit_account = await locals.pb.collection('accounts').getFirstListItem(`username="${params.username}"`);
        edit_account.password = "Don't try hacking this app ;)"
        txes = await locals.pb.collection('transactions').getFullList({
            filter: `target="${edit_account.id}"`,
            sort: '-created',
            expand: 'by,target'
        });
        places = await locals.pb.collection('accounts').getFullList({
            filter: 'role="user"',
            sort: '-raiting',
        });
        places.forEach((element, index) => {
            if (element.id == edit_account.id) {
                place = index + 1;
            }
        });
    } catch (err) {
        console.log("Error: ", err);
        return {
            error: true
        }
    }

    return {
        error: false,
        edit_account,
        txes,
        place
    };
};
