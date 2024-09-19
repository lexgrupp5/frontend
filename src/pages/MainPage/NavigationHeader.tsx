import { FaHome, FaUser } from "react-icons/fa";

import { Button, IconContainer, Link, NavLink } from "@/components";
import { Path } from "@/constants";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import { useAuthContext } from "@/hooks";

export const NavigationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuthContext();
  const linkClass = "text-indigo-200 hover:text-white cursor-pointer hover:underline";
  const iconClass = `${linkClass} w-10 h-10 p-2 rounded-full hover:bg-indigo-900`;
  
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const updateMenuOpen = (open: boolean) => {
    setMenuOpen(open);
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-indigo-950 shadow-md z-50 p-4">
      <div className="flex justify-between items-center">
        <Link to={Path.INDEX} ><IconContainer className={iconClass}>
          <FaHome />
        </IconContainer></Link>
        <nav className="flex justify-between items-center gap-3">
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
