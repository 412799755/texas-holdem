<template>
    <div>
      <select @change="change($event)">
        <option v-for="(item,index) in options" :key="index" :name="name" :value="item.value" :selected="item.value === value" >{{item.name}}
        </option>
      </select>
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
