import logo from "./logo.svg";
import { ethers } from "ethers";
import contractABI from "./contractABI.json";
import { useState } from "react";
import "./App.css";

function App() {
  const [documentA, setDocumentA] = useState(false);
  const [documentB, setDocumentB] = useState(false);
  const [documentC, setDocumentC] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [missingProvider, setMissingProvider] = useState(false);
  const [log, setLog] = useState(null);
  const CONTRACT_ADDRESS = "0xc7d06d3de7d752932d1e201e337816724db1b313";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const mechanismContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      const documentsList = [documentA, documentB, documentC];

      console.clear();
      console.log(documentsList);

      const tx = await mechanismContract.assign_outcome(documentsList);
      const receipt = await tx.wait();
      setLog({
        TransactionHash: receipt.transactionHash,
        Block: receipt.blockNumber,
        Timestamp: new Date((await provider.getBlock(receipt.blockNumber)).timestamp * 1000).toUTCString(),
        From: receipt.from,
        To: receipt.to,
        TransactionFee: `${(receipt.gasUsed.toNumber() * receipt.effectiveGasPrice.toNumber()) / 10 ** 18} ETH`,
        GasPrice: `${receipt.effectiveGasPrice.toNumber() / 10 ** 9} GWei`,
      });

      setOutcome("Your outcome is: " + (await mechanismContract.callStatic.assign_outcome(documentsList)));
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
