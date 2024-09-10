<script>
    /** @type {import('./$types').PageData} */
    export let data;

    import AccountCard from "../../../../lib/AccountCard.svelte";
    import Modal from "../../../../lib/Modal.svelte";
    import axios from "axios";
    import { give_reasons, take_reasons } from "../../../../lib/reasons"

    function reloadPage() {
        location.reload();
    }

    let balance = data.edit_account?.balance ?? 0;

    let tmp_reason = ["", 0];
    let give_amount = 0;
    let take_amount = 0;
    let new_password = "";
    let reason = "";

    $: reason = tmp_reason[0];
    $: give_amount = tmp_reason[1];
    $: take_amount = tmp_reason[1];

    async function give() {
        give_amount = Math.abs(Math.floor(give_amount));

        await axios.post("/api/tx", {
            by: data.user.id,
            target: data.edit_account.id,
            reason,
            amount: give_amount,
        });

        balance += give_amount;
        give_amount = 0;
        reason = "";

        reloadPage();
    }

    async function take() {
        take_amount = Math.abs(Math.floor(take_amount));

        if (take_amount > balance) {
            take_amount = 0;
            return;
        }

        await axios.post("/api/tx", {
            by: data.user.id,
            target: data.edit_account.id,
            reason,
            amount: -take_amount,
        });

        balance -= take_amount;
        take_amount = 0;

        reloadPage();
    }

    async function set_new_password() {
        console.log(new_password)
        await axios.post("/api/change_password", {
            password: new_password,
            target: data.edit_account.id
        });
        new_password = "";
    }

    async function remove() {
        console.log(data.edit_account.id);

        await axios.post("/api/delete", {
            target: data.edit_account.id
        });
        window.history.go(-1)
    }
</script>

{#if data.error || data.edit_account.role != "user"}
    <div class="container">
        <h1>Пользователь не найден</h1>
        <a class="btn btn-primary" href="/admin/">Вернуться на главную</a>
    </div>
{:else}
    <div class="container">
        <div class="mt-5"></div>
        <AccountCard
            {balance}
            name={data.edit_account.name}
            txes={data.txes}
            raiting={data.edit_account.raiting}
            place={data.place}
        >
            <Modal
                modal_id="give"
                title="Начислить баллы"
                apply_button_text="Начислить"
                func={give}
                launch_button_text="Начислить"
            >
                <form>
                    <label for="reason_select">Выберите причину:</label>
                    <select
                        type="text"
                        class="form-control"
                        bind:value={tmp_reason}
                        id="reason_select"
                    >
                    {#each give_reasons as reason}
                    <option value={reason}>{reason[0]}</option>
                    {/each}
                    </select>
                </form>
            </Modal>

            <Modal
                modal_id="take"
                title="Спсиать баллы"
                apply_button_text="Списать"
                func={take}
                launch_button_text="Списать"
            >
            <form>
                <label for="reason_select2">Выберите причину:</label>
                <select
                    type="text"
                    class="form-control"
                    bind:value={tmp_reason}
                    id="reason_select2"
                >
                {#each take_reasons as reason}
                <option value={reason}>{reason[0]}</option>
                {/each}
                </select>
            </form>
            </Modal>

            <Modal
                modal_id="passwd"
                title="Сменить пароль"
                apply_button_text="Применить"
                func={set_new_password}
                launch_button_text="Сменить пароль"
            >
                <form>
                    <input
                        placeholder="Новый пароль"
                        type="password"
                        class="form-control"
                        bind:value={new_password}
                    />
                </form>
            </Modal>

            <Modal
                modal_id="delete"
                title="Вы уверены?"
                apply_button_text="Да, удалить"
                func={remove}
                danger="true"
                launch_button_text="Удалить аккаунт"
            >
                <form>
                    <h1 class="text-danger">
                        Это действие нельзя буде отменить!
                    </h1>
                </form>
            </Modal>
        </AccountCard>
    </div>
{/if}
