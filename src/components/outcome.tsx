export default function Outcome({ outcome }: { outcome: string }) {
  return (
    <div className="flex h-40 flex-1 items-center justify-center bg-gradient-to-r from-[#43cea2] to-[#185a9d] bg-clip-text text-center font-extrabold text-transparent">
      {outcome && (
        <>
          <p className="text-8xl">Outcome:</p>
          <p className="w-40 text-9xl">{outcome}</p>
        </>
      )}
    </div>
  );
}
