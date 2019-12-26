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
const cardTypeJudge = [
    { conditions: ['straight', 'flush'],
        name: 'straightFlush',
        type: 8
    },
    { conditions: ['fourOfAKind'],
        name: 'fourOfAKind',
        type: 7
    },
    { conditions: ['threeOfAKind', 'singleTwoOfAKind'],
        name: 'fullHouse',
        type: 6
    }, { conditions: ['flush'],
        name: 'flush',
        type: 5
    },
    { conditions: ['straight'],
        name: 'straight',
        type: 4
    },
    { conditions: ['threeOfAKind'],
        name: 'threeOfAKind',
        type: 3
    },
    { conditions: ['doubleTwoOfAKind'],
        name: 'twoPair',
        type: 2
    },
    { conditions: ['singleTwoOfAKind'],
        name: 'onePair',
        type: 1
    },
    { conditions: [],
        name: 'highCard',
        type: 0
    }
]

export function generateWholeCards (isJokerAdded) {
    let arr = []
    Object.entries(colorMap).forEach(([color, colorName]) => {
        cardMap.forEach(({ num, name }) => {
            arr.push({
                name: colorName + name,
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
function judgeCardType (cardGroup) {
    return {
        flush: flushDetail(cardGroup),
        straight: straightDetail(cardGroup),
        fourOfAKind: isFourOfAKind(cardGroup),
        threeOfAKind: isThreeOfAKind(cardGroup),
        doubleTwoOfAKind: isDoubleTwoOfAKind(cardGroup),
        singleTwoOfAKind: isSingleTwoOfAKind(cardGroup)
    }
}
function judgeMaxCardType (type) {
    let obj = {
        maxArr: type['flush'].maxArr,
        type: 0
    }
    for (let i = 0; i < cardTypeJudge.length; i++) {
        const judgeStrategy = cardTypeJudge[i]
        const isMatchAll = judgeStrategy['conditions'].every(item => {
            return type[item].isMatch
        })
        if (isMatchAll && judgeStrategy['conditions'].length) {
            obj.maxArr = type[judgeStrategy['conditions'][0]].maxArr
            obj.type = judgeStrategy.type
            return obj
        }
    }
    return obj
}
export function compare (cardA, cardB) {
    const typeObjA = judgeCardType(cardA)
    const typeObjB = judgeCardType(cardB)
    const cardAType = judgeMaxCardType(typeObjA)
    const cardBType = judgeMaxCardType(typeObjB)
    const typeA = cardAType.type
    const typeB = cardBType.type
    if (typeA > typeB) {
        return 1
    } else if (typeA < typeB) {
        return -1
    } else {
        return compareArr(cardAType.maxArr, cardBType.maxArr)
    }
}
function compareArr (arr1, arr2) {
    let len1 = arr1.length
    let len2 = arr2.length
    let result = 0
    if (len1 !== len2) throw Error('the lengths of array are not equal')
    for (let i = 0; i < len2; i++) {
        const tmp1 = parseInt(arr1[i])
        const tmp2 = parseInt(arr2[i])
        if (tmp1 > tmp2) {
            result = 1
            break
        } else if (tmp1 < tmp2) {
            result = -1
            break
        }
    }
    return result
}
function getMaxCard (cardGroup) {
    return [Math.max(...cardGroup.map(item => item.num))]
}
// 是否同花
export function flushDetail (cardGroup) {
    let color = cardGroup[0].color
    const isMatch = cardGroup.every(item => item.color === color)
    const maxArr = getMaxCard(cardGroup)
    return { isMatch, maxArr }
}

// 是否顺子
export function straightDetail (cardGroup) {
    let isMatch
    cardGroup.sort((a, b) => a.num - b.num)
    if (_ace2345(cardGroup)) {
        isMatch = true
    } else {
        isMatch = true
        cardGroup.reduce((prev, cur) => {
            isMatch = isMatch && _fewer1(prev.num, cur.num)
            return cur
        })
    }
    const maxArr = getMaxCard(cardGroup)
    return { isMatch, maxArr }
}

// 相差1
function _fewer1 (a, b) {
    return (b - a) === 1
}

// 是否A2345
function _ace2345 (cardGroup) {
    return cardGroup.map(item => item.num) === [2, 3, 4, 5, 14]
}

//  return {isMatch:是否匹配，maxArr:[]最大值数组}
export function isFourOfAKind (cardGroup) {
    const countMap = _groupByAmount(cardGroup)
    let isMatch = Object.entries(countMap).some(([name, amount]) => amount === 4)
    let { maxArr } = _sortByAmount(countMap)
    return { isMatch, maxArr }
}

export function isThreeOfAKind (cardGroup) {
    const countMap = _groupByAmount(cardGroup)
    let isMatch = Object.entries(countMap).some(([name, amount]) => amount === 3)
    let { maxArr } = _sortByAmount(countMap)
    return { isMatch, maxArr }
}
export function isDoubleTwoOfAKind (cardGroup) {
    const countMap = _groupByAmount(cardGroup)
    let { maxArr, numMap } = _sortByAmount(countMap)
    let isMatch = numMap['2'] && numMap['2'].length === 2
    return { isMatch, maxArr }
}
export function isSingleTwoOfAKind (cardGroup) {
    const countMap = _groupByAmount(cardGroup)
    let { maxArr, numMap } = _sortByAmount(countMap)
    let isMatch = numMap['2'] && numMap['2'].length === 1
    return { isMatch, maxArr }
}

function _groupByAmount (cardGroup) {
    const countMap = {}
    cardGroup.forEach(card => {
        if (countMap[card.num]) {
            countMap[card.num]++
        } else {
            countMap[card.num] = 1
        }
    })
    return countMap
}
function _sortByAmount (countMap) {
    const numMap = {}
    let maxArr = []
    Object.entries(countMap).forEach(([cardNum, count]) => {
        numMap[count] = numMap[count] || []
        numMap[count].push(cardNum)
    })
    Object.keys(numMap).sort(compareNumber).reverse().forEach(value => {
        maxArr = [...maxArr, ...numMap[value].sort(compareNumber).reverse()]
    })
    return { maxArr, numMap }
}
function compareNumber (a, b) {
    return parseInt(a) - parseInt(b)
}
