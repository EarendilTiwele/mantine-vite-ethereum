import { useMemo, useState } from "react";
import { CONTRACT_ADDRESS } from "./config";
import { createTransaction } from "./api/api";
import { TTransaction } from "./api/types";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Transactions from "./components/transactions";
import Outcome from "./components/outcome";
import DocumentsForm from "./components/documents-form";

function App() {
  const [documentA, setDocumentA] = useState(false);
  const [documentB, setDocumentB] = useState(false);
  const [documentC, setDocumentC] = useState(false);

  const [transactionList, setTransactionList] = useState<TTransaction[]>([]);
  const [outcome, setOutcome] = useState<string>();

  const transactionMutation = useMutation(createTransaction, {
    onSuccess: (data) => {
      setTransactionList((tl) => [...tl.splice(-2), data.transaction]);
      setOutcome(data.outcome);
    },
  });

  const areProvidersMissing = useMemo(() => transactionMutation.error !== "execution reverted: Invalid input", [transactionMutation.error]);

  return (
    <div>
      <DocumentsForm />
      <Outcome outcome={areProvidersMissing ? "Missing web3 provider on the browser" : outcome ?? ""} />
      <Transactions transactionList={transactionList} />
    </div>
  );
}

export default App;
