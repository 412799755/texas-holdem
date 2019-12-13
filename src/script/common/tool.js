// 点数14代表A
const colorMap = { '1': '黑桃', '2': '梅花', '3': '红桃', '4': '方片', '5': '小王', '6': '大王' }
export function generateWholeCards (isJokerAdded) {
    let arr = []
    for (let i = 1; i < 5; i++) {
        for (let j = 2; j < 15; j++) {
            arr.push({
                name: colorMap[i] + (j % 14),
                color: i,
                num: j
            })
        }
    }
    if (isJokerAdded) {
        arr.push(...[{ color: 5, name: colorMap[5] }, { color: 6, name: colorMap[6] }])
    }
    return arr
}
//
export function compare (cardA, cardB) {

}
// 是否同花
function isFlush (cardGroup) {
    let color = cardGroup[0].color
    return cardGroup.every(item => item.color === color)
}


