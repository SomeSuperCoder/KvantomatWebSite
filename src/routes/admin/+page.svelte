<script>
    import StudentEntry from '../../lib/StudentEntry.svelte';

    let search_text = "";
    let search_results = [];

    export let data;

    const accounts = data.accounts;

    $: search(search_text)

    console.log(accounts);

    function search(local_search_text) {
        const tmp_search_text = local_search_text.toLowerCase().trim();
        search_results = [];

        if (local_search_text.trim() === "") {
            return;
        }

        accounts.forEach(element => {
            console.log("=============");
            console.log(element.name.includes(local_search_text));
            console.log(element.username.includes(local_search_text));
            console.log("=============");
            if (element.name.toLowerCase().includes(tmp_search_text) || element.username.includes(tmp_search_text)) {
                search_results.push(element);
            }
        });
    }

    function edit(element) {
        console.log(`Edit: ${element}`)
    }
</script>

<div class="container">
    <div class="mt-5">
        <div class="input-group mt-1">
            <input
                type="text"
                class="form-control"
                placeholder="Глобальный поиск"
                bind:value={search_text}
            />
            <a class="btn btn-primary col-4" role="button" href="/admin/groups">Мои группы</a>
        </div>
    </div>

    {#each search_results as element}
    {#if element.role === "user"}
    <div class="col-12 mt-2">
        <StudentEntry name={element.name} username={element.username}>
            <a class="btn btn-primary" href="/admin/students/{element.username}">Управление учеником</a>
        </StudentEntry>
    </div>
    {/if}
    {/each}
</div>
