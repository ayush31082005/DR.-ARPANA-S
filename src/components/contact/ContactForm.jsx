export default function ContactForm() {
  return (
    <form className="surface grid gap-4 p-6">
      <input className="input-base" placeholder="Your name" />
      <input className="input-base" placeholder="Email address" />
      <input className="input-base" placeholder="Phone number" />
      <textarea className="input-base min-h-[140px]" placeholder="Write your message" />
      <button className="btn-primary">Send Message</button>
    </form>
  );
}
