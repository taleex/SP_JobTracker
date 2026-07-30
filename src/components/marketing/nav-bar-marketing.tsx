import { Button } from "../ui/button";

export default function NavBarMarketing() {
  return (
    <nav className="nav-bar-marketing">
      <h1 className="nav-bar-marketing-logo">JobTrackers</h1>
      <div className="nav-bar-marketing-buttons-group ">
        <Button>Log In</Button>
        <Button variant="outline">Sign Up</Button>
      </div>
    </nav>
  );
}
