
export default function QueueList({ queues }) {

    const items = queues.map((queue, i) => 
      <div key={i} className="queue">
        <span>Queue: {i+1}</span>
        {
          queue?.map((carts, i) => 
            <li key={i}>{carts}</li>
          )
        }
      </div>
    )

    return items
}
