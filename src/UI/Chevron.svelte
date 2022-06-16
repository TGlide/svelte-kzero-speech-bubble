<script lang="ts">
	type Direction = 'left' | 'right' | 'up' | 'down';

	let direction: Direction = 'down';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={direction}
>
	<polyline points="6 9 12 15 18 9" />
</svg>

<style>
	svg {
		color: var(--chevron-color);
	}

	.up {
		transform: rotate(180deg);
	}

	.right {
		transform: rotate(-90deg);
	}

	.left {
		transform: rotate(90deg);
	}

	.down {
		transform: rotate(0deg);
	}
</style>
