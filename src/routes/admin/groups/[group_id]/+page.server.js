export async function load({params, locals}) {
    let group;
    try {
        group = await locals.pb.collection('groups').getOne(params.group_id, {
            expand: 'students',
        });
    } catch {
        return {
            error: true
        }
    }

    const accounts = await locals.pb.collection('accounts').getFullList();
    return {
        group,
        accounts,
        error: false
    }
}
