<script type="ts">
    import data from "$lib/data/5"
    let groups = data.split('\n\n')
    let rows = groups[0].split('\n')
    let splitRows = rows.map((x)=>{
        return x.split('')
    })
    let columns = splitRows[splitRows.length-1]
    let stacksKeys: string[] = []
    // prepare stack keys
    let keyRow = rows[rows.length-1];
    keyRow.split('').forEach((x,i)=>{
        if (/\d/.test(columns[i])) {
            stacksKeys.push(columns[i])
        }
    })
    // prepare stacks
    let stacks = Array.from({length:stacksKeys.length},()=>[])
    $: liveStack = stacks
    // fill stacks
    rows.forEach((row,i)=>{
        if (row.length > 0 ) {
            row.split('').forEach((x,j)=>{
                if (/[A-Z]/.test(x)) {
                    let key = keyRow[j]
                    stacks[key-1].push(x)
                }
            })
        }
    })
    // work through steps
    let stepsRaw = groups[1].split('\n')
    let steps: number[] = []
    for (let step of stepsRaw) {
        let stepArr = []
        step.split(' ').forEach((x)=>{
            if (/\d/.test(x)) stepArr.push(x)
        })
        steps.push(stepArr)    
    }
    $: final = ""
    let versions = [ 9000, 9001]
    let version = versions[1]
</script>

<div class="hidden">
    {steps.forEach((x)=>{
        const [n, from, to] = x
        if (!!liveStack[from-1] && !!n && !!liveStack[to-1]) {
            if (version === 9000) {
                for (let i=0;i<n;i++) {
                    let itm = liveStack[from-1].shift()
                    liveStack[to-1].unshift(itm)
                }
            } else {
                let itms = liveStack[from-1].splice(0,n)
                for (let itm of itms.reverse()) {
                    liveStack[to-1].unshift(itm)
                }
            }
        }
    })}
</div>


{final = liveStack.map((x)=>{
    return x[0]
}).join('')}

<section>
    <div class="container">
        {#each liveStack as item}
            <div class="stack">
                {#each item as i}
                    <h1>
                        {i}
                    </h1>
                {/each}
            </div>
        {/each}    
    </div>
</section>
<h1>

    {JSON.stringify(stacksKeys)}
</h1>

<h3>
    Steps:
</h3>
{JSON.stringify(steps)}

<style>
    select {
        width: fit-content;
        font-size: large;
    }
    .stack h1 {
        background-color: rgba(255,0,0,.5);
        border: 1px solid black;
        padding: .1rem;
        margin: 0 .75rem;
    }
    .hidden {
        display: none;
    }
    .container {
        display: grid;
        align-items: end;
        grid-auto-flow: column;
    }
</style>