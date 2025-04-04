const getStudentInfo = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
  
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      "YOUR_CONTRACT_ADDRESS",
      STUDENT_REGISTRY_ABI,
      provider
    );
  
    try {
      const [name, rollNo, ipfsHash] = await contract.getStudent(walletAddress);
      console.log(`👤 Name: ${name}, Roll No: ${rollNo}, IPFS Hash: ${ipfsHash}`);
    } catch (error) {
      console.error("❌ Failed to fetch student info:", error);
    }
  };
  