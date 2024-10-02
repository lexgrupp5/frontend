import { ErrorTopToast, OkTopToast, UnstyledButton } from "@/components";
import { useMessageContext } from "@/hooks";
import { ReactElement } from "react";

interface Props {
  headerOffset?: boolean;
  onClose?: () => void;
}

export const DefaultToastMessage: React.FC<Props> = ({
  headerOffset = true,
  onClose = () => {}
}): ReactElement => {
  const msgContext = useMessageContext();

  const handleClose = () => {
    onClose();
    msgContext.clearMessages();
  };
  
  return (
    <>
      {msgContext.message != null &&
        <OkTopToast
          headerOffset={headerOffset}
          onClose={handleClose}>
          <UnstyledButton className="max-w-full"
            onPress={() => { }}>
            {msgContext.message}
          </UnstyledButton>
        </OkTopToast>
      }
      {msgContext.errorMessage != null &&
        <ErrorTopToast
          keepOpen={true} 
          headerOffset={headerOffset}
          onClose={handleClose}>
          {msgContext.errorMessage}
        </ErrorTopToast>
      }
    </>
  );
};
