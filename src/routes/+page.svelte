<script>
	import One from '$lib/days/1.svelte';
	import Two from '$lib/days/2.svelte';
	import Three from '$lib/days/3.svelte';
	const days = [
		{n:1, component: One},
		{n:2, component: Two},
		{n:3, component: Three}
	]
	let selected = days[days.length -1]
</script>
<h1>
	Advent of code day: 
	<select bind:value={selected}>
		{#each days as option}
			<option value={option}>{option.n}</option>
		{/each}
	</select>
</h1>


<svelte:component this={selected.component} />

<style>
	select {
		width: fit-content;
		font-size: xx-large;
		padding: .5rem 1rem;
		background-color: rgba(255, 255, 255, .1);
		border: none;
		border-radius: 10%;
		color: wheat;
	}
</style>