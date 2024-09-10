<script>
    import Modal from '../../../lib/Modal.svelte';
    export let data;
</script>

<div class="container mt-5">
    <h1 class="text-center mb-4">Ваши группы</h1>
    <div class="row">
        {#each data.groups as group}
        <div class="col-md-4">
            <a href="/admin/groups/{group.id}" class="card text-center mb-4">
                <div class="card-body">
                    <h5 class="card-title">{group.name}</h5>
                </div>
            </a>
        </div>
        {:else}
        <h3>У пока что нет групп</h3>
        {/each}
    </div>
</div>

<style>
    .card {
        transition: transform 0.2s;
        cursor: pointer; /* Change cursor to pointer */
    }
    .card:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: bold;
    }
    a {
        text-decoration: none;
    }
</style>
