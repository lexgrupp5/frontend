import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";

import { Button, IconContainer, Link, NavLink } from "@/components";
import { Path, StudentPath } from "@/constants";
import ProfileMenu from "./ProfileMenu";
import { useAuthContext } from "@/hooks";

export const NavigationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuthContext();
  const linkClass = `text-gray-300 cursor-pointer
    hover:text-white
    hover:underline
    hover:underline-offset-4
    transition-all duration-300`;
  const iconClass = `w-10 h-10 p-2 rounded-full
    text-gray-300 cursor-pointer
    hover:bg-indigo-900`;

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const updateMenuOpen = (open: boolean) => {
    setMenuOpen(open);
  };

  const username = "Bo81"; //PLACEHOLDER STRING, USERNAME TO BE FETCHED FROM LOGIN

  return (
    <header className="fixed h-[var(--header-height)]
    top-0 left-0 w-full p-4
    bg-indigo-950
    shadow-md z-50">
      <div className="flex justify-between items-center">
        <Link to={Path.INDEX} ><IconContainer className={iconClass}>
          <FaHome />
        </IconContainer></Link>
        <nav className="flex justify-between items-center gap-3 dura">
          <NavLink to={StudentPath.constructStudentHomePath(username)} className={linkClass}>
            StudentLanding
          </NavLink>
          <NavLink to={Path.CURRENT_COURSE} className={linkClass}>
            Current
          </NavLink>
          <NavLink to={Path.COURSES} className={linkClass}>
            Courses
          </NavLink>
          <Button className="relative focus:outline-none"
            onPress={() => { toggleMenu(); }}>
            <IconContainer className={iconClass}>
              <FaUser />
            </IconContainer>
            <ProfileMenu open={menuOpen}
              updateOpen={updateMenuOpen}
              logout={logout} />
          </Button>
        </nav>
      </div>
    </header>
  );
};
