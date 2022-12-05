<script>
	import elf0 from '$lib/images/elf0.png';
	import elf1 from '$lib/images/elf1.png';
	import data from "$lib/data/1";
	$: elves = data.split('\n\n')
	$: greatest = 0
	$: elvesTotal = elves.map((elf)=>elf.split('\n').reduce((x,add)=>{
		let total = Number(x)+Number(add)
		if (greatest < total) greatest = total
		return total
	}))
	$: elvesTotal.sort((a,b)=> b-a)
	$: top3 = elvesTotal.splice(0,3)
</script>

<h1>
	How many calories are the top 3 Elfs carrying?
</h1>
<h2>
	{top3.reduce((x,add)=>Number(x)+Number(add))}
</h2>
<h3>
	Top 3 Elves
</h3>
<section>
	{#each top3 as elfTotal, i}
	<div class="elf {elfTotal === greatest && "greatest"}">
		<small>{i+1}</small>
		<img src={Math.random() > .5 ? elf0 : elf1} alt='elf' />
		<p>{elfTotal}</p>
	</div>	
	{/each}
</section>
<h3>
	Other Elves
</h3>
<section>
	{#each elvesTotal as elfTotal, i}
		{#if (i>3)}
			<div style="z-index:{1000-i}; opacity: {(225-i)*.001};" class="elf extra">
				<img src={Math.random() > .5 ? elf0 : elf1} alt='elf' />
				<!-- <p>{elfTotal}</p> -->
			</div>
		{:else}
			<div style="z-index:{1000-i};" class="elf extra">
				<img src={Math.random() > .5 ? elf0 : elf1} alt='elf' />
				<!-- <p>{elfTotal}</p> -->
			</div>
		{/if}
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		flex: 1;
		text-align: center;
		position: relative;
		height: content;
		overflow: clip;
	}
	.elf {
		width: 25%;
	}
	.elf img {
		width: 100%;
		aspect-ratio: 1 / 1.5;
		display: block;
		margin: auto;
		padding-top: .5rem;
	}
	.extra {
		height: 2vh;
	}
	.extra img {
		width: 27%;
		position: absolute;
	}
	.greatest {
		background-color: rgba(255,0,0,.1);
		margin: 1rem;
	}
</style>
