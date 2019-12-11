// color:
// 5:black joker 6:red joker
const colorMap = { '1': '黑桃', '2': '梅花', '3': '红桃', '4': '方片', '5': '小王', '6': '大王' }
function generateWholeCards (isJokerAdded) {
    let arr = []
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 14; j++) {
            arr.push({
                name: colorMap[i] + j,
                color: i,
                num: j
            })
        }
    }
    if (isJokerAdded) {
        arr.push(...[{ color: 5, name: colorMap[i] }, { color: 6, name: colorMap[i] }])
    }
    return arr
}
function
function Dealer (isJokerAdded) {
    this.isJokerAdded = isJokerAdded
    this.stack = generateWholeCards(isJokerAdded)
    this.public = []
}
Dealer.prototype.restart = function () {
    this.stack = generateWholeCards(this.isJokerAdded)
}
Dealer.prototype.sendCards = function () {
  this.stack = generateWholeCards(this.isJokerAdded)
}

