// 点数14代表A
const colorMap = { '1': '黑桃', '2': '梅花', '3': '红桃', '4': '方片' }
const jokerMap = { '5': '小王', '6': '大王' }
const cardMap = [
    { num: 2, name: '2' },
    { num: 3, name: '3' },
    { num: 4, name: '4' },
    { num: 5, name: '5' },
    { num: 6, name: '6' },
    { num: 7, name: '7' },
    { num: 8, name: '8' },
    { num: 9, name: '9' },
    { num: 10, name: '10' },
    { num: 11, name: 'J' },
    { num: 12, name: 'Q' },
    { num: 13, name: 'K' },
    { num: 14, name: 'A' }
]
export function generateWholeCards (isJokerAdded) {
    let arr = []
    colorMap.entities().forEach((color, colorName) => {
        cardMap.forEach(({ num, cardName }) => {
            arr.push({
                name: colorName + cardName,
                color: color,
                num: num
            })
        })
    })
    if (isJokerAdded) {
        arr = [...arr, { color: 5, name: jokerMap[5] }, { color: 6, name: jokerMap[6] }]
    }
    return arr
}
//
export function compare (cardA, cardB) {

}
// 是否同花
export function isFlush (cardGroup) {
    let color = cardGroup[0].color
    return cardGroup.every(item => item.color === color)
}

// 是否顺子
export function isStraight (cardGroup) {
    cardGroup.sort((a, b) => a.num - b.num)
    if (_ace2345(cardGroup)) {
        return true
    } else {
        let result = true
        cardGroup.reduce((prev, cur) => {
            result = result && _fewer1(prev, cur)
            return cur
        })
        return result
    }
}

// 相差1
function _fewer1 (a, b) {
    return (b - a) === 1
}

// 是否A2345
function _ace2345 (cardGroup) {
    return cardGroup.map(item => item.num) === [2, 3, 4, 5, 14]
}
