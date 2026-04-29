import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AddressForm from "../components/checkout/AddressForm";
import CheckoutProgress from "../components/checkout/CheckoutProgress";
import CheckoutSummaryView from "../components/checkout/CheckoutSummaryView";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethod from "../components/checkout/PaymentMethod";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import {
  createCashOnDeliveryOrder,
  createRazorpayOrder,
  verifyOnlinePayment,
} from "../services/orderService";

const defaultAddresses = [
  {
    id: "addr-1",
    fullName: "Ayush Chaubey",
    phone: "8423573070",
    address: "Shilpi Shikhar Mirzapur, Shilpi Shikhar, Shikhar Road",
    city: "Mirzapur",
    state: "Uttar Pradesh",
    pincode: "231306",
  },
  {
    id: "addr-2",
    fullName: "Clinic Support Desk",
    phone: "8956392236",
    address: "Rabta Ganj, near Polytechnic College, Sonbhadra",
    city: "Sonbhadra",
    state: "Uttar Pradesh",
    pincode: "231209",
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, clearCart, totalPrice, totalItems } = useCart();
  const [currentStep, setCurrentStep] = useState(2);
  const [addresses, setAddresses] = useState(() => {
    if (!user) return defaultAddresses;

    return [
      {
        id: "addr-user",
        fullName: user.name || defaultAddresses[0].fullName,
        phone: user.phone || defaultAddresses[0].phone,
        address: "Health Plaza, Civil Lines",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226001",
      },
      ...defaultAddresses,
    ];
  });
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [expandedPanel, setExpandedPanel] = useState("upi");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId),
    [addresses, selectedAddressId]
  );

  const productDiscount = totalItems ? Math.round(totalPrice * 0.08) : 0;
  const platformFee = totalItems ? 12 : 0;
  const deliveryFee = 0;
  const paymentDiscount =
    paymentMethod === "online" && totalItems ? Math.min(53, Math.round(totalPrice * 0.06)) : 0;
  const orderTotal =
    totalPrice + platformFee + deliveryFee - productDiscount - paymentDiscount;

  const canGoNext =
    (currentStep === 2 && Boolean(selectedAddress)) ||
    (currentStep === 3 && Boolean(paymentMethod)) ||
    currentStep === 4;

  const orderRequestPayload = useMemo(
    () => ({
      items: items.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.qty,
      })),
      shippingInfo: {
        fullName: selectedAddress?.fullName || "",
        phone: selectedAddress?.phone || "",
        email: user?.email || "",
        address: selectedAddress?.address || "",
        city: selectedAddress?.city || "",
        state: selectedAddress?.state || "",
        pincode: selectedAddress?.pincode || "",
      },
      subtotal: totalPrice,
      shipping: deliveryFee,
      tax: 0,
      discount: productDiscount + paymentDiscount,
      total: orderTotal,
    }),
    [
      deliveryFee,
      items,
      orderTotal,
      paymentDiscount,
      productDiscount,
      selectedAddress,
      totalPrice,
      user?.email,
    ]
  );

  const handleAddAddress = (address) => {
    const nextAddress = {
      id: `addr-${Date.now()}`,
      ...address,
    };

    setAddresses((prev) => [nextAddress, ...prev]);
    setSelectedAddressId(nextAddress.id);
  };

  const finalizeOrder = (order) => {
    clearCart();
    navigate("/order-success", {
      state: {
        id: order?._id || order?.id,
        items: order?.items || items,
        selectedAddress: order?.shippingInfo || selectedAddress,
        paymentMethod: order?.paymentMethod || paymentMethod,
        orderTotal: order?.total || orderTotal,
        order,
      },
    });
  };

  const handleCashOnDeliveryOrder = async () => {
    const response = await createCashOnDeliveryOrder(orderRequestPayload);
    return response.order;
  };

  const handleOnlinePaymentOrder = async () => {
    if (!window.Razorpay) {
      throw new Error("Razorpay checkout is not available");
    }

    const razorpayOrder = await createRazorpayOrder({ amount: orderTotal });

    return await new Promise((resolve, reject) => {
      const paymentObject = new window.Razorpay({
        key: razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Dr. APRANA'S",
        description: "Clinic ecommerce order payment",
        order_id: razorpayOrder.orderId,
        prefill: {
          name: selectedAddress?.fullName || user?.name || "",
          email: user?.email || "",
          contact: selectedAddress?.phone || user?.phone || "",
        },
        theme: {
          color: "#0f766e",
        },
        handler: async (response) => {
          try {
            const verified = await verifyOnlinePayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...orderRequestPayload,
            });
            resolve(verified.order);
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled"));
          },
        },
      });

      paymentObject.open();
    });
  };

  const handleContinue = async () => {
    if (currentStep < 4) {
      setFeedback({ type: "", message: "" });
      setCurrentStep((step) => step + 1);
      return;
    }

    if (!user || !localStorage.getItem("token")) {
      setFeedback({
        type: "error",
        message: "Please login first to place your order.",
      });
      navigate("/login");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setFeedback({ type: "", message: "" });

      const order =
        paymentMethod === "online"
          ? await handleOnlinePaymentOrder()
          : await handleCashOnDeliveryOrder();

      finalizeOrder(order);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Unable to place order right now",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!items.length) {
    return (
      <section className="section-space bg-slate-50">
        <div className="container-padded">
          <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-16 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              0
            </div>
            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Your checkout is waiting for products
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Add products to your cart first, then come back here to continue
              with address, payment, and order summary steps.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space bg-[linear-gradient(180deg,#f8fafc_0%,#eefaf8_100%)]">
      <div className="container-padded">
        <div className="mx-auto max-w-[1120px] space-y-8">
          <div className="space-y-4">
            <CheckoutProgress currentStep={currentStep} />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Complete your checkout details
              </h1>
              <p className="mt-3 text-sm text-slate-500">
                Delivery address, payment choice, and final summary in one guided flow.
              </p>
            </div>
            {feedback.message ? (
              <div
                className={`mx-auto max-w-[820px] rounded-2xl border px-4 py-3 text-sm ${
                  feedback.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {feedback.message}
              </div>
            ) : null}
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.26 }}
                >
                  {currentStep === 2 ? (
                    <AddressForm
                      addresses={addresses}
                      selectedAddressId={selectedAddressId}
                      onSelectAddress={setSelectedAddressId}
                      onAddAddress={handleAddAddress}
                      onContinue={() => setCurrentStep(3)}
                    />
                  ) : null}

                  {currentStep === 3 ? (
                    <PaymentMethod
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                      expandedPanel={expandedPanel}
                      onExpandedPanelChange={setExpandedPanel}
                      onlineDiscount={paymentDiscount}
                    />
                  ) : null}

                  {currentStep === 4 ? (
                    <CheckoutSummaryView
                      items={items}
                      selectedAddress={selectedAddress}
                      paymentMethod={paymentMethod}
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <OrderSummary
              totalItems={totalItems}
              productTotal={totalPrice}
              productDiscount={productDiscount}
              platformFee={platformFee}
              deliveryFee={deliveryFee}
              paymentDiscount={paymentDiscount}
              orderTotal={orderTotal}
              currentStep={currentStep}
              onContinue={handleContinue}
              isActionDisabled={!canGoNext || isPlacingOrder}
              actionLabel={
                currentStep === 4
                  ? isPlacingOrder
                    ? "Placing Order..."
                    : "Place Order"
                  : "Continue"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
