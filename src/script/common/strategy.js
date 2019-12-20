
export class Strategy {
    constructor ({ players, startIndex, maxTime }) {
        this.tmpIndex = startIndex
        this.players = players
        this.maxTime = maxTime
        this.start()
    }
    next () {
        this.clearTimer()
        this.tmpIndex++
        this.tmpIndex %= this.players.length
        this.startTimer()
    }
    start () {
        for (let i = 0; i < this.players.length; i++) {
            const argument = this.players[i]
            argument.strategy = this
        }
        this.startTimer()
    }
    startTimer () {
        var time = this.maxTime
        this.timer = setInterval(() => {
            time--
            this.players[this.tmpIndex].time = time
            console.log(this.players[this.tmpIndex])
        }, 1000)
    }
    clearTimer () {
        clearInterval(this.timer)
        this.players[this.tmpIndex].time = this.maxTime
    }
}
