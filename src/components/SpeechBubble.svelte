<script lang="ts" context="module">
	// Constants
	const FINISH_DELAY = 3000;

	// Types
	export type Message = Text[];
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Dialogue, { type Text } from './Dialogue.svelte';

	export let messages: Message[] = [];

	let activeIndex = 0;
	$: activeMessage = messages[activeIndex];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	const handleFinish = () => {
		window.setTimeout(() => {
			if (activeIndex >= messages.length) {
				return;
			}
			activeIndex++;
		}, FINISH_DELAY);
	};
</script>

<div class="wrapper">
	{#if activeMessage && mounted}
		{#key activeIndex}
			<div class="bubble mt-4" in:scale={{ delay: 600 }} out:scale={{ duration: 500 }}>
				<Dialogue text={activeMessage} on:finish={handleFinish} />
			</div>
		{/key}
	{/if}
</div>

<style>
	.wrapper {
		display: grid;
		place-items: center;
	}

	.bubble {
		background-color: var(--palette-grey-15);
		border-radius: var(--radii-sm);
		color: var(--white);
		font-family: var(--ff-mono);
		padding: 0.75rem 1rem;
	}
</style>
