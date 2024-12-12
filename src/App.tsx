import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Categories from "./components/Categories";
import CategoryPage from "./components/CategoryPage";

export default function App() {
  const [num, setNum] = useState(5);

  interface userData {
    userId: number;
    email: string;
    userName: string;
    password: string;
    address: string;
    city: string;
    country: string;
  }
  /*
   * @dev fetches users from our springboot api
   * @returns allUsers in form of json
    */
  const [users, setUsers] = useState<userData[]>([]);
  async function fetchAllUsers(): Promise<userData[]> {
    const apiRoute = "htpp://localhost:8080/usersApi/users";
    const allFetchedUsers = await fetch(apiRoute);
    const allUsers: userData[] = await allFetchedUsers.json();
    console.log(allUsers);
    return allUsers;
  }
  async function handleClick() {
    const _allUsers = await fetchAllUsers();
    setUsers(_allUsers);
  }
  //Navigation to the category page 
  const location = useLocation();
  return (
    <>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        {/* Other routes */}
      </Routes>
    </AnimatePresence>
  
      <button onClick={() => setNum(num + 1)}>Num is {num} </button>
      <button onClick={handleClick}>Fetch Users</button>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.userName} ({user.email})
          </li>
        ))}
      </ul>
    </>
  )
}
