<script lang="ts">
	import { DialogueEffect } from '$components/Dialogue.svelte';
	import SpeechBubble from '$components/SpeechBubble.svelte';

	let resetCount = 0;

	const reset = () => resetCount++;
</script>

<section>
	<div class="flex-col items-center gap">
		{#key resetCount}
			<SpeechBubble
				messages={[
					[
						{
							text: 'Hello,',
						},
						{ text: 'my name is', skipDelay: true },
						{ text: 'Thomas', color: 'cyan', skipTextSpace: true, skipDelay: true },
						{ text: ',' },
						{ text: 'and this is my', skipDelay: true },
						{
							text: 'portfolio!',
							color: 'rainbow',
							effect: DialogueEffect.WAVE,
						},
					],
					[
						{
							text: 'Wow!',
							color: 'rainbow',
							effect: DialogueEffect.IMPACT,
						},
						{
							text: 'I',
						},
						{
							text: 'love',
							color: 'red',
							effect: DialogueEffect.INTENSE,
						},
						{
							text: 'card games!',
						},
						{
							text: 'And',
							skipDelay: true,
						},
						{
							text: 'cyberpunk dystopias!',
							color: 'purple',
							effect: DialogueEffect.WAVE,
						},
						{
							text: 'Is it on',
							skipDelay: true,
						},
						{
							text: 'Webflix?',
							color: 'yellow',
						},
					],
				]}
			/>
		{/key}
		<button class="btn" on:click={reset}>Reset</button>
	</div>
</section>

<style lang="scss">
	section {
		position: relative;

		display: grid;
		place-items: center;
		height: 100vh;
	}
</style>
