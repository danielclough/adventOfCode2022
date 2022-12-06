<script>
	import One from '$lib/days/1.svelte';
	import Two from '$lib/days/2.svelte';
	import Three from '$lib/days/3.svelte';
	import Four from '$lib/days/4.svelte';
	import Five from '$lib/days/5.svelte';
	// import Six from '$lib/days/6.svelte';
	// import Seven from '$lib/days/7.svelte';
	// import Eight from '$lib/days/8.svelte';
	// import Nine from '$lib/days/9.svelte';
	// import Ten from '$lib/days/10.svelte';
	// import Eleven from '$lib/days/11.svelte';
	// import Twelve from '$lib/days/12.svelte';
	// import Thriteen from '$lib/days/13.svelte';
	// import Fourteen from '$lib/days/14.svelte';
	// import Fifteen from '$lib/days/15.svelte';
	// import Sixteen from '$lib/days/16.svelte';
	// import Seventeen from '$lib/days/17.svelte';
	// import Eightteen from '$lib/days/18.svelte';
	// import Nineteen from '$lib/days/19.svelte';
	// import Twenty from '$lib/days/20.svelte';
	// import TwentyOne from '$lib/days/21.svelte';
	// import TwentyTwo from '$lib/days/22.svelte';
	// import TwentyThree from '$lib/days/23.svelte';
	// import TwentyFour from '$lib/days/24.svelte';
	// import TwentyFive from '$lib/days/25.svelte';
	const days = [
		{n:1, component: One},
		{n:2, component: Two},
		{n:3, component: Three},
		{n:4, component: Four},
		{n:5, component: Five},
		// {n:6, component: Six},
		// {n:7, component: Seven},
		// {n:8, component: Eight}
		// {n:9, component: Nine},
		// {n:10, component: Ten},
		// {n:11, component: Eleven},
		// {n:12, component: Twelve},
		// {n:13, component: Thriteen},
		// {n:14, component: Fourteen}
		// {n:15, component: Fifteen},
		// {n:16, component: Sixteen},
		// {n:17, component: Seventeen},
		// {n:18, component: Eightteen}
		// {n:19, component: Nineteen},
		// {n:20, component: Twenty},
		// {n:21, component: TwentyOne},
		// {n:22, component: TwentyTwo},
		// {n:23, component: TwentyThree},
		// {n:24, component: TwentyFour}
		// {n:25, component: TwentyFive}
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