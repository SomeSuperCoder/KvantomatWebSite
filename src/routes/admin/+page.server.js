export async function load({locals}) {
    const accounts = await locals.pb.collection('accounts').getFullList({
        sort: '-created',
    });

    accounts.forEach(element => {
        element.password = "Don't try hacking this app ;)";
    });
    
    return {
        accounts
    }
}
