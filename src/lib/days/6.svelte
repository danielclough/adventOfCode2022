<script type="ts">
    import data from "$lib/data/6"
	import { checkArr, findPos } from "./6";
    
    let split = data.split('')
    const key = {
        code: 4,
        message: 14,
    }
    let code = checkArr(split,key.code)
    let posOfCode = findPos(data.split(''), code, key.code)
    let message = checkArr(split,key.message)
    let posOfMessage = findPos(data.split(''), message, key.message)
</script>
<h1>
    First Code: {code}
</h1>
<h2>
    Start of Packet: {posOfCode}
</h2>
<h1>
    First Message: {message}
</h1>
<h2>
    Start of Message: {posOfMessage}
</h2>
<style>
    h2 {
        text-align: center;
    }
</style>