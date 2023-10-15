// orders
const orders=[
    {
        order:['bottom-bun', 'tomato']
    }
]

let order_bank = [['bottom-bun','tomato','onion','patty','lettuce','top-bun'],['bottom-bun','patty','top-bun'],['bottom-bun','patty','tomato','onion','top-bun']];
const order_call = []

/*still not finish*/
function fillOrder(){
    if 

}
/*still not finish*/
function checkOrder(order){
    for (let i = 0; i < order_call.length; i++) {
        if(order==order_call[i]){
            /*add money*/
            orders.splice(i, 1);
            fillOrder();
            return 0;
        }
    }

}




