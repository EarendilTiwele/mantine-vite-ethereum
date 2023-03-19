import { TTransaction } from "../api/types";
import Spinner from "./spinner";

export default function Transactions({ transaction, isLoading }: { transaction?: TTransaction; isLoading: boolean }) {
  if (isLoading)
    return (
      <div className="flex h-full flex-col text-center">
        <div className="text-2xl font-extrabold"> Transaction data </div>
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="text-2xl font-extrabold"> Transaction data </div>
      {!transaction ? (
        <p>No transaction available</p>
      ) : (
        <dl className="text-left" key={transaction.transactionHash}>
          <dt>
            <b>Transaction Hash</b>: {transaction.transactionHash}
          </dt>
          <dt>
            <b>Block</b>: {transaction.block}
          </dt>
          <dt>
            <b>Timestamp</b>: {transaction.timestamp}
          </dt>
          <dt>
            <b>From</b>: {transaction.from}
          </dt>
          <dt>
            <b>To</b>: {transaction.to}
          </dt>
          <dt>
            <b>Transaction Fee</b>: {transaction.transactionFee}
          </dt>
          <dt>
            <b>Gas Price</b>: {transaction.gasPrice}
          </dt>
        </dl>
      )}
    </div>
  );
}
