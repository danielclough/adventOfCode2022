function spliceBuffer(arr,len){
    return arr.splice(0,len)
}

// if buffer is not all unique
//   returns index of first item that is duplicated
// else returns -1
function checkBuffer(buffer){
    let signal = -1
    for (let [i,b] of buffer.entries()) {
        for (let [j,bu] of buffer.entries()) {
            if (i<=j) break
            if (b === bu) {
                return signal = j +1
            }
        }
    }
    return signal
}

// if arr is not all unique
//   returns index of duplication
// else returns -1 (passed from checkBuffer)
export function checkArr(arr,n) {
    let last = spliceBuffer(arr,n)
    let check = checkBuffer(last)
    if (check !== -1) {
        let fromLast = last.splice(check, last.length)
        let use = [...fromLast,...arr]
        return checkArr(use,n)
    } else return last
}

function compareArrs(a1,a2){
    return a1.join("") === a2.join("")
}


export function findPos(arr, subarr, len) {
    
    // for (let i=0;  i<len; i++) {
    //     testy[i] = arr[i]
    // }
    for (let i=0;  i<arr.length-4;i++) {
        let testy = Array.from({length: len},(x,j)=>arr[i+j])
        if (!!compareArrs(subarr, testy)) {
            return i + subarr.length
        }
    }
}