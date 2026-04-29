let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
        const { default: Razorpay } = await import("razorpay");

        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    } catch (error) {
        console.warn(
            "Razorpay package is not installed. Payment routes will stay disabled."
        );
    }
}

export default razorpay;
