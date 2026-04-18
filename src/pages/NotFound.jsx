import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="container-padded">
        <div className="surface mx-auto max-w-2xl p-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">404</h1>
          <p className="mt-4 text-sm text-slate-600">The page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-block"><Button>Go Home</Button></Link>
        </div>
      </div>
    </section>
  );
}
