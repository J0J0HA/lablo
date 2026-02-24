<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import { LoadDefaultTheme } from "jxlib";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<LoadDefaultTheme themeColor="#25730a" />

{@render children()}
