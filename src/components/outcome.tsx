export default function Outcome({ outcome }: { outcome: string }) {
  return (
    <div className="flex h-40 flex-1 text-8xl items-center justify-center bg-clip-text text-center font-extrabold text-transparent">
      {outcome == "Error" ? (
        <>
          <p className="bg-gradient-to-r bg-clip-text from-[#EA4C46] to-[#DC1C13]">{outcome}</p>
        </>
      ) : (
        <>
          <p className="bg-gradient-to-r bg-clip-text from-[#43cea2] to-[#185a9d]">{outcome}</p>
        </>
      )}
    </div >
  );
}
