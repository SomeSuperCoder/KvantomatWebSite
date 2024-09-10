<script>
    export let txes;
</script>

<div class="transaction-list">
    {#each txes as tx}
        <div class="transaction-item bg-light">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">{tx.reason}</h6>
                    <small class="text-muted">от {tx.expand.by.name}</small>
                </div>
                <span class="badge badge-{tx.amount > 0 ? 'success' : 'danger'}"
                    >{tx.amount > 0 ? "+" : ""}{tx.amount}</span
                >
            </div>
        </div>
    {:else}
        <h5 class="text-secondary">Начисления/Списания отсутствуют</h5>
    {/each}
</div>

<style>
    .transaction-item {
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 10px;
        transition: transform 0.2s;
    }
    .transaction-item:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .badge-success {
        background-color: #28a745;
    }
    .badge-danger {
        background-color: #dc3545;
    }
</style>