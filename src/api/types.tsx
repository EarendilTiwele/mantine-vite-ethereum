import { ContractFunction, ContractInterface, ethers } from "ethers";

export type TTransaction = {
  transactionHash: string;
  block: number;
  timestamp: number;
  from: string;
  to: string;
  transactionFee: string;
  gasPrice: string;
};

export type TCreateTransactionParameters = {
  contract: {
    address: string;
    contractInterface: ContractInterface;
  };
  documents: ContractFunction[];
};
