import { useMemo, useState } from "react";
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
    () => transactionMutation.isError,
    [transactionMutation.error]
  );

  return (
    <div className="flex flex-col">
      <div className="text-6xl bg-[#431180] p-5 pl-10 font-bold text-[#ffffff]">Thesis demo</div>
      <div className="p-10">
        <div className="flex flex-row justify-between">
          <div className="mr-52 w-[300px] p-[20px] shadow-lg rounded-lg bg-[#fffcff]">
            <DocumentsForm
              onSubmit={async ({ documents }) => {
                transactionMutation.mutateAsync(documents);
                setOutcome(undefined);
                setTransaction(undefined);
              }}
              isLoading={transactionMutation.isLoading}
              isSettled={transactionMutation.isSuccess || transactionMutation.isError}
            />
          </div>
          <div className="flex-1 p-[20px] shadow-lg rounded-lg bg-[#fffcff]">
            <Transactions isLoading={transactionMutation.isLoading} transaction={transaction} />
          </div>
        </div>
        <div className="flex mt-[50px] text-7xl font-extrabold text-transparent">
          <Outcome outcome={areProvidersMissing ? "Error" : (!outcome ? "" : `Outcome: ${outcome}`)} />
        </div>
      </div>
    </div>
  );
}

export default App;
