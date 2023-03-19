import { useRef } from "react";
import { useForm } from "react-hook-form";
import { TForm } from "../api/types";
import { DOCUMENTS_LIST as documentsList } from "../config";
import Checkbox from "./checkbox";

export default function DocumentsForm({ onSubmit }: { onSubmit: (data: TForm) => void }) {
  const { register, handleSubmit } = useForm<TForm>({});

  // TODO: Add validation
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {documentsList.map((d) => (
        // <div key={d}>
        //   <input {...register(d)} type="checkbox" />
        //   <label htmlFor={d}>{d}</label>
        // </div>
        <Checkbox key={d} {...register(d)} />
      ))}
      <button>Send to smart contract</button>
    </form>
  );
}
