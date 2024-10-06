import { P } from "@/components";
import { isCompleted, isOngoing, isUpcoming } from "@/services";
import { ReactElement } from "react";

interface Props {
  startDate?: Date
  endDate?: Date
}

export const DateStateMarker: React.FC<Props> = ({
  startDate,
  endDate
}): ReactElement => {
  if (startDate == null || endDate == null) {
    return (
      <div className="bg-upcoming w-full flex justify-center items-center">
        <P>Upcoming</P>
      </div>
    );
  }

  return (
    <>
      {isOngoing(startDate, endDate) &&
        <div className="bg-ongoing w-full flex justify-center items-center">
          <P>Ongoing</P>
        </div>
      }
      {isCompleted(endDate) &&
        <div className="bg-completed w-full flex justify-center items-center">
          <P>Completed</P>
        </div>
      }
      {isUpcoming(startDate) &&
        <div className="bg-upcoming w-full flex justify-center items-center">
          <P>Upcoming</P>
        </div>
      }
    </>
  );
};
