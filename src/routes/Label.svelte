<script lang="ts">
    import type { LabelProps } from "$lib/types";

    let {
        label,
        width,
        height,
        exact = false,
    }: {
        label: LabelProps;
        width: number;
        height: number;
        exact?: boolean;
    } = $props();
</script>

<div
    class="label"
    style:--width={width}
    style:--height={height}
    class:exact
    class:template-circles={label.template === "circles"}
    class:template-grid={label.template === "grid"}
    style:font-family={label.font}
    style:color={label.color}
>
    <div class="upper">
        <h1 class="title">{label?.title}</h1>
        <p class="subtitle">{label?.subtitle}</p>
    </div>
    <p class="date">{label?.year}</p>
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Gloria+Hallelujah&family=Indie+Flower&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Patrick+Hand&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

    .template-circles {
        background-image: url("/circles.jpg");
        background-size: cover;
        background-position: center;
    }

    .template-grid {
        background-image: url("/grid.jpg");
        background-size: contain;
        background-position: center;
    }

    .label {
        user-select: none;

        font-size: calc(var(--scale) / 30);
        width: var(--scale);
        aspect-ratio: var(--width) / var(--height);
        color: black;
        background-color: white;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;
    }

    .label.exact {
        --scale: var(--width) * 1mm;
    }

    .upper {
        flex: 1 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .title {
        font-size: 2.5em;

        margin: 0;
        max-width: 85%;
        text-align: center;
    }

    .subtitle {
        font-size: 2em;

        margin: 0;
        max-width: 85%;
        text-align: center;
    }

    .date {
        /* position: absolute; */
        font-size: 1.6em;
        margin: 0.75em 0;
        margin-top: -1em;
    }
</style>
