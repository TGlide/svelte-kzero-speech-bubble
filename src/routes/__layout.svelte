<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { store } from '$lib/store';
	import '../app.css';

	let previousPage: string | null;
	afterNavigate((navigation) => {
		if (navigation.from) {
			previousPage = navigation.from.pathname;
		}
	});

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Backspace' && previousPage && !$store.disablePreviousNav) {
			goto(previousPage);
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />

<main>
	<slot />
</main>
