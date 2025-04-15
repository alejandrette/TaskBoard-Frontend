import Logo from "./Logo";
import { NavMenu } from "./NavMenu";

export default function Header() {
  return (
    <header className="bg-blue-950 p-5">
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        <div>
          <Logo />
        </div>
        <NavMenu />
      </div>
    </header>
  )
}
