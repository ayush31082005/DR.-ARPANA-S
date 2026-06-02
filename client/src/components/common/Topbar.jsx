import { Sparkles } from "lucide-react";

const topbarHighlights = [
  "Wellness Counseling",
  "Acute Illness Treatment",
  "Sahibabad, Ghaziabad",
  "Mon-Sun 11:00 AM - 9:00 PM",
];

export default function Topbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] hidden h-8 border-b border-[#ecc4d4] bg-[#6f2849] text-xs text-white xl:block">
      <div className="flex h-full items-center gap-4 px-0">
        <p className="shrink-0 whitespace-nowrap">Call us: +91 98765 43210</p>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee-left flex w-max items-center gap-2">
            {[...topbarHighlights, ...topbarHighlights].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/95"
              >
                <Sparkles size={10} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="shrink-0 whitespace-nowrap">
          Email: care@drarpanahomeocare.com | Open: 11:00 AM - 9:00 PM
        </p>
      </div>
    </div>
  );
}
