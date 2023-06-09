import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TForm } from "../api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DOCUMENTS_LIST as documentsList } from "../config";

const documentsSchema = documentsList.reduce((documents, document) => ({ ...documents, [document]: z.boolean() }), {});

const schema = z.object({
  documents: z
    .object({ ...documentsSchema })
    .refine((documents) => Object.values(documents).find((document) => document), {
      message: "At least one of the documents should be selected",
    }),
});

export default function DocumentsForm({
  onSubmit,
  isLoading,
  isSettled,
}: {
  onSubmit: (data: { documents: TForm }) => Promise<void>;
  isLoading: boolean;
  isSettled: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<{ documents: TForm }>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  useEffect(reset, [isSettled]);

  return (
    <form className="flex flex-col gap-2 p-1" onSubmit={handleSubmit(onSubmit)}>
      {documentsList.map((d, i) => (
        <div className="flex w-full" key={d}>
          <input readOnly={isLoading} type="checkbox" id={d} className="peer hidden" {...register(`documents.${d}`)} />
          <label
            htmlFor={d}
            className="w-full cursor-pointer select-none rounded-lg border-2 border-[#c4aedc] py-3
            px-6 text-center font-bold text-[#e2e2f3] transition-colors duration-200 ease-in-out peer-checked:border-[#e4cbff] peer-checked:bg-[#e4cbff] peer-checked:text-[#726580] "
          >
            {d}
          </label>
        </div>
      ))}
      {Object.values(errors).map((e, i) => (
        <div key={i} className="text-center text-[#726580]">
          {e.message}
        </div>
      ))}
      <button
        disabled={isLoading}
        className="rounded-lg bg-[#a155ff] px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 disabled:bg-purple-700"
      >
        Send to smart contract
      </button>
    </form>
  );
}
