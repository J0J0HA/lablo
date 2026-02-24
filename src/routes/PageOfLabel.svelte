<script lang="ts">
    import type { LabelProps } from "$lib/types";
    import Label from "./Label.svelte";

    let {
        label,
        x,
        y,
        self = $bindable(),
    }: {
        label: LabelProps;
        x: number;
        y: number;
        self: HTMLDivElement | undefined;
    } = $props();
</script>

<div class="page" style:--x={x} style:--y={y} bind:this={self}>
    {#each Array.from({ length: y }, (_, i) => i) as i}
        <div class="row">
            {#each Array.from({ length: x }, (_, j) => j) as j}
                <div class="cell">
                    <Label
                        {label}
                        width={297 / x}
                        height={210 / y}
                        exact={true}
                    />
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .page {
        width: 297mm;
        height: 210mm;
        display: flex;
        flex-direction: column;
    }

    .row {
        width: 297mm;
        height: calc(210mm / var(--y));
        display: flex;
        flex-direction: row;
    }

    .cell {
        width: calc(297mm / var(--x));
        height: calc(210mm / var(--y));
        outline: 0.5mm solid rgb(228, 228, 228);
    }
</style>
