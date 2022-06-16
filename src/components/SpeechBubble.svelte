<script lang="ts" context="module">
	// Constants
	const DEFAULT_DURATION = 5000;

	// Types
	export type Message = Text[];
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import Dialogue, { type Text } from './Dialogue.svelte';

	export let messages: Message[] = [];

	let activeIndex = 0;
	$: activeMessage = messages[activeIndex];

	$: {
		if (browser && activeIndex < messages.length - 1) {
			window.setTimeout(() => {
				activeIndex += 1;
			}, DEFAULT_DURATION);
		}
	}

	let finished = false;
</script>

<div class="wrapper">
	<p>
		{finished ? 'finished' : 'not finished'}
	</p>
	<div class="bubble mt-4">
		{#if activeMessage}
			{#key activeIndex}
				<Dialogue text={activeMessage} on:finish={() => (finished = true)} />
			{/key}
		{/if}
	</div>
</div>

<style>
	.wrapper {
		/* max-width: 400px; */
		display: grid;
		place-items: center;
	}

	.bubble {
		background-color: var(--palette-grey-15);
		border-radius: var(--radii-sm);
		color: var(--white);
		font-family: var(--ff-mono);
		padding: 0.75rem 1rem;
		max-width: 400px;
	}
</style>
