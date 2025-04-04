const registerStudent = async (_name, _rollNo, _ipfsHash) => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
  
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const contract = new ethers.Contract(
      "YOUR_CONTRACT_ADDRESS", // Replace with your StudentRegistry contract address
      STUDENT_REGISTRY_ABI,    // Replace with your ABI
      signer
    );
  
    try {
      const tx = await contract.registerStudent(_name, _rollNo, _ipfsHash);
      await tx.wait(); // Wait for transaction to complete
      console.log("✅ Student registered successfully!");
    } catch (error) {
      console.error("❌ Registration failed:", error);
    }
  };
  