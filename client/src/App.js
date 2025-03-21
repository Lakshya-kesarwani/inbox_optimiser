// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [emails, setEmails] = useState([]);
  const [hiddenAccounts, setHiddenAccounts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/emails", { withCredentials: true }).then((res) => {
      setEmails(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">📧 My Emails</h1>
      <button onClick={() => window.location.href = "http://localhost:5000/auth/google"}>Add Account</button>
      <button onClick={() => window.location.reload()}>Refresh</button>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>Email Account</th>
            <th>Sender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email.id} className={`${hiddenAccounts.includes(email.id) ? "hidden" : ""}`}>
              <td>{email.from}</td>
              <td><button onClick={() => alert("More details")}>More Details</button></td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => setHiddenAccounts([...hiddenAccounts, email.id])}
                />
                Hide
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
