import { generateWholeCards } from './tool'
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
