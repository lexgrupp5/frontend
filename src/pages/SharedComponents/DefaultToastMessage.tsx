import { ErrorTopToast, OkTopToast, UnstyledButton } from "@/components";
import { useMessageContext } from "@/hooks";
import { ReactElement } from "react";

interface Props {
  onClose?: () => void;
}

export const DefaultToastMessage: React.FC<Props> = ({
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
        <OkTopToast onClose={handleClose}>
          <UnstyledButton className="max-w-full"
            onPress={() => { }}>
            {msgContext.message}
          </UnstyledButton>
        </OkTopToast>
      }
      {msgContext.errorMessage != null &&
        <ErrorTopToast onClose={handleClose} keepOpen={true}>
          {msgContext.errorMessage}
        </ErrorTopToast>
      }
    </>
  );
};
