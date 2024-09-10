export async function load({locals}) {
    const records = await locals.pb.collection('accounts').getFullList({
        filter: "role=\"user\" && balance>0",
        sort: '-raiting',
    });

    return {
        records
    }
}
