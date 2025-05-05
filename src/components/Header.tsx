import { User } from "../types";
import Logo from "./Logo";
import { NavMenu } from "./NavMenu";

type HeaderProps ={
  name: User['name']
}

export default function Header({name}: HeaderProps) {
  return (
    <header className="bg-slate-900 p-10">
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        <div>
          <Logo />
        </div>
        <NavMenu name={name} />
      </div>
    </header>
  )
}
