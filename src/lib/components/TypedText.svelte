<script lang="ts" context="module">
	// Global variable so that only 1 typed text can be filled at a time
	let maxLettersFilled = 0;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let text: string;
	export let href: string;

	let lettersFilled = 0;

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Backspace') {
			lettersFilled = 0;
			maxLettersFilled = 0;
		}

		if (e.key === 'Enter' && lettersFilled === text.length) {
			goto(href);
		}

		if (text[lettersFilled].toLowerCase() === e.key.toLowerCase()) {
			lettersFilled++;
		}

		if (lettersFilled > maxLettersFilled) {
			maxLettersFilled = lettersFilled;
		}

		if (lettersFilled !== maxLettersFilled) {
			// Only allow the component with the most typed letters to be focused
			lettersFilled = 0;
		}
	};

	onMount(() => {
		maxLettersFilled = 0;
	});
</script>

<svelte:window on:keydown={onKeydown} />

<a {href}>
	{#each text as char, idx}
		{@const filled = idx < lettersFilled}
		<span class:filled>{char}</span>
	{/each}
</a>

<style>
	a:hover span {
		opacity: 1;
	}

	span {
		opacity: 0.5;
	}

	.filled {
		opacity: 1;
	}
</style>
