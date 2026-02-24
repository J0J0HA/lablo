<script lang="ts">
    import { renderPNG, renderPDF } from "$lib/render";
    import {
        Button,
        Center,
        Column,
        FIcon,
        Input,
        Row,
        Select,
        Spacer,
    } from "jxlib";
    import Label from "./Label.svelte";
    import PageOfLabel from "./PageOfLabel.svelte";
    import PreviewBox from "./PreviewBox.svelte";
    import { onMount, tick } from "svelte";
    import { backgrounds, fonts, type LabelProps } from "$lib/types";

    let status: string | null = $state("Daten laden...");

    let template: LabelProps["template"] = $state("empty");
    let font: LabelProps["font"] = $state("");
    let title = $state("Ananas-Marmelade");
    let subtitle = $state("Mit Ananas und Zitrone");
    let color = $state("black");

    let xS = $state("4");
    let yS = $state("5");
    let x = $derived(parseInt(xS));
    let y = $derived(parseInt(yS));

    let labelProps: LabelProps = $derived({
        title,
        subtitle,
        year: new Date().getFullYear(),
        template,
        font,
        color,
    });

    onMount(() => {
        const data = localStorage.getItem("lablo-data");
        if (data) {
            const parsed = JSON.parse(data);
            const labelPropsRead = parsed.labelProps;
            title = labelPropsRead.title;
            subtitle = labelPropsRead.subtitle;
            template = labelPropsRead.template;
            font = labelPropsRead.font;

            xS = parsed.x.toString();
            yS = parsed.y.toString();
        }
        status = null;
    });

    $effect(() => {
        localStorage.setItem(
            "lablo-data",
            JSON.stringify({
                labelProps,
                x,
                y,
            }),
        );
    });

    let pageRef: HTMLDivElement | undefined = $state();
</script>

<div style:top="-110%" style:position="fixed">
    <PageOfLabel label={labelProps} {x} {y} bind:self={pageRef} />
</div>
{#if status}
    <div class="dialog">
        <Center>
            <h1>
                {status}
            </h1>
            <span style:margin="0.5em" style:font-size="3em">
                <FIcon icon="loader" rotating />
            </span>
            <p style:text-align="center">Bitte warten Sie einen Moment.</p>
        </Center>
    </div>
{/if}
<div class="wrapper">
    <Column fw align="center" justify="start">
        <PreviewBox>
            <Label label={labelProps} width={297 / x} height={210 / y} />
        </PreviewBox>
        <Spacer h="1em" />
        <Input fw name="title" bind:value={title} placeholder="Titel">
            Titel
        </Input>
        <Input
            fw
            name="subtitle"
            bind:value={subtitle}
            placeholder="Untertitel"
        >
            Untertitel
        </Input>
        <Input
            fw
            type="number"
            name="year"
            value={new Date().getFullYear().toString()}
            disabled
            placeholder="Jahr"
        >
            Jahr
        </Input>
        <Row fw align="center" justify="center">
            <Select
                fw
                name="font"
                placeholder="Schriftart"
                bind:value={font}
                options={fonts}>Schriftart</Select
            >
            <input
                type="color"
                name="color"
                bind:value={color}
                style:translate="0 0.5em"
            />
        </Row>
        <Select
            fw
            name="template"
            placeholder="Hintergrund"
            bind:value={template}
            options={Object.fromEntries(
                Object.entries(backgrounds).map(([key, value]) => [
                    key,
                    value[0],
                ]),
            )}
        >
            Hintergrund
        </Select>
        <Row fw>
            <Input
                fw
                name="y"
                type="number"
                bind:value={yS}
                placeholder="Etiketten pro Zeile"
            >
                Zeilen
            </Input>
            <Input
                fw
                name="x"
                type="number"
                bind:value={xS}
                placeholder="Etiketten pro Spalte"
            >
                Spalten
            </Input>
        </Row>
        <Spacer h="0.5em" />
        <Row fw justify="end">
            <Button
                onclick={async () => {
                    if (status) return;
                    status = "PNG generieren...";
                    await tick();
                    try {
                        await renderPNG(pageRef!);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 750),
                        );
                    } finally {
                        status = null;
                    }
                }}
            >
                <Row align="center">
                    <FIcon icon="download" />
                    <Spacer w="0.25em" />
                    PNG
                </Row>
            </Button>
            <Button
                onclick={async () => {
                    if (status) return;
                    status = "PDF generieren...";
                    await tick();
                    try {
                        await renderPDF(pageRef!);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 750),
                        );
                    } catch (e) {
                        console.error(e);
                        alert(e.message);
                    } finally {
                        status = null;
                    }
                }}
            >
                <Row align="center">
                    <FIcon icon="download" />
                    <Spacer w="0.25em" />
                    PDF
                </Row>
            </Button>
        </Row>
    </Column>
</div>
<footer>This site is intended for private use only.</footer>

<style>
    .wrapper {
        padding: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(body):has(.dialog) {
        max-height: 100vh;
        max-width: 100vw;
        overflow: hidden;
        overflow: clip;
    }

    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        font-size: 0.8em;
        color: #aaa;
    }
</style>
