<script>
    export let name;
    export let size;
    export let username = null;
</script>

<div class="row">
    <div class="col-7">
        <h2>
            {name}<span class="text-secondary fs-{size}">{#if username}&nbsp;{username}{/if}</span>
        </h2>
    </div>
    <div class="col-5">
        <slot></slot>
    </div>
</div>
