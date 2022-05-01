import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export type Store = {
	disablePreviousNav: boolean;
};

export const store = writable<Store>({ disablePreviousNav: false });

export const disablePreviousNav = () => {
	onMount(() => {
		store.set({ disablePreviousNav: true });

		return () => {
			store.set({ disablePreviousNav: false });
		};
	});
};
