import { generateWholeCards } from './tool'
class Dealer{
    constructor(isJokerAdded){

        this.isJokerAdded = isJokerAdded;
        this.restart();
        // this.public = []
    }
    
    restart(){
        this.stack = generateWholeCards(this.isJokerAdded)
        this.shuffle();
    }

    deliver(params){

        let defualtParamas  = {
            split:4,//Maybe person count
            each:2,//Card count each one,e.g. -1 means deliver all cards in stack,2 means deliver 2 cards for each one
        };
        params = Object.assign({},defualtParamas,params);

        let split = params.split;
        let each = params.each;

        let i=split;
        let deliverArr = [];
        while(--i >= 0){
            deliverArr.push([]);
        }

        let stack = this.stack;
        let index = stack.length;
        let continueFlag = true;
        let endIndex = split-1;
        while(--index >= 0 && continueFlag){
            let splitIndex = endIndex - (index % split);
            deliverArr[splitIndex].push(stack.pop());
            continueFlag = deliverArr[endIndex].length < each || each === -1;
        }

        return deliverArr;
    }

    shuffle(){
        let copyStack = this.stack.slice(0);
        this.stack = [];
        let len;
        while((len = copyStack.length)>0){
            let index = Math.floor(Math.random()*len);
            this.stack.push(copyStack[index]);
            copyStack.splice(index,1);
        }
    }
}

