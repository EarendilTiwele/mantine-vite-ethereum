import { useMemo, useState } from "react";
import { CONTRACT_ADDRESS } from "./config";
import { createTransaction } from "./api/api";
import { TTransaction } from "./api/types";
import { useMutation } from "@tanstack/react-query";
import Transactions from "./components/transactions";
import Outcome from "./components/outcome";
import DocumentsForm from "./components/documents-form";

function App() {
  const [transaction, setTransaction] = useState<TTransaction>();
  const [outcome, setOutcome] = useState<string>();

  const transactionMutation = useMutation(createTransaction, {
    onSuccess: (data) => {
      setTransaction(data.transaction);
      setOutcome(data.outcome);
    },
  });

  const areProvidersMissing = useMemo(
    () => transactionMutation.isError && transactionMutation.error !== "execution reverted: Invalid input",
    [transactionMutation.error]
  );

  return (
    <div className="flex flex-col p-20">
      <div className="mb-10 w-full text-center text-4xl font-extrabold">Thesis demo</div>
      <div className="flex flex-row justify-between">
        <div className="mr-52 w-[300px]">
          <DocumentsForm
            onSubmit={async ({ documents }) => {
              transactionMutation.mutateAsync(documents);
            }}
            isLoading={transactionMutation.isLoading}
            isSettled={transactionMutation.isSuccess || transactionMutation.isError}
          />
        </div>
        <div className="flex-1">
          <Transactions isLoading={transactionMutation.isLoading} transaction={transaction} />
        </div>
      </div>
      <div className="w-full">
        <Outcome outcome={areProvidersMissing ? "Missing web3 provider on the browser" : outcome ?? ""} />
      </div>
    </div>
  );
}

export default App;
