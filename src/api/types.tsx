import { ContractFunction } from "ethers";
import { DOCUMENTS_LIST } from "../config";

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
  documents: ContractFunction[];
};

export type TForm = Record<(typeof DOCUMENTS_LIST)[number], boolean>;
