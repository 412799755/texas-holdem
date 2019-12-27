<template>
    <div>
      <button @click="start">开始模拟</button>
      <div>
        <p>mine</p>
        <selects v-for="(it,index ) in  2" :key="index" v-model="mine[index].a" :options="stack"></selects>
      </div>
      <div>
        <p>public</p>
        <selects v-for="(it,index ) in  5" :key="index" v-model="shared[index].a" :options="stack"></selects>
      </div>
      <div>
        <p>胜率</p>
        <p>{{rate}}</p>
        <p>平率</p>
        <p>{{tie}}</p>
        <p>我的最大</p>
        <p v-for="(item,index) in myMax" :key="index">{{item.name}}</p>
      </div>
    </div>
</template>
<script>
import Probability from '../script/common/probability'
let publicCardGroup
let myCardGroup
let leftCardGroup
export default {
    name: 'Probability',
    data () {
        return {
            mine: [{ a: '红桃A' }, { a: '梅花A' }],
            shared: [{ a: '方片3' }, { a: '梅花3' }, { a: '黑桃3' }, { a: '红桃10' }, { a: '红桃9' }],
            // stack: []
            rate: '',
            tie: '',
            myMax: []
        }
    },
    created () {
        this.dealer = new this.Dealer({
            peopleNumber: this.peopleNumber,
            difficulty: this.difficulty
        })
        this.stack = this.dealer.stack.map(item => {
            item.value = item.name
            return item
        })
        // function copy (str) {
        //     return JSON.parse(JSON.stringify(str))
        // }
        // let obj = this.getStore()
        // publicCardGroup = obj.publicCardGroup || this.dealer.stack.slice(2, 7)
        // myCardGroup = obj.myCardGroup || this.dealer.stack.slice(0, 2)
        // leftCardGroup = obj.leftCardGroup || this.dealer.stack.slice(7)
        // console.log(copy(publicCardGroup), copy(myCardGroup))
        // let p = new Probability({
        //     publicCardGroup: publicCardGroup,
        //     myCardGroup: myCardGroup,
        //     leftCardGroup: leftCardGroup
        // })
        // console.log(p)
    },
    methods: {
        start () {
            let publicCardNames = this.shared.map(item => item.a)
            let myCardNames = this.mine.map(item => item.a)
            publicCardGroup = this.filterByValue(publicCardNames)
            myCardGroup = this.filterByValue(myCardNames)
            leftCardGroup = this.minusByValue([...publicCardNames, ...myCardNames])
            // console.log(publicCardGroup, myCardGroup, leftCardGroup)
            let p = new Probability({
                publicCardGroup: publicCardGroup,
                myCardGroup: myCardGroup,
                leftCardGroup: leftCardGroup
            })
            this.rate = 100 * p[1] / (p[0] + p[1] + p[-1]) + '%'
            this.tie = 100 * p[0] / (p[0] + p[1] + p[-1]) + '%'
            this.myMax = p.myMax
            // console.log(p)
        },
        filterByValue (values) {
            return this.stack.filter(item => ~values.indexOf(item.name))
        },
        minusByValue (values) {
            return this.stack.filter(item => !~values.indexOf(item.name))
        }
    }
}
</script>

<style scoped>

</style>
