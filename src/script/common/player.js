export class Player {
    constructor ({ cards, isRobot, name, isPlaying }) {
        this.cards = cards
        this.name = name
        this.isRobot = isRobot
        this.isPlaying = isPlaying
        this.time = 0
    }
    fold () {
        this.strategy.next()
    }
}
