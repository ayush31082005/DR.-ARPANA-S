import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  APP_NAME,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
} from "../../utils/constants";

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-current"
    >
      <path d="M12 2a10 10 0 0 0-8.66 15l-1.16 4.25 4.36-1.14A10 10 0 1 0 12 2Zm0 18.18a8.15 8.15 0 0 1-4.15-1.13l-.3-.18-2.58.67.69-2.5-.2-.32A8.18 8.18 0 1 1 12 20.18Zm4.5-6.12c-.24-.12-1.43-.7-1.65-.77-.22-.08-.39-.12-.55.12-.16.23-.63.77-.77.92-.14.15-.29.17-.53.06-.25-.12-1.03-.38-1.96-1.2-.72-.65-1.22-1.45-1.36-1.7-.14-.23-.01-.37.1-.49.11-.11.25-.3.37-.45.12-.15.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 1.98s.86 2.29.98 2.45c.12.16 1.69 2.57 4.09 3.6.57.24 1.02.39 1.37.5.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.64-1.15.2-.57.2-1.06.14-1.16-.05-.1-.21-.16-.45-.28Z" />
    </svg>
  );
}

export default function WhatsAppChatBox() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const whatsappUrl = useMemo(() => {
    const message = encodeURIComponent(WHATSAPP_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, []);

  if (isAdminRoute) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="pointer-events-auto w-[320px] max-w-full overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.18)]">
          <div className="flex items-start justify-between bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
                <WhatsAppIcon />
              </div>
              <div>
                <p className="text-sm font-semibold">WhatsApp Support</p>
                <p className="text-xs text-emerald-50">Typically replies quickly</p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close WhatsApp chat box"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4 bg-[linear-gradient(180deg,#f7fef9_0%,#ffffff_100%)] px-5 py-5">
            <div className="max-w-[240px] rounded-[22px] rounded-tl-md bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-100">
              Hello, welcome to {APP_NAME}. Need help with appointments, orders,
              or products? Chat with us on WhatsApp.
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(34,197,94,0.28)] transition duration-300 hover:-translate-y-0.5 hover:from-emerald-600 hover:to-green-700"
            >
              <MessageCircle size={18} />
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="pointer-events-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_18px_40px_rgba(34,197,94,0.38)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(34,197,94,0.42)]"
        aria-label={isOpen ? "Minimize WhatsApp chat" : "Open WhatsApp chat"}
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}
