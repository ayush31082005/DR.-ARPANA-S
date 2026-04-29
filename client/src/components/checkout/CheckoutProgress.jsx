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
    <div className="flex items-center justify-center overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-2 sm:gap-3">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex min-w-max items-center gap-2 sm:gap-3">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? "#0f766e"
                    : isActive
                      ? "#0ea5e9"
                      : "#ffffff",
                  borderColor: isCompleted || isActive ? "transparent" : "#cbd5e1",
                  color: isCompleted || isActive ? "#ffffff" : "#64748b",
                }}
                className="flex items-center gap-2 rounded-full border px-2.5 py-2 sm:px-3.5"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 text-xs font-bold">
                  {isCompleted ? <Check size={16} /> : step.id}
                </span>
                <span className="text-xs font-semibold sm:text-sm">{step.label}</span>
              </motion.div>

              {index < steps.length - 1 ? (
                <div className="h-px w-6 bg-gradient-to-r from-teal-200 via-slate-200 to-slate-200 sm:w-10" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
