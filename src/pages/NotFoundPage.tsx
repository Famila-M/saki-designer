import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="empty-state page-empty section-wrap"><p className="eyebrow">A little detour</p><h1>This page isn't in our collection.</h1><Link className="button button-dark" to="/">Return home</Link></section>
}