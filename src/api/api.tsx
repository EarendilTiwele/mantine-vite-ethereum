import { ethers } from "ethers";
import { TCreateTransactionParameters, TTransaction } from "./types";

export const createTransaction = async ({ contract, documents }: TCreateTransactionParameters) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const mechanismContract = new ethers.Contract(contract.address, contract.contractInterface, signer);
  const outcome = await mechanismContract.callStatic.assign_outcome(documents);

  const tx = await mechanismContract.assign_outcome(documents);
  const receipt = await tx.wait();
  const timestamp = (await provider.getBlock(receipt.blockNumber)).timestamp;

  const transaction: TTransaction = {
    transactionHash: receipt.transactionHash,
    block: receipt.blockNumber,
    timestamp,
    from: receipt.from,
    to: receipt.to,
    transactionFee: `${(receipt.gasUsed.toNumber() * receipt.effectiveGasPrice.toNumber()) / 10 ** 18} ETH`,
    gasPrice: `${receipt.effectiveGasPrice.toNumber() / 10 ** 9} GWei`,
  };
  return {
    transaction,
    outcome,
  };
};

export type TCreateTransactionOutput = ReturnType<Awaited<typeof createTransaction>>;
