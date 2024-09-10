<!-- <script>
    import StudentEntry from "./StudentEntry.svelte";
    import axios from "axios";
    
    export let list;
    export let size = 2;
    export let show_id = true;
    export let group = "";
</script>

<div class="row pl-3">
    {#each list as element}
        <div class="col-12 mt-2">
            {#if element.role === "user"}
            <StudentEntry name={element.name} show_id={show_id} size={size}>
                <button type="button" class="btn btn-primary" on:click={() => add_students_in_group(element.id)}>Добавить</button>
            </StudentEntry>
            {/if}
        </div>
    {/each}
</div> -->
<h1>ANDREY, THIS COMPONENT MUST NOT BE USED!</h1>
<h1>АНДРЕЙ, НЕ НАДО ИСПОЛЬЗОВАТЬ ЭТОТ КОМПОНЕТНТ!</h1>
