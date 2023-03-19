import { useMemo, useState } from "react";
import { CONTRACT_ADDRESS } from "./config";
import { createTransaction } from "./api/api";
import { TTransaction } from "./api/types";
import { useMutation } from "@tanstack/react-query";
import Transactions from "./components/transactions";
import Outcome from "./components/outcome";
import DocumentsForm from "./components/documents-form";

function App() {
  const [transactionList, setTransactionList] = useState<TTransaction[]>([]);
  const [outcome, setOutcome] = useState<string>();

  const transactionMutation = useMutation(createTransaction, {
    onSuccess: (data) => {
      console.log({ data });
      setTransactionList((tl) => [...tl.splice(-2), data.transaction]);
      setOutcome(data.outcome);
    },
  });

  const areProvidersMissing = useMemo(
    () =>
      transactionMutation.isError &&
      transactionMutation.error !== "execution reverted: Invalid input",
    [transactionMutation.error]
  );

  return (
    <div className="flex flex-col bg-amber-500 p-20">
      <div className="flex flex-row justify-between bg-red-500">
        <div className="mr-1 bg-blue-500">
          <DocumentsForm onSubmit={transactionMutation.mutate} />
        </div>
        <div className="bg-purple-500">
          <Transactions transactionList={transactionList} />
        </div>
      </div>
      <div className="w-full bg-green-500">
        <Outcome
          outcome={areProvidersMissing ? "Missing web3 provider on the browser" : outcome ?? ""}
        />
      </div>
    </div>
  );
}

export default App;
