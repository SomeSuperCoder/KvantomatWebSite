<script>
    import Txes from "./Txes.svelte";

    export let current_user;
    export let name;
    export let balance;
    export let raiting;
    export let place;
    export let txes;
</script>

<div class="card">
    <div class="header">
        {#if current_user}
            <h1 class="mb-3">Добро пожаловать, {name}!</h1>
        {/if}
        <p class="balance">
            <span>Баланс: {balance} Kvant</span>
            <br>
            <span>Рейтинг: {raiting}</span>
            {#if raiting > 0}
            <br>
            <span>Место: {place}</span>
            {/if}
        </p>
    </div>
    <div class="card-body">
        <h5 class="card-title">Начисления/Списания</h5>
        <div class="transaction-list">
            <Txes {txes} />
        </div>
    </div>
    <div class="card-footer text-center">
        <slot></slot>
    </div>
</div>

<style>
    .card {
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
        background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
        color: white;
        border-radius: 15px 15px 0 0;
        padding: 20px;
        text-align: center;
    }
    .balance {
        font-size: 2rem;
        font-weight: bold;
    }
    .transaction-list {
        max-height: 400px;
        overflow-y: auto;
        padding: 15px;
    }
</style>
