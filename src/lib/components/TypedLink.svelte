<script lang="ts" context="module">
	let current = writable<HTMLAnchorElement | null>(null);
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let ref: HTMLAnchorElement;
	export let text: string;
	export let href: string;
	export let instantKeys: string[] = [];

	let lettersFilled = 0;

	// Reset lettersFilled when current changes
	$: {
		if ($current !== ref) {
			lettersFilled = 0;
		}
	}

	const onKeydown = (e: KeyboardEvent) => {
		if (instantKeys.includes(e.key)) {
			$current = ref;

			if (lettersFilled === text.length) {
				goto(href);
			} else {
				lettersFilled = text.length;
			}

			return;
		}

		if (e.key === 'Backspace') {
			return ($current = null);
		}

		if (e.key === 'Enter' && $current === ref) {
			if (lettersFilled === text.length) {
				goto(href);
			} else {
				lettersFilled = text.length;
			}
			return;
		}

		if (
			lettersFilled < text.length &&
			text[lettersFilled].toLowerCase() === e.key.toLowerCase() &&
			[ref, null].includes($current)
		) {
			lettersFilled++;
			$current = ref;
		}
	};

	onMount(() => {
		$current = null;
	});
</script>

<svelte:window on:keydown={onKeydown} />

<a class:filled={lettersFilled === text.length} {href} bind:this={ref}>
	{#each text as char, idx}
		{@const filled = idx < lettersFilled}
		<span class:filled>{char}</span>
	{/each}
</a>

<style>
	a {
		display: flex;
		transition: transform 0.25s ease;
	}

	a:hover,
	a.filled {
		transform: scale(1.25);
	}

	a:hover span {
		opacity: 1;
	}

	span {
		opacity: var(--initial-opacity, 0.375);
		transition: opacity 0.25s ease;
	}

	span.filled {
		opacity: 1;
	}
</style>
