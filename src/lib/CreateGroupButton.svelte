<script>
    import Modal from "./Modal.svelte";
    let group_name = "";

    $: console.log(group_name)

    async function create_group() {
        if (group_name.trim() === "") {
            alert("Имя группы не может быть пустым");
            return;
        }
        
        await axios.post("/api/create_group", {
            name: group_name
        });

        location.reload();
        group_name = "";
    }
</script>

<Modal
    modal_id="create_group"
    title="Создание группы"
    launch_button_text="Создать группу"
    apply_button_text="Создать"
    func={create_group}
    link=true
    nav-item=true>
    <input type="text" class="form-control" placeholder="Название" bind:value={group_name}>
</Modal>
