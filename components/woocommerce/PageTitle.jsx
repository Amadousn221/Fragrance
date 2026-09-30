import Link from "next/link";

export default function PageTitle({ title, trail = [] }) {
  return (
    <div
      className="page-title"
      style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
    >
      <div className="container-full">
        <div className="row">
          <div className="col-12">
            <h3 className="heading text-center">{title}</h3>
            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
              <li>
                <Link className="link" href="/">
                  Accueil
                </Link>
              </li>
              {trail.map((t) => (
                <li key={t.href} className="d-flex align-items-center gap-2">
                  <i className="icon-arrRight" />
                  <Link className="link" href={t.href}>
                    {t.label}
                  </Link>
                </li>
              ))}
              <li>
                <i className="icon-arrRight" />
              </li>
              <li>{title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
