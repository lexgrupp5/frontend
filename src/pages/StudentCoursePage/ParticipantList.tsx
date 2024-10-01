// import { ReactElement } from "react";
// import { P } from "@/components";
// import { ParticipantItem } from "./ParticipantItem";
// import { useStudentPageContext } from "@/hooks";

// export const ParticipantList = (): ReactElement => {
//     const { participants } = useStudentPageContext();
//     return (
//         <article
//             className="flex flex-wrap p-4 max-w-7xl m-auto">
//             {participants == null &&
//                 <div>
//                     <P> Participant list was null </P>
//                 </div>
//             }
//             {participants?.length === 0 &&
//                 <div className="w-full flex justify-center p8">
//                     <P>No participants were found!</P>
//                 </div>
//             }
//             {participants!.length !== 0 &&
//                 participants!.map((participant) => (
//                     <div key={participant.name}>
//                         <ParticipantItem participant={participant} />
//                     </div>
//                 ))
//             }

//         </article>
//     )
// }