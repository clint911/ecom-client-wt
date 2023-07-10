import { useState, useEffect } from "react";
import { Orders } from "../InterfacesAndTypes/ApiInterfaces";

const [userOrderIds, setUserOrderIds] = useState<number[]>([]);
const [ordersToDisplay, setOrdersToDisplay] = useState<Orders[]>([]);
export default function OrderDetails() {
  /* GET request to fetch orders by certain id depending on user */
  function readCurrOrderId() {
    const IdOfUser: string = " ";
    const orderId = localStorage.getItem(IdOfUser as string);
    return orderId;
  }
  async function fetchOrderIdsAssociatedWithUserId() {
    const _orderId = readCurrOrderId();
    const _orderUrl = `localhost:8080/ordersApi/orders?order=${_orderId}`;
    const entireOrderData = await fetch(_orderUrl);
    const _entireOrderData = await entireOrderData.json();
    const arrOfOrderIds = _entireOrderData.orderIds;
    const orderIds: number[] = arrOfOrderIds;
    setUserOrderIds(orderIds);
    return orderIds;
  }
  async function getOrdersById() {
    for (let orderId in userOrderIds) {
      const url = `localhost:8080/ordersApi/orders?orders=${orderId}`;
      const fetchOrderById = await fetch(url);
      const orderFetched = await fetchOrderById.json();
      setOrdersToDisplay(orderFetched);
    }
  }
  useEffect(() => {
    fetchOrderIdsAssociatedWithUserId()
    getOrdersById()
  })
  return (
    <div>
      <h2>Cart</h2>
      {ordersToDisplay.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {ordersToDisplay.map((item) => (
            <li key={item.orderId}>
              {item.productsOrdered} - {item.totalPrice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
