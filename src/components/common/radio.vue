<template>
    <div>
      <label v-for="(item,index) in options" :key="index">
        <input type="radio" :name="name" :value="item.value" :checked="item.value === value" @change="change($event)">{{item.name}}
      </label>
    </div>
</template>

<script>
export default {
    name: 'radio',
    props: {
        options: Array,
        value: String
    },
    data () {
        return {
            name: ''
        }
    },
    methods: {
        change (e) {
            this.$emit('input', e.target.value)
            console.log(e)
        }
    },
    created () {
        this.name = this.guid()
    }
}
</script>

<style scoped>

</style>
