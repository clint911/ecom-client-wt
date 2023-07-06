
function BuyerDashboard({ orders }) {
  return (
    <div>
      <h2>Buyer Dashboard</h2>
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      )
