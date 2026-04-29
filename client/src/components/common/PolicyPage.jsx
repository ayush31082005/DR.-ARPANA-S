import { Link } from "react-router-dom";
import PageHero from "./PageHero";
import { policyLinks } from "../../data/policyLinks";

export default function PolicyPage({
  title,
  description,
  lastUpdated,
  sections,
}) {
  return (
    <>
      <PageHero title={title} description={description} />

      <section className="section-space bg-slate-50">
        <div className="container-padded">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
            <div className="surface p-6 sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    Clinic Policy
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {title}
                  </h2>
                </div>
                <span className="inline-flex w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                  Last updated: {lastUpdated}
                </span>
              </div>

              <div className="space-y-8">
                {sections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {section.heading}
                    </h3>
                    {section.content ? (
                      <p className="mt-3 text-sm leading-8 text-slate-600">
                        {section.content}
                      </p>
                    ) : null}
                    {section.items?.length ? (
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-2xl bg-slate-50 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="surface p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Explore More
                </h3>
                <div className="mt-5 flex flex-col gap-3">
                  {policyLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="surface p-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Need Help?
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  If you need clarification about appointments, delivery,
                  returns, or privacy, our support team is here to help.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link to="/contact" className="btn-primary">
                    Contact Support
                  </Link>
                  <Link to="/appointment" className="btn-outline">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
