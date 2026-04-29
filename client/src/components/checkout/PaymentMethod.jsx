import { motion } from "framer-motion";
import {
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  QrCode,
  Wallet,
} from "lucide-react";
import formatPrice from "../../utils/formatPrice";

const onlinePanels = [
  {
    id: "upi",
    label: "Scan & Pay",
    icon: QrCode,
    content:
      "Use any UPI app like PhonePe, Google Pay, Paytm, or BHIM to complete the payment instantly.",
  },
  {
    id: "wallet",
    label: "Wallet & Offers",
    icon: Wallet,
    content:
      "Apply wallet balance, cashback offers, and clinic promotional savings at the time of payment.",
  },
  {
    id: "cards",
    label: "Debit / Credit Cards",
    icon: CreditCard,
    content:
      "Visa, Mastercard, RuPay, and other major cards are supported through our secure payment gateway.",
  },
];

export default function PaymentMethod({
  paymentMethod,
  onPaymentMethodChange,
  expandedPanel,
  onExpandedPanelChange,
  onlineDiscount,
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Select Payment Method
        </h2>
      </div>

      <div className="grid gap-4">
        <button
          type="button"
          onClick={() => onPaymentMethodChange("cod")}
          className={`rounded-[20px] border p-5 text-left shadow-sm transition sm:p-6 ${
            paymentMethod === "cod"
              ? "border-primary bg-teal-50/60"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <CircleDollarSign size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {formatPrice(0)}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">
                  Cash on Delivery
                </h3>
              </div>
            </div>
            <div
              className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
                paymentMethod === "cod"
                  ? "border-primary bg-primary"
                  : "border-slate-300"
              }`}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
          </div>
        </button>

        <div
          className={`overflow-hidden rounded-[20px] border shadow-sm transition ${
            paymentMethod === "online"
              ? "border-primary bg-sky-50/60"
              : "border-slate-200 bg-white"
          }`}
        >
          <button
            type="button"
            onClick={() => onPaymentMethodChange("online")}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                <QrCode size={20} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Pay Online
                  </h3>
                  {onlineDiscount ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Save {formatPrice(onlineDiscount)}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Extra savings with online payment and digital offers
                </p>
              </div>
            </div>

            <div
              className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
                paymentMethod === "online"
                  ? "border-primary bg-primary"
                  : "border-slate-300"
              }`}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-white" />
            </div>
          </button>

          {paymentMethod === "online" ? (
            <div className="border-t border-slate-100 bg-white/70 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
              <div className="space-y-3">
                {onlinePanels.map((panel) => {
                  const Icon = panel.icon;
                  const isExpanded = expandedPanel === panel.id;

                  return (
                    <div
                      key={panel.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onExpandedPanelChange(isExpanded ? "" : panel.id)
                        }
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                      >
                        <span className="inline-flex items-center gap-3 text-sm font-semibold text-slate-800">
                          <Icon size={18} className="text-primary" />
                          {panel.label}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-slate-400 transition ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="border-t border-slate-100 px-4 py-4 text-sm leading-6 text-slate-500"
                        >
                          {panel.content}
                        </motion.div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
