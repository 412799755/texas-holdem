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
    { conditions: ['flush', 'straight'],
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
        maxArr: []
    }
    for (let i = 0; i < cardTypeJudge.length; i++) {
        const judgeStrategy = cardTypeJudge[i]
        const isMatchAll = judgeStrategy['conditions'].every(item => {
            return type[item].isMatch
        })
        if (isMatchAll) {
            judgeStrategy['conditions'].forEach(item => {
                obj.maxArr.push(type[item].maxArr)
            })
            return obj
        }
    }
}
export function compare (cardA, cardB) {
    const cardAType = judgeMaxCardType(judgeCardType(cardA))
    const cardBType = judgeMaxCardType(judgeCardType(cardB))
    const typeA = cardAType.type
    const typeB = cardBType.type
    const num1 = String(cardAType.maxArr).replace(/,/g, '')
    const num2 = String(cardBType.maxArr).replace(/,/g, '')
    if (typeA > typeB) {
        return '1'
    } else if (typeA < typeB) {
        return '0'
    } else {
        return num1 > num2 ? '1' : (num1 < num2 ? '0' : '2')
    }
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

// 是否四条 todo return {isMatch:是否匹配，maxArr:[]最大值数组}
export function isFourOfAKind (cardGroup) {
  const countMap = _groupByAmount(cardGroup)
  let isMatch = countMap.some((name, amount) => amount === 4)
  return { isMatch, maxArr }
}

// 是否三条
export function isThreeOfAKind (cardGroup) {
    const countMap = _groupByAmount(cardGroup)
    return countMap.some((name, amount) => amount === 3)
}
// 是否两对
export function isDoubleTwoOfAKind () {

}
// 是否只有一对
export function isSingleTwoOfAKind () {

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
