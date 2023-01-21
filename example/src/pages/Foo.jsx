import { Link } from "react-router-dom";

export function Foo() {
  return (
    <div>
      <h1>
        Foo page
      </h1>
      <Link to="/" > Home </Link>
      |
      <Link to="/about" > About </Link>
    </div>
  )
}
