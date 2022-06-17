<script lang="ts">
	import { DialogueEffect } from '$components/Dialogue.svelte';
	import SpeechBubble from '$components/SpeechBubble.svelte';
	import TypedLink from '$components/TypedLink.svelte';
	import { disablePreviousNav } from '$lib/store';

	disablePreviousNav();
</script>

<section>
	<div class="wrapper">
		<div class="about">
			<TypedLink text="About" href="about" instantKeys={['ArrowUp']} />
		</div>

		<div class="projects">
			<TypedLink text="Projects" href="projects" instantKeys={['ArrowRight']} />
		</div>

		<div class="blog">
			<TypedLink text="Blog" href="blog" instantKeys={['ArrowDown']} />
		</div>

		<div class="contact">
			<TypedLink text="Contact" href="contact" instantKeys={['ArrowLeft']} />
		</div>

		<div class="center">
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
		</div>
	</div>
	<div class="test">
		<TypedLink text="Test" href="test" --initial-opacity="0" />
	</div>
</section>

<style lang="scss">
	section {
		position: relative;

		display: grid;
		place-items: center;
		height: 100vh;
	}

	.wrapper {
		position: relative;

		> .center {
			display: grid;
			place-items: center;
			width: 400px;
			height: 100px;
		}

		> .about {
			position: absolute;
			bottom: calc(100% + 6.5rem);
			left: 50%;
			transform: translateX(-50%);
		}

		> .projects {
			position: absolute;
			top: 60%;
			left: calc(100% + 5rem);
			transform: translateY(-50%);
		}

		> .blog {
			position: absolute;
			top: calc(100% + 6.5rem);
			left: 50%;
			transform: translateX(-50%);
		}

		> .contact {
			position: absolute;
			top: 60%;
			right: calc(100% + 5rem);
			transform: translateY(-50%);
		}
	}

	.test {
		position: absolute;
		bottom: calc(0% + 1rem);
		left: 50%;
		transform: translateX(-50%);
	}
</style>
