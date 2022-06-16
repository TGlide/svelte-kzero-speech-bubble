<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';

	// Constants
	const CHAR_DELAY_STEP = 25;
	const TEXT_DELAY_STEP = 500;

	// Types
	type Color = 'yellow' | 'red' | 'rainbow' | 'purple';

	type BaseEffect = {
		charDelay: number;
	};

	export enum DialogueEffect {
		WAVE = 'wave',
		INTENSE = 'intense',
		IMPACT = 'impact',
		BASE = 'base',
	}

	const effects: Record<DialogueEffect, BaseEffect> = {
		[DialogueEffect.WAVE]: {
			charDelay: CHAR_DELAY_STEP,
		},
		[DialogueEffect.INTENSE]: {
			charDelay: 50,
		},
		[DialogueEffect.IMPACT]: {
			charDelay: 0,
		},
		[DialogueEffect.BASE]: {
			charDelay: CHAR_DELAY_STEP,
		},
	};

	export type Text = {
		text: string;
		color?: Color;
		effect?: DialogueEffect;
		skipDelay?: boolean;
	};

	type Char = { char: string; delay?: number; class?: string };
	type Word = Char[];

	const spaceChar: Char = { char: '', delay: 0 };
	spaceChar.toString = () => '&nbsp;';

	// Variants
	const charClass = cva('char', {
		variants: {
			effect: {
				[DialogueEffect.BASE]: '',
				[DialogueEffect.WAVE]: 'char--wave',
				[DialogueEffect.INTENSE]: 'char--intense',
				[DialogueEffect.IMPACT]: 'char--impact',
			},
			color: {
				yellow: 'char--yellow',
				red: 'char--red',
				rainbow: 'char--rainbow',
				purple: 'char--purple',
			},
		},
	});

	// Utilities
	const getCharToString = (char: Char) => {
		return () => {
			if (char.char === ' ') {
				return '&nbsp;';
			}
			return char.char;
		};
	};

	const getWords = (textArr: Text[]): Word[] => {
		const words: Word[] = [];
		let delay = 0;

		textArr.forEach(({ text, color, effect, skipDelay }, index) => {
			let word: Word = [];

			const isLast = index === textArr.length - 1;
			const effectObj = effects[effect || DialogueEffect.BASE];

			for (const char of text) {
				const charObj = { char, color, delay, class: charClass({ color, effect }) };
				charObj.toString = getCharToString(charObj);

				word.push(charObj);

				if (char === ' ') {
					words.push(word);
					word = [];
				}

				delay += effectObj.charDelay;
			}

			if (!isLast) {
				word.push(spaceChar);
			}

			words.push(word);
			delay += skipDelay ? 0 : TEXT_DELAY_STEP;
		});

		return words;
	};
</script>

<script lang="ts">
	export let text: Text[];

	$: words = getWords(text);
	$: totalDelay = words.at(-1)?.at(-1)?.delay || 0;

	const dispatch = createEventDispatcher<{
		finish: void;
	}>();

	let timeout: NodeJS.Timeout | null = null;
	$: {
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch('finish');
		}, totalDelay);
	}
</script>

<p>
	{#each words as word}
		<p>
			{#each word as char}
				<span class={char.class} style:--delay={`${char.delay}ms`}>{@html char}</span>
			{/each}
		</p>
	{/each}
</p>

<style lang="scss">
	@keyframes move {
		0% {
			opacity: 0;
			transform: translate(4px, 4px);
		}

		100% {
			opacity: 1;
			transform: translate(0, 0);
		}
	}

	@keyframes rainbow {
		0% {
			color: rgb(255, 0, 0);
		}
		8% {
			color: rgb(255, 127, 0);
		}
		16% {
			color: rgb(255, 255, 0);
		}
		25% {
			color: rgb(127, 255, 0);
		}
		33% {
			color: rgb(0, 255, 0);
		}
		41% {
			color: rgb(0, 255, 127);
		}
		50% {
			color: rgb(0, 255, 255);
		}
		58% {
			color: rgb(0, 127, 255);
		}
		66% {
			color: rgb(0, 0, 255);
		}
		75% {
			color: rgb(127, 0, 255);
		}
		83% {
			color: rgb(255, 0, 255);
		}
		91% {
			color: rgb(255, 0, 127);
		}
		100% {
			color: rgb(255, 0, 0);
		}
	}

	@keyframes shake {
		0% {
			transform: translate(0, 0);
		}
		10% {
			transform: translate(0.5px, 0.5px);
		}
		20% {
			transform: translate(-0.5px, -1px);
		}
		30% {
			transform: translate(1px, 0px);
		}
		40% {
			transform: translate(0px, -0.5px);
		}
		50% {
			transform: translate(-0.5px, 0.5px);
		}
		60% {
			transform: translate(0.5px, -0.5px);
		}
		70% {
			transform: translate(-1px, 0.5px);
		}
		80% {
			transform: translate(0.5px, -1px);
		}
		90% {
			transform: translate(-0.5px, 1px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	@keyframes wave {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-2px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	p {
		display: flex;
		flex-wrap: wrap;
	}

	.char {
		display: inline-block;
		$base-animation: move 250ms ease var(--delay, 0ms) both;
		animation: $base-animation;
		line-height: 1.5rem;

		/* Colors */
		&.char--rainbow {
			animation: $base-animation, rainbow 5000ms linear infinite;
		}

		&.char--red {
			color: var(--palette-red-60);
		}

		&.char--purple {
			color: var(--palette-purple-70);
		}

		&.char--yellow {
			color: var(--palette-yellow-80);
		}

		/* Effetcs */
		&.char--intense {
			animation: $base-animation, shake 750ms linear infinite var(--delay, 0ms);
		}

		&.char--wave {
			animation: $base-animation, wave 1000ms ease infinite var(--delay, 0ms);
		}
	}
</style>
