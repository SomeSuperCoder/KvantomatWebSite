export async function load({locals, params}) {
    const record = await locals.pb.collection('groups').getFirstListItem(`id="${params}"`, {
        expand: 'relField1,relField2.subRelField',
    });
    console.log(record)
    return {
        records
    }
}
