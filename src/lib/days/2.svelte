<script type="ts">
    import data from '$lib/data/2'
    let options = [
        {
            name: "rock",
            symbol: "🪨",
            losesTo: "📜",
            beats: "✂️",
            score: 1,
            opKey: "A",
            enc: "X",
        },
        {
            name: "paper",
            symbol: "📜",
            losesTo: "✂️",
            beats: "🪨",
            score: 2,
            opKey: "B",
            enc: "Y",
        },
        {
            name: "scissors",
            symbol: "✂️",
            losesTo: "🪨",
            beats: "📜",
            score: 3,
            opKey: "C",
            enc: "Z",
        }
    ]
    const cipher = [
        {
            key: "X",
            action: "lose"
        },
        {
            key: "Y",
            action: "draw"
        },
        {
            key: "Z",
            action: "win"
        },
    ]
    let outcome = {
        lose: 0,
        draw: 3,
        win: 6
    }
    let rounds = data.split('\n').map((x)=>{
        let pair = x.split(' ')
        return {opponent: pair[0], self: pair[1]}
    })
    $: current = {
        opponent:"",
        self:"",
    }
    $: wrongTotal = 0
    $: correctTotal = 0

    function whatToDo(opp,enc) {
        const o = opp.replace(/\s/g,"")
        let result = cipher.filter((x)=> x.key === enc)
        if (result.length > 0) {
            const act = result[0].action
            if (act === "lose") {
                return options.map((x) => {
                    if (x.symbol === o) {
                        return x.beats
                    } 
                }).join(' ')
            } else if (act === "draw") {
                return options.map((x) => {
                    if (x.symbol === o) {
                        return x.symbol
                    } 
                }).join(' ')
            } else {
                return options.map((x) => {
                    if (x.symbol === o) {
                        return x.losesTo
                    } 
                }).join(' ')
            }
        }
    }
    function loserIs(o,s) {
        const thing = options.filter((x) => x.symbol === o && x.beats === s)
        return thing.length > 0 ? true : false
    }
    function getScore(opponent, self, total) {
        let s = self.replace(/\s/g,"")
        let o = opponent.replace(/\s/g,"")

        let t = options.filter((x) => {
            if (x.symbol === s) return x
        })
        if (t[0] !== undefined) {
            let extraPoints = t[0].score
            if (o === s) {
                const points = outcome.draw + extraPoints
                total === "wrongTotal" ? wrongTotal += points :  correctTotal += points
                return points
            } 
            else if (loserIs(o,s)) {
                const points = outcome.lose + extraPoints
                total === "wrongTotal" ? wrongTotal += points :  correctTotal += points
                return points
            }
            else {
                const points = outcome.win + extraPoints
                total === "wrongTotal" ? wrongTotal += points :  correctTotal += points
                return points
            }
        }
    }
</script>
<h1>Correct Score: {correctTotal}</h1>

<section>
    {#each rounds as round, i}
        <div class="wrapper">
            <h2>{i}</h2>
            <div>
                <p>
                    {current.opponent = options.map((x) => {
                        if (x.opKey === round.opponent) return x.symbol
                    }).join(' ')}
                    {current.self = whatToDo(current.opponent, round.self) || ""}
                </p>
                <p>
                    Points: {getScore(current.opponent, current.self, "correctTotal")}
                </p>
            </div>
        </div>
    {/each}
</section>
<hr />
<h1>Wrong Score: {wrongTotal}</h1>

<section>
    {#each rounds as round, i}
        <div class="wrapper">
            <h2>{i}</h2>
            <div>
                <p>
                    {current.opponent = options.map((x) => {
                        if (x.opKey === round.opponent) return x.symbol
                    }).join(' ')}
                    {current.self = options.map((x) => {
                        if (x.enc === round.self) return x.symbol
                    }).join(' ')}
                </p>
                <p>
                    Points: {getScore(current.opponent, current.self, "wrongTotal")}
                </p>
            </div>
        </div>
    {/each}
</section>

<style>
    hr {
        margin: 1rem;
    }
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 23vh;
		overflow: scroll;
	}
    .wrapper {
        font-size: xx-large;
    }
</style>