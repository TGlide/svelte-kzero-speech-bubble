<script lang="ts">
	import TypedText from '$lib/components/TypedText.svelte';
	import { disablePreviousNav } from '$lib/store';

	disablePreviousNav();
</script>

<section>
	<div class="wrapper">
		<div class="about">
			<TypedText text="About" href="about" instantKeys={['ArrowUp']} />
		</div>

		<div class="projects">
			<TypedText text="Projects" href="projects" instantKeys={['ArrowRight']} />
		</div>

		<div class="blog">
			<TypedText text="Blog" href="blog" instantKeys={['ArrowDown']} />
		</div>

		<div class="contact">
			<TypedText text="Contact" href="contact" instantKeys={['ArrowLeft']} />
		</div>

		<h1>Thomas</h1>
	</div>
</section>

<style>
	section {
		display: grid;
		place-items: center;
		height: 100vh;
	}

	h1 {
		font-family: var(--ff-display);
		font-size: 5rem;
	}

	.wrapper {
		position: relative;
	}

	.wrapper > div {
		position: absolute;
	}

	.wrapper > .about {
		bottom: calc(100% + 6.5rem);
		left: 50%;
		transform: translateX(-50%);
	}

	.wrapper > .projects {
		top: 60%;
		left: calc(100% + 5rem);
		transform: translateY(-50%);
	}

	.wrapper > .blog {
		top: calc(100% + 6.5rem);
		left: 50%;
		transform: translateX(-50%);
	}

	.wrapper > .contact {
		top: 60%;
		right: calc(100% + 5rem);
		transform: translateY(-50%);
	}
</style>
