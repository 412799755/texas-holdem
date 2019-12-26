<template>
    <div>
      <button @click="save">记录模拟值</button>
      <button @click="clear">清除模拟值</button>
    </div>
</template>
<script>
import Probability from '../script/common/probability'
export default {
    name: 'Probability',
    data () {
        return {
            publicCardGroup: [],
            myCardGroup: [],
            leftCardGroup: []
        }
    },
    created () {
        this.dealer = new this.Dealer({
            peopleNumber: this.peopleNumber,
            difficulty: this.difficulty
        })
        function copy (str) {
            return JSON.parse(JSON.stringify(str))
        }
        this.publicCardGroup = this.dealer.stack.slice(2, 7)
        this.myCardGroup = this.dealer.stack.slice(0, 2)
        this.leftCardGroup = this.dealer.stack.slice(7)
        console.log(copy(this.dealer.stack.slice(2, 7)), copy(this.dealer.stack.slice(0, 2)))
        let p = new Probability({
            publicCardGroup: this.publicCardGroup,
            myCardGroup: this.myCardGroup,
            leftCardGroup: this.leftCardGroup
        })
        console.log(p)
    },
    methods: {
        save () {
            localStorage.setItem('publicCardGroup', JSON.stringify(this.publicCardGroup))
            localStorage.setItem('myCardGroup', JSON.stringify(this.myCardGroup))
            localStorage.setItem('leftCardGroup', JSON.stringify(this.myCardGroup))
        },
        clear () {
            localStorage.clear()
        }
    }
}
</script>

<style scoped>

</style>
