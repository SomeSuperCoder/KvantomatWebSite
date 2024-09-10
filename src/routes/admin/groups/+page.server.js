export async function load({locals, parent}) {
    const tmp = await parent();
    const user = tmp.user;

    const groups = await locals.pb.collection('groups').getFullList({
        filter: `owner='${user.id}'`
    });

    return {
        groups
    }
}
