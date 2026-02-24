<script>
    let { children } = $props();
</script>

<div class="box">
    {@render children()}
</div>

<style>
    .box {
        --scale: max(200px, min(90vw, 50vh));
        width: var(--scale);
        /* aspect-ratio: 1; */
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 1mm;
    }

    .box > :global(*) {
        border-radius: 1mm;
    }
</style>
