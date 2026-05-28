import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Address" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Summary" },
];

export default function CheckoutProgress({ currentStep = 1 }) {
  return (
    <div className="flex items-center justify-start overflow-x-auto px-1 pb-1 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-2 pr-3 sm:gap-3">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex min-w-max items-center gap-2 sm:gap-3">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? "#ee973f"
                    : isActive
                      ? "#f6a04a"
                      : "#ffffff",
                  borderColor: isCompleted || isActive ? "transparent" : "#cbd5e1",
                  color: isCompleted || isActive ? "#ffffff" : "#64748b",
                }}
                className="flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-2 text-[11px] sm:gap-2 sm:px-3.5 sm:text-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 text-[11px] font-bold sm:h-7 sm:w-7 sm:text-xs">
                  {isCompleted ? <Check size={16} /> : step.id}
                </span>
                <span className="font-semibold">{step.label}</span>
              </motion.div>

              {index < steps.length - 1 ? (
                <div className="h-px w-4 bg-gradient-to-r from-[#f6a04a]/60 via-[#f3c18f]/45 to-slate-200 sm:w-10" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
