/* cart contains item(s) clicked on by id, basically get item by id */
import { useState, useEffect } from "react";
import { Products } from "../InterfacesAndTypes/ApiInterfaces";
export default function Cart() {
  const [productsInCart, setProductsInCart] = useState<number[]>([]);
  const [productsToDisplay, setProductsToDisplay] = useState<Products[]>([]);
  //fetching items in cart from items stored in the cart say from db or localstorage or some form of caching mechanism
  function readCurrUserId() {
    //checks the userId of the logged in user and returns it
    const IdOfUser: string = " ";
    const userId = localStorage.getItem(IdOfUser as string);
    return userId;
  }
  async function fetchProductIdsAssociatedWithUserId() {
    const _userId = readCurrUserId();
    const userUrl = `localhost:8080/usersApi/users?user=${_userId}`;
    const entireUserData = await fetch(userUrl);
    const _entireUserData = await entireUserData.json();
    const arrOfProdIds = _entireUserData.productIds;
    const productIds: number[] = arrOfProdIds;
    setProductsInCart(productIds);
    return productIds;
  }
  async function getProductById() {
    for (let productInCart in productsInCart) {
      const url = `localhost:8080/productsApi/products?products=${productInCart}`;
      const fetchItemById = await fetch(url);
      const itemFetched = await fetchItemById.json();
      setProductsToDisplay(itemFetched);
    }
  }

  useEffect(() => {
    fetchProductIdsAssociatedWithUserId();
    getProductById();
  }, [])
  return (
    <div>
      <h2>Cart</h2>
      {productsToDisplay.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {productsToDisplay.map((item) => (
            <li key={item.productId}>
              {item.productName} - {item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

