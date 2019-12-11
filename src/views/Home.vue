<template>
  <div class="home">
    <div class="flex ">
      <span>model:</span>
      <radio v-model="difficulty" :options="difficultyOptions" ></radio>
    </div>
    <div class="flex">
      <span>robot numbers:</span>
      <selects v-model="peopleNumber" :options="peopleNumberOptions"></selects>
    </div>
    <button @click="start">start</button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'home',
    data () {
        return {
            difficultyOptions: [{ name: 'easy', value: '1' }, { name: 'middle', value: '2' }, { name: 'hard', value: '3' }],
            difficulty: '1',
            peopleNumberOptions: [{ name: '1', value: '1' }, { name: '2', value: '2' }, { name: '3', value: '3' }, { name: '4', value: '4' }, { name: '5', value: '5' }, { name: '6', value: '6' }, { name: '7', value: '7' }, { name: '8', value: '8' }, { name: '9', value: '9' }],
            peopleNumber: '1'
        }
    },
    methods: {
        start () {
            console.log(this.difficulty, this.peopleNumber)
        }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
  .home{
    .flex{
      display: flex;
      justify-content: center;
    }
  }
</style>
