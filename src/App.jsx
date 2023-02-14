import { useEffect, useState } from "react"
import QueueList from "./components/queues";

const data = [
  [5, 6],
  [10],
  [1],
  [12, 2], 
  [4, 7]
]

export default function App() {

  const [queues, setQueues] = useState(data)
  const [cart, setCart] = useState()

  function addCartToQueue(e) {

    // prevent page refresh
    e.preventDefault();

    // storing queue totals of each checkout line
    let smallestQueue = Infinity;
    let smallestQIndex = undefined;

    // find shortest queue to add cart to
    queues.forEach((line, i) => {
      let queueTotal = line?.reduce((prev, curr) => prev + curr, 0);
      if (queueTotal < smallestQueue) {
        smallestQueue = queueTotal;
        smallestQIndex = i;
      }
    })

    // need to mutate data outside the useState hook 
    const newData = [...queues];
    newData[smallestQIndex].push(Number(cart))
    setQueues(newData);

  }

  useEffect(() => {

    // evry 2s remove 1 item from the carts at the front of the queues
    const timer = setInterval(() => {
      console.log('interval check')
      setQueues(queues => 
        queues.map(line => (
          [line[0] -1, ...line.slice(1)].filter(value => value > 0)
        ))
      )
    }, 2000);

    return () => {
      clearInterval(timer);
    }

  },[])

  return (
    <div className="App">
      <h2>Your cart: {cart}</h2>
      <form onSubmit={addCartToQueue}>
        <label htmlFor="cart-input">cart size: </label>
        <input id="cart-input" required type="number" onChange={(e) => setCart(e.target.value)}/>
        <button type="submit">Checkout</button>
      </form>

      <div className="queues">
        <QueueList queues={queues} />
      </div>


    </div>
  )
}


// CHALLENGE - 
// input takes a number of items in a shopping cart
// checkout button sends cart to a queue
// 5 queues to choose
// each queue already has people lined up
// each person has a number of items in their cart
// when we click checkout find the queue with the least amount of items
// push the user input cart of items into the queue

// every .5seconds remove an item from the first person in queue's cart
// once the cart is empty, remove the person from queue