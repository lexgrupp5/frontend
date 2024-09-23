import { ReactElement, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { InputProps, Input } from "./Input";

export const SecretInput: React.FC<InputProps> = ({
  label,
  ...props
}): ReactElement => {
  const [hide, setHide] = useState(true);

  const toggleHide = () => {
    setHide((prev) => !prev);
  };

  return (
    <>
      {hide ? (
        <Input
          type="password"
          label={label}
          icon={<FaEye />}
          onSelectIcon={toggleHide}
          {...props}
        />
      ) : (
        <Input
          type="text"
          label={label}
          icon={<FaEyeSlash />}
          onSelectIcon={toggleHide}
          {...props}
        />
      )}
    </>
  );
};
