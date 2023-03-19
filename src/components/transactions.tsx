import { TTransaction } from "../api/types";
import { mockTransactions } from "../mock";
import Spinner from "./spinner";

export default function Transactions({ transaction, isLoading }: { transaction?: TTransaction; isLoading: boolean }) {
  if (isLoading)
    return (
      <div className="flex h-full flex-col text-center">
        <div className="text-2xl font-extrabold"> Transaction </div>
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="text-2xl font-extrabold "> Transaction </div>
      {!transaction ? (
        <p>No transaction available</p>
      ) : (
        <dl key={transaction.transactionHash}>
          <dt>Transaction Hash: {transaction.transactionHash}</dt>
          <dt>Block: {transaction.block}</dt>
          <dt>Timestamp: {transaction.timestamp}</dt>
          <dt>From: {transaction.from}</dt>
          <dt>To: {transaction.to}</dt>
          <dt>Transaction Fee: {transaction.transactionFee}</dt>
          <dt>Gas Price: {transaction.gasPrice}</dt>
        </dl>
      )}
    </div>
  );
}
