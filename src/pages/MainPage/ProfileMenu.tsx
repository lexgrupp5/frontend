import React, { useRef, useEffect, ReactElement } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

import { IconContainer } from "@/components";
import { NavLink } from "@/components/Links";
import { Path } from "@/constants";
import { useAuthContext } from "@/hooks";

interface Props {
  open: boolean;
  updateOpen: (open: boolean) => void;
}

const ProfileMenu: React.FC<Props> = ({
  open,
  updateOpen
}): ReactElement => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current != null &&
        !menuRef.current.contains(event.target as Node)) {
        updateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateOpen]);

  return (
    <>{open && (
      <article ref={menuRef}
        className="absolute top-10 right-3 
          w-48 p-2 
          flex flex-col gap-2
          border-solid border-2 border-indigo-100
          bg-indigo-950
          rounded-tl-lg rounded-bl-lg rounded-br-lg">
        <NavLink to={Path.PROFILE}
          className="flex justify-between items-center
          p-2 text-indigo-100 hover:bg-indigo-900"
          activeClassName="flex justify-between items-center
          p-2 text-indigo-100 hover:bg-indigo-900">
          <IconContainer><FaUser /></IconContainer>
          Profile
        </NavLink>
        <hr className="border-solid border-1 border-indigo-100" />
        <div
          className="flex justify-between items-center 
          p-2 text-indigo-100 hover:bg-indigo-900"
          onClick={async () => {  await logout(); }}>
          <IconContainer><FaSignOutAlt /></IconContainer>
          Logout
        </div>
      </article>
    )}</>
  );
};

export default ProfileMenu;
