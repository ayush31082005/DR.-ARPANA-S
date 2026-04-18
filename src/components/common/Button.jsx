export default function Button({ children, variant = "primary", type = "button", className = "", ...props }) {
  const classes = variant === "outline" ? "btn-outline" : "btn-primary";
  return (
    <button type={type} className={`${classes} ${className}`} {...props}>
      {children}
    </button>
  );
}
