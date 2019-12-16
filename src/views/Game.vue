<template>
    <div class="game">
      <div class="publicCard">
        <div>public Cards：</div>
        <div v-for="(card,index) in dealer.publicCards" :key="index">{{card.name}}</div>
      </div>
      <div class="robots">
        <player v-for="(player,index) in dealer.robots" :name="player.name" :cards="player.cards" :isRobot="true" :key="index"></player>
      </div>
      <div class="player">
        <player :name="dealer.user.name" :cards="dealer.user.cards" :isRobot="false"></player>
      </div>
    </div>
</template>

<script>
import player from '../components/player/player'
export default {
    name: 'Game',
    components: {
        player
    },
    data () {
        return {
            peopleNumber: this.$route.query.peopleNumber,
            difficulty: this.$route.query.difficulty,
            dealer: {
                user: {},
                robots: [],
                publicCards: []
            }
        }
    },
    created () {
        this.dealer = new this.Dealer({
            peopleNumber: this.peopleNumber,
            difficulty: this.difficulty
        })
        console.log(this.dealer)
    }
}
</script>

<style scoped lang="scss">
.game{

}
</style>
