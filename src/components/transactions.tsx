import { TTransaction } from "../api/types";

export default function Transactions({ transactionList }: { transactionList?: TTransaction[] }) {
  return (
    <div>
      <div> Transactions </div>
      {!transactionList?.length ? (
        <p> Non ci sono transazioni al momento</p>
      ) : (
        transactionList.map((t) => (
          <dl key={t.transactionHash}>
            <dt>Transaction Hash: {t.transactionHash}</dt>
            <dt>Block: {t.block}</dt>
            <dt>Timestamp: {t.timestamp}</dt>
            <dt>From: {t.from}</dt>
            <dt>To: {t.to}</dt>
            <dt>Transaction Fee: {t.transactionFee}</dt>
            <dt>Gas Price: {t.gasPrice}</dt>
          </dl>
        ))
      )}
    </div>
  );
}
