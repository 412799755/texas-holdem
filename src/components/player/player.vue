<template>
<div :class="{robot:player.isRobot,player:!player.isRobot}">
  <div>{{player.name}}</div>
  <div class="cards">
    <div v-for="(item,index) in player.cards" :key="index">{{item.name}}</div>
  </div>
  <div>
    <button>bet</button>
    <button>check</button>
    <button>call</button>
    <button>raise</button>
    <button>all in</button>
    <button @click="fold">fold</button>
  </div>
  <div>
    <span>剩余时间</span>
    <span>{{player.time}}</span>
  </div>
</div>
</template>

<script>
export default {
    name: 'player',
    methods: {
        fold () {
            this.player.fold()
        }
    },
    props: {
        player: Object
    }
}
</script>

<style scoped lang="scss">
  .player{
  background: #42b983;
    display: inline-block;
    width: 200px;
    height: 200px;
    .cards{
      display: flex;
    }
  }
  .robot{
    background: #ff2420;
    display: inline-block;
    width: 200px;
    height: 200px;
    .cards{
      display: flex;
    }
  }
</style>
