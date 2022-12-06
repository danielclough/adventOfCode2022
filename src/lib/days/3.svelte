<script type="ts">
    import data from '$lib/data/3'
    let allElves = data.split('\n')
    let allElfPackHalves = splitPack(allElves)
    let groupElfPackHalves = splitGroups(allElves)
    $: total = 0
    $: sum = 0
    $: current = {
        ID: "",
        value: 0
    }

    // Split packs in half and return array of each half.
    function splitPack(packs: string[]) {
        return packs.map((x)=>{
            let half = x.length / 2
            return [x.slice(0,half), x.slice(half, x.length)]
        })
    }
    // Calculate Value
    function calculateValue(char){
        let upper = /[A-Z]/.test(char)
        return Number(!!upper ? parseInt(char, 36) -9 + 26 : parseInt(char, 36) -9)
    }
    // Find unique item in packs
    function findUnique(packs:string[]){
        let value = 0;
        let char = "";
        [...new Set(packs[0].split('').map((x)=>{
            if (packs[1].indexOf(x) !== -1) {
                char = packs[1][packs[1].indexOf(x)]
                value = calculateValue(char)
            }
        }))]
        total += value
        return {value, char}
    }
    // split all elves into groups 
    function splitGroups(all: string[]){
        let g: string[] = []
        let groups: string[][] = []
        all.forEach((c,i)=>{
            if ((i+1) % 3 === 0) {
                g.push(c)
                groups.push(g)
                g = []
            }else {
                g.push(c)
            }
        })
        return groups
    }

    // Find unique item for groups
    function findGroupID(group: string[]){
        let dup:string[] = [];
        let dbldup:string[] = [];

        group.forEach((elf,i)=>{
            if (i===1) {
                elf.split('').forEach((item)=>{
                    if (group[0].split('').indexOf(item) !== -1) {
                        dup.push(item)
                    }
                })
            } else if (i===2) {
                elf.split('').forEach((item)=>{
                    if (dup.indexOf(item) !== -1) {
                        dbldup.push(item)
                    }
                })
            }
        })
        return [...new Set(dbldup)][0]
    }
    // add sum of group priorities
    function addSum(value){
        sum += value
        return value
    }
</script>

<h1>Sum of group priorities: {sum} pts.</h1>
<section>
    {#each splitGroups(allElves) as group, i}
    <div class="group">
            <h3> Group {i}</h3>
            <div class="pack">
                <p>
                    Pack1: {group[0] && [...new Set(group[0])]}
                </p>
                <p>
                    Pack2: {group[1] && [...new Set(group[1])]}
                </p>
            </div>
            <p>
                Group ID: {current.ID = findGroupID(group)}
                Value: {addSum(calculateValue(current.ID))}
            </p>
        </div>
    {/each}
</section>
<h1>Total value of unique items carried: {total} pts.</h1>
<section>
    {#each allElfPackHalves as item, i}
    <div class="group">
            <h3> Elf {i}</h3>
            <div class="pack">
                <p>
                    Pack1: {item[0] && [...new Set(item[0])]}
                </p>
                <p>
                    Pack2: {item[1] && [...new Set(item[1])]}
                </p>
            </div>
            <p>
                Item Value: {findUnique(item).value}
            </p>
        </div>
    {/each}
</section>

<style>
    .group {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: content;
        margin: 1rem;
    }
	section {
		height: 23vh;
		overflow: scroll;
	}
    .pack {
        margin: 0 1rem;
        font-size: small;
    }
</style>