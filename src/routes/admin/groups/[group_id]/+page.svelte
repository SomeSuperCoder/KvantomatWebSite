<script>
    import Modal from "../../../../lib/Modal.svelte";
    import axios from "axios";
    import StudentEntry from "../../../../lib/StudentEntry.svelte";
    import { goto } from '$app/navigation';

    let search_text = "";
    let search_results = [];

    export let data;

    const accounts = data.accounts;

    function search() {
        console.log(search_text)
        const tmp_search_text = search_text.toLowerCase()
        search_results = [];

        if (search_text.ti === "") {
            return;
        }

        accounts.forEach(element => {
            console.log("=============");
            console.log(element.name.includes(search_text));
            console.log(element.username.includes(search_text));
            console.log("=============");
            if (element.name.toLowerCase().includes(tmp_search_text) || element.username.includes(tmp_search_text)) {
                search_results.push(element);
            }
        });
    }
    async function delete_groups(){
        await axios.post("/api/delete_group", {
            id: data.group.id
        });
        goto("/admin/groups")
    }
    function new_student(){
        location.reload();
    }

    // Add/remove students
    async function add_students_in_group(user_id, group_id){
        await axios.post("/api/add_student_to_group", {
            id: user_id,
            group: data.group.id
        });
    }

    async function remove_student_from_group(user_id, group_id) {
        await axios.post("/api/remove_student_from_group", {
            id: user_id,
            group: data.group.id
        });
        location.reload();
    }
</script>

{#if data.error}
    <div class="container">
        <h1>Группа не найдена</h1>
        <a class="btn btn-primary" href="/admin/groups">Вернуться на главную</a>
    </div>
{:else}
    <div class="container">
        <div class="card mt-3">
            <div class="header">
                <p class="balance">
                    <span>{data.group.name}</span>
                    <br>
                </p>
            </div>
            <div class="card-body">
                <h5 class="card-title">Участники</h5>
                {#if data.group.expand}
                    <!-- Begin Student List  -->
                    <div class="row pl-3">
                        {#each data.group.expand.students as element}
                        {#if element.role === "user"}
                        <div class="col-12 mt-2">
                            <StudentEntry name={element.name} username={element.username}>
                                <a class="btn btn-primary" href="/admin/students/{element.username}">Управление учеником</a>
                                <button type="button" class="btn btn-danger" on:click={() => remove_student_from_group(element.id)}>Убрать из группы</button>
                            </StudentEntry>
                        </div>
                        {/if}
                        {:else}
                        <h5 class="text-secondary">В этой группе никого нет</h5> <!-- TODO: remove code duplication-->
                        {/each}
                    </div>
                    <!-- End Student List  -->
                {:else}
                <h5 class="text-secondary">В этой группе никого нет</h5> <!-- TODO: remove code duplication-->
                {/if}
            </div>
            <div class="card-footer text-center">
                <Modal 
                    modal_id="new_students"
                    title="Поиск"
                    launch_button_text="Добавить ученика"
                    apply_button_text="Сохранить"
                    func={new_student}>
                    <input type="text" class="form-control" placeholder="Введите фио" bind:value={search_text} on:input={search}>

                    <!-- Begin Student List  -->
                    <div class="row pl-3">
                        {#each search_results as element}
                        {#if element.role === "user"}
                        <div class="col-12 mt-2">
                            <StudentEntry name={element.name}>
                                <button type="button" class="btn btn-primary" on:click={() => add_students_in_group(element.id)}>Добавить</button>
                            </StudentEntry>
                        </div>
                        {/if}
                        {/each}
                    </div>
                    <!-- End Student List  -->
                </Modal>
                <Modal
                    modal_id="delete"
                    title="Вы уверены?"
                    apply_button_text="Да, удалить"
                    func={delete_groups}
                    danger="true"
                    launch_button_text="Удалить группу"
                >
                    <form>
                        <h1 class="text-danger">
                            Это действие нельзя будет отменить
                        </h1>
                    </form>
                </Modal>
                <a class="btn btn-primary" role="button" href="/reports/group/{data.group.id}">Распечатать группу</a>
            </div>
        </div>
    </div>
{/if}

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