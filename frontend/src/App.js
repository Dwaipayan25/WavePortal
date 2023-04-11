import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WavePortal2 from "./utils/WavePortal2.json";

function App() {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [waves, setWaves] = useState([]);
  const contractAddress = "0xFCaC01B43052Ace67D37fC3cc7B13cAd87c285Dd";
  const contractABI = WavePortal2.abi;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        localStorage.setItem("account", account); // Store the account in local storage
        setAccount(account);
      } catch (err) {
        console.error(err);
        setError("Failed to connect to Metamask. Please try again.");
      }
    } else {
      setError("Please install Metamask to use this app.");
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0]);
    };
    const storedAccount = localStorage.getItem("account"); // Retrieve the account from local storage
    if (storedAccount) {
      setAccount(storedAccount);
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      const getWaves = async () => {
        const waves = await contract.getAllWaves();
        setWaves(waves);
      };

      getWaves();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const waveTx = await contract.wave(message, {
        value: ethers.utils.parseEther(value),
      });
      await waveTx.wait();

      setMessage("");
      setValue("");
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Wave Portal</h1>
      {!account ? (
        <button onClick={connectMetamask}>Connect to Metamask</button>
      ) : (
        <>
          <p>Connected account: {account}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Message:
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <label>
              Value (in ETH):
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Wave"}
            </button>
          </form>
          {error && <p>{error}</p>}
        </>
      )}
      <div className="mt-4">
        <h2>Waves</h2>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {waves.map((wave, index) => (
              <tr key={index}>
                <td>{wave.waver}</td>
                <td>{wave.message}</td>
                <td>{new Date(wave.timestamp * 1000).toLocaleString()}</td>
                <td>{wave.value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
