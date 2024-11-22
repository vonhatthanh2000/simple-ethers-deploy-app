import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

async function sendTransactionAndSetContractAddress() {
  // Define the transaction data
  const txData = '0x604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf3';

  // Create a provider (using Infura as an example)
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  // Create a wallet (signer) using a private key from environment variables
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Define the transaction
  const tx = {
    to: null, // Contract creation
    data: txData,
  };

  // Send the transaction
  const txResponse = await wallet.sendTransaction(tx);
  console.log('Transaction sent:', txResponse.hash);

  // Wait for the transaction to be mined
  const receipt = await txResponse.wait();
  console.log('Transaction mined:', receipt.transactionHash);

  // Get the contract address
  const contractAddress = receipt.contractAddress;
  console.log('Contract deployed at:', contractAddress);

  // Set the contract address to an environment variable
  process.env.CONTRACT_ADDRESS = contractAddress;
  console.log('Contract address set to environment variable');



}

// Call the function
sendTransactionAndSetContractAddress().catch(console.error);