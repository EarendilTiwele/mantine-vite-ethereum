import logo from "./logo.svg";
import { ethers } from "ethers";
import contractABI from "./contractABI.json";
import { useState } from "react";
import "./App.css";
import { CONTRACT_ADDRESS } from "../config";
import { createTransaction } from "./api/api";
import { TTransaction } from "./api/types";

function App() {
  const [documentA, setDocumentA] = useState(false);
  const [documentB, setDocumentB] = useState(false);
  const [documentC, setDocumentC] = useState(false);
  const [missingProvider, setMissingProvider] = useState(false);

  const [transactionData, setTransactionData] = useState<TTransaction>();
  const [outcome, setOutcome] = useState<string>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createTransaction();

      setTransactionData(data);

      setOutcome(outcome);
    } catch (err) {
      if (err.reason !== "execution reverted: Invalid input") {
        console.error(err);
        setMissingProvider(true);
      } else {
        setOutcome("Select at least one document");
        console.error(err);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="checkbox" name="documentA" value={documentA} id="documentA" onChange={(e) => setDocumentA(!documentA)} />
          <label htmlFor="documentA">Document A</label>
          <br />
          <input type="checkbox" name="documentB" value={documentB} id="documentB" onChange={(e) => setDocumentB(!documentB)} />
          <label htmlFor="documentB">Document b</label>
          <br />
          <input type="checkbox" name="documentC" value={documentC} id="documentC" onChange={(e) => setDocumentC(!documentC)} />
          <label htmlFor="documentC">Document c</label>
          <br />
          <button type="submit">Send to smart contract</button>
        </form>
        {missingProvider ? <p>Missing web3 provider on the browser</p> : null}
        <p>{outcome}</p>
        {log ? (
          <dl>
            <dt>Transaction Hash: {log.TransactionHash}</dt>
            <dt>Block: {log.Block}</dt>
            <dt>Timestamp: {log.Timestamp}</dt>
            <dt>From: {log.From}</dt>
            <dt>To: {log.To}</dt>
            <dt>Transaction Fee: {log.TransactionFee}</dt>
            <dt>Gas Price: {log.GasPrice}</dt>
          </dl>
        ) : null}
      </header>
    </div>
  );
}

export default App;
