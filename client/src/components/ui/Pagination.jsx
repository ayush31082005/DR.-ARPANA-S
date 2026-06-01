export default function Pagination({ currentPage, totalPages, onPageChange, theme }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isShopLime = theme === "shop-lime";
  const buttonClass = isShopLime
    ? "rounded-xl border border-[#e1a9c0] bg-[#fdeef5] px-4 py-2 text-sm text-[#a94672] transition hover:border-[#c45a8d] hover:text-[#8f355f] disabled:cursor-not-allowed disabled:opacity-50"
    : "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50";
  const activeClass = isShopLime
    ? "border border-[#b34d7d] bg-[#c45a8d] text-white"
    : "bg-primary text-white";
  const inactiveClass = isShopLime
    ? "border border-[#e1a9c0] bg-[#fff7fa] text-[#a94672] hover:border-[#c45a8d] hover:text-[#8f355f]"
    : "border border-slate-300 bg-white hover:border-primary hover:text-primary";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        Prev
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`rounded-xl px-4 py-2 text-sm transition ${
            currentPage === pageNumber
              ? activeClass
              : inactiveClass
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        Next
      </button>
    </div>
  );
}
