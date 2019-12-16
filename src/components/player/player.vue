<template>
<div :class="{robot:isRobot,player:!isRobot}">
  <div>{{name}}</div>
  <div v-for="(item,index) in cards" :key="index">{{item.name}}</div>
</div>
</template>

<script>
export default {
    name: 'player',
    props: {
        cards: Array,
        name: String,
        isRobot: Boolean
    }
}
</script>

<style scoped lang="scss">
  .player{
  background: #42b983;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  .robot{
    background: #ff2420;
    display: inline-block;
    width: 100px;
    height: 100px;
  }
</style>
