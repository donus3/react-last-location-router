import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <h1>
        About page
      </h1>
      <Link to="/" > Home </Link>
      |
      <Link to="/foo" > Foo </Link>
    </div>
  )
}
