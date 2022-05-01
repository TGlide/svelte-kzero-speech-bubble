import { writable } from 'svelte/store';

export type Store = {
	disablePreviousNav: boolean;
};

export const store = writable<Store>({ disablePreviousNav: false });
