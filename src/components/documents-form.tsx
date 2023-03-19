import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TForm } from "../api/types";
import { DOCUMENTS_LIST as documentsList } from "../config";

export default function DocumentsForm({
  onSubmit,
  isLoading,
  isSettled,
}: {
  onSubmit: (data: TForm) => Promise<void>;
  isLoading: boolean;
  isSettled: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    mode: "onSubmit",
  });

  useEffect(reset, [isSettled]);

  // TODO: Add validation
  return (
    <form className="flex flex-col gap-2 p-1" onSubmit={handleSubmit(onSubmit)}>
      {documentsList.map((d, i) => (
        <div className="flex w-full" key={d}>
          <input
            readOnly={isLoading}
            type="checkbox"
            id={d}
            value={d}
            className="peer hidden"
            {...register(d)}
          />
          <label
            htmlFor={d}
            className="w-full cursor-pointer select-none rounded-lg border-2 border-gray-200 py-3
            px-6 text-center font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:border-gray-200 peer-checked:bg-gray-200 peer-checked:text-gray-900 "
          >
            {d}
          </label>
        </div>
      ))}
      {Object.values(errors).map((e) => e.message)}
      <button
        disabled={isLoading || !!Object.values(errors).length}
        className="rounded-lg bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 disabled:bg-purple-700"
      >
        Send to smart contract
      </button>
    </form>
  );
}
