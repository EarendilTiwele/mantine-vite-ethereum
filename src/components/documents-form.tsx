import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const documentList = ["documentA", "documentB", "documentC"] as const;

type TForm = Record<(typeof documentList)[number], boolean>;

export default function DocumentForm({ onSubmit }: { onSubmit: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {documentList.map((d) => (
        <>
          <input key={d} {...register(d)} type="checkbox" />
          <label htmlFor={d}>d</label>
        </>
      ))}
      <button>Send to smart contract</button>
    </form>
  );
}
