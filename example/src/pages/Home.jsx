import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>
        Home page
      </h1>
      <Link to="/about" > About </Link>
      |
      <Link to="/foo" > Foo </Link>
    </div>
  )
}
