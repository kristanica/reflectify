import Link from "next/link";
import { ReflectifyLogo } from "../ReflectifyLogo";
import { Label } from "../ui/label";

const Navigation = () => {
  const navOptions = [
    { name: "Home", route: "#hero" },
    { name: "Features", route: "#features" },
  ];

  return (
    <nav className="fixed z-99 w-full flex flex-row items-center justify-between px-10 bg bg-background border-b  py-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <ReflectifyLogo className="h-10 w-10"></ReflectifyLogo>

        <Label className="tracking-wider font-bold text-amber-500">
          REFLECTIFY
        </Label>
      </div>

      <div className="flex flex-row gap-10 items-center">
        {navOptions.map((nav, index) => (
          <Link
            href={nav.route}
            key={index}
            className="text-foreground cursor-pointer"
          >
            <Label className="relative cursor-pointer text-sm font-medium transition-colors duration-300 hover:text-amber-500 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100">
              {nav.name}
            </Label>
          </Link>
        ))}

        <Link href="/login">
          <p className="text-foreground text-sm font-medium cursor-pointer px-7 py-2 border rounded-full mx-2  hover:bg-amber-500  hover:text-black transition-all   duration-300 hover:scale-105">
            Login
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
