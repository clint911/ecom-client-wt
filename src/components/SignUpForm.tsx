import { useState } from "react";

export default function SignUpForm({ onSubmit }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("buyer");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the email already exists in your database
    fetch(`http://localhost:8080/usersApi/users?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setErrorMessage("Email is already in use");
        } else {
          // If the email is not in use, create the user
          const user = { userId, email, userName, password, address, city, country, role };
          fetch("http://localhost:8080/usersApi/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("User created:", data);
              onSubmit();
            })
            .catch((error) => {
              console.error("Error creating user:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking email:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </label>
      <br />
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
      </label>
      <br />
      <label>
        Role:
        <label>
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={role === "buyer"}
            onChange={() => setRole("buyer")}
          />
          Buyer
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="seller"
            checked={role === "seller"}
            onChange={() => setRole("seller")}
          />
          Seller
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
          Admin
        </label>
      </label>
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
