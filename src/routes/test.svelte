<script>
	let text = 'Wow! I love card games! And cyberpunk dystopias! Is it on Webflix?';
</script>

<section class="container">
	Test

	<p>
		{#each text as char}
			<span>{@html char}</span>
		{/each}
	</p>
</section>

<style>
	p {
		width: 290px;
		background: red;
	}
</style>
