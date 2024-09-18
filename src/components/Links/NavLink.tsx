import { ReactElement } from "react";
import { NavLink as NavLinkPlain } from "react-router-dom";

interface Props {
	to: string;
	label: string;
}

export const NavLink: React.FC<Props> = ({
	to,
	label
}): ReactElement => {

	return (
		<NavLinkPlain
			to={to}
			className={({ isActive }) => (
				isActive 
					? "text-blue-500 font-bold"
					: "text-gray-500"
			)}>
			{label}
		</NavLinkPlain>
	);
};
