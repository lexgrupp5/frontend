import { IconContainer, Link, P, TextColor } from "@/components";
import { PathType } from "@/constants";
import { FaChevronRight } from "react-icons/fa";

export interface BreadcrumbItemType {
  label: string;
  path: PathType;
}

interface Props {
  items: BreadcrumbItemType[];
}

export const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <nav>
      <ol className="flex gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 group">
            {index !== 0 && (
              <IconContainer className="text-gray-700">
                <FaChevronRight />
              </IconContainer> 
            )}
            {index === items.length - 1 ? (
              <P color={TextColor.DARK_X}>{item.label}</P>
            ) : (
              <Link
                className="text-black
                hover:text-indigo-800 hover:underline hover:underline-offset-4"
                to={item.path}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
