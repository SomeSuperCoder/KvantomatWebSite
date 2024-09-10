<script>
    import AccountCard from '../../lib/AccountCard.svelte';
    export let data;

    const user = data.user;
    const name = user.name;
    const balance = user.balance;
    const raiting = user.raiting;
    const place = data.place;
</script>

<div class="container">
    <AccountCard current_user="true" name={name} balance={balance} raiting={raiting} txes={data.txes} place={place}>
        <form method="POST" action="/?/logout">
            <button type="submit" class="btn btn-outline-primary"
                >Выйти из аккаунта</button
            >
        </form>
    </AccountCard>
</div>
