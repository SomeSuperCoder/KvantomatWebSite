<script>
    /** @type {import('./$types').PageData} */
    import Modal from "../../../lib/Modal.svelte";
    import CyrillicToTranslit from 'cyrillic-to-translit-js';
        function create(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
    }
    return frag;
}


    const cyrillicToTranslit = new CyrillicToTranslit();
    let list = [["Андрей", 'andrey38']];


    function create_students_local(){   
            let name_student = fullname_student.split(" ");
            console.log(name_student.length)
            if (name_student.length === 3){
                const login = cyrillicToTranslit.transform(name_student[1].toLowerCase());
                const login_number = login+(Math.floor(Math.random() * (100 - 0 + 1)) + 0).toString();
                const newItem = [fullname_student, login_number];
                list = [newItem, ...list];
                console.log("LIST:");
                console.log(list);
            } else {
                let fragment = create('<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Неверно ввод</strong> Вы должны ввести ФИО ученика<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>')
                document.body.insertBefore(fragment, document.body.childNodes[0]);
            }
        }
            
    let fullname_student = "";
    
</script>
{#each list as i}
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
            <div class="fw-bold">{i[1]}</div>
            {i[0]}
        </div>
        <span class="badge bg-primary rounded-pill">14</span>
        </li>
    </ol>
{/each}
<Modal
    modal_id="data_students"
    title="Создать ученика"
    apply_button_text="Создать"
    func={create_students_local}
    launch_button_text="Создать"
>
    <form>
        <input
            placeholder="Как зовут?"
            class="form-control"
            bind:value={fullname_student}
        />
    </form>
</Modal>
