<script type="ts">
    import data from "$lib/data/4"
    let groups = data.split('\n')
    let dups = 0
    let pDups = 0
    function parseGroup(group){
        const [a,b] = group.split(',')
        const [aLow, aHigh] = a.split('-')
        const [bLow, bHigh] = b.split('-')
        return [aLow, aHigh, bLow, bHigh]
    }
    function checkFullDups(groups) {
        for (let group of groups) {
            if (group.length > 1) {
                const [aLow, aHigh, bLow, bHigh] = parseGroup(group)
                if ((Number(aLow) >= Number(bLow) && Number(aHigh) <= Number(bHigh)) || (Number(aLow)<=Number(bLow) && Number(aHigh) >= Number(bHigh))) {
                    dups += 1
                }
            }
        }
    }
    function checkPartialDups(groups) {
        for (let group of groups) {
            if (group.length > 1) {
                const [aLow, aHigh, bLow, bHigh] = parseGroup(group)
                if ((Number(aLow) >= Number(bLow) && Number(aLow) <= Number(bHigh)) || (Number(bLow)>=Number(aLow) && Number(bLow) <= Number(aHigh))) {
                    pDups += 1
                }
            }
        }
    }
    checkPartialDups(groups)
    checkFullDups(groups)
</script>

<h1>
    Partly Duplicated Tasks: {pDups}
</h1>
<h1>
    Fully Duplicated Tasks: {dups}
</h1>