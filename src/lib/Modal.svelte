<script>
    export let modal_id;
    export let title;
    export let launch_button_text;
    export let apply_button_text;
    export let func;
    export let danger = false;
    export let link = false;
    export let nav_item = false;
</script>

<button
    type="button"
    class="btn btn-{link ? "link" : danger ? "danger" : "primary"} {nav_item ? "nav-item" : ""}"
    style="text-align: left"
    data-bs-toggle="modal"
    data-bs-target="#{modal_id}"
>
    {launch_button_text}
</button>

<div
    class="modal fade"
    id="{modal_id}"
    tabindex="-1"
    role="dialog"
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{title}</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-{!danger ? "danger" : "primary"}"
                    data-bs-dismiss="modal">Закрыть</button>
                <button data-bs-dismiss="modal" type="button" class="btn btn-{danger ? "danger" : "primary"}" on:click={func}>{apply_button_text}</button>
            </div>
        </div>
    </div>
</div>

<style>
    .btn-link {
        color: #ffffff;
        transition: color 0.3s;
        text-decoration: none;
    }

    .btn-link:hover {
        color: #ffdd57; /* Bright yellow on hover */
    }

    .btn-link:focus {
        border: none;
        outline: none;
        box-shadow: none;
    }

    .btn-link:active {
        border: none;
        outline: none;
        box-shadow: none;
    }
</style>
