import { ReactElement, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { InputProps, Input } from "./Input";
import { IconContainer } from "../Icons";
import { Button } from "../Buttons";

export const SecretInput: React.FC<InputProps> = ({
  label,
  ...props
}): ReactElement => {
  const [hide, setHide] = useState(true);

  const toggleHide = () => {
    setHide(prev => !prev);
  };

  return (
    <>{hide
      ? <div className="relative">
        <Input type="password" label={label} {...props} />
        <Button 
          className="absolute right-6 bottom-2 cursor-pointer outline-none"
          onPress={toggleHide}>
          <IconContainer className="h-6 w-6 text-gray-600">
            <FaEye />
          </IconContainer>
        </Button>
      </div>
      : <div className="relative">
        <Input type="text" label={label} {...props} />
        <Button className="absolute right-6 bottom-2 cursor-pointer outline-none"
          onPress={toggleHide}>
          <IconContainer className="h-6 w-6 text-gray-600">
            <FaEyeSlash />
          </IconContainer>
        </Button>
      </div>
    }</>
  );
};
