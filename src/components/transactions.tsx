import { TTransaction } from "../api/types";
import Spinner from "./spinner";

export default function Transactions({ transaction, isLoading }: { transaction?: TTransaction; isLoading: boolean }) {
  if (isLoading)
    return (
      <div className="flex h-full flex-col">
        <div className="text-3xl mb-[20px] font-bold text-[#767680]"> Transaction data </div>
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col text-[#767680]">
      <div className="text-3xl mb-[20px] font-bold"> Transaction data </div>
      {!transaction ? (
        <p>No transaction available</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex"><b className="w-[135px] mr-[5px]">Transaction Hash:</b>{transaction.transactionHash}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">Block:</b>{transaction.block}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">Timestamp:</b>{transaction.timestamp}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">From:</b>{transaction.from}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">To:</b>{transaction.to}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">Transaction Fee:</b>{transaction.transactionFee}</div>
          <div className="flex"><b className="w-[135px] mr-[5px]">Gas Price:</b>{transaction.gasPrice}</div>
        </div>
      )}
    </div>
  );
}
