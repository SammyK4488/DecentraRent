import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import RentContractABI from '../artifacts/RentContract.json';

export default function useRole(contractAddress) {
  const [role, setRole] = useState(null);
  useEffect(() => {
    async function checkRole() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, RentContractABI.abi, provider);
      const isLandlord = await contract.isLandlord(addr);
      setRole(isLandlord ? 'landlord' : 'tenant');
    }
    if (window.ethereum) checkRole();
  }, [contractAddress]);
  return role;
}
