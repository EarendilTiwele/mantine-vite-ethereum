export default function Outcome({ outcome }: { outcome: string }) {
  return (
    <div>
      {outcome == "Error" ? (
        <>
          <p className="text-[#ff0000]">{outcome}</p>
        </>
      ) : (
        <>
          <p className="bg-gradient-to-r bg-clip-text from-purple-600 to-[#431180]">{outcome}</p>
        </>
      )}
    </div >
  );
}
