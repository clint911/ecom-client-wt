import { useState } from "react";

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
  return (
    <>
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
