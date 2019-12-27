import { compare } from './tool'
export default class Probability {
    constructor ({ publicCardGroup, myCardGroup, leftCardGroup }) {
        this.probabilityMap = {
            '1': 0,
            '-1': 0,
            '0': 0
        }
        let myMax = this.selectMaxFromCardGroupList(this.combination([...publicCardGroup, ...myCardGroup], 5))
        this.probabilityMap.myMax = myMax
        let otherOptions = this.combination(leftCardGroup, 2)
        for (let i = 0; i < otherOptions.length; i++) {
            const otherOption = otherOptions[i]
            const otherMax = this.selectMaxFromCardGroupList(this.combination([...publicCardGroup, ...otherOption], 5))
            this.probabilityMap[compare(myMax, otherMax)]++
        }
        return this.probabilityMap
    }
    combination (arr, size) {
        let allResult = []
        function choose (arr, size, result) {
            let len = arr.length
            if (len < size) return
            if (len === size) {
                allResult = [...allResult, [...result, ...arr]]
            } else {
                for (let i = 0; i <= len - size; i++) {
                    let newResult = [...result]
                    newResult.push(arr[i])
                    if (size === 1) {
                        allResult.push(newResult)
                    } else {
                        let newArr = [...arr]
                        newArr.splice(0, i + 1)
                        choose(newArr, size - 1, newResult)
                    }
                }
            }
        }
        choose(arr, size, [])
        return allResult
    }
    selectMaxFromCardGroupList (cardGroupList) {
        if (cardGroupList.length) {
            let resultArr = cardGroupList.sort(compare)
            // let b = resultArr.map(arr => {
            //     return arr.map(item => item.num)
            // })
            // console.log(b)
            return resultArr.reverse()[0]
        }
    }
}
