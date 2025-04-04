import { useState } from "react";
import { ethers } from "ethers";

function StudentDashboard() {
  const [walletAddress, setWalletAddress] = useState("");

  // Connect MetaMask & Get Address
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("Connected Wallet Address:", address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not found! Please install MetaMask.");
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {walletAddress ? (
        <p>Connected as: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
    </div>
  );
}

export default StudentDashboard;
