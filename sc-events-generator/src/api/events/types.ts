// export type EventResponse = {
//   run_id: string;
//   result: {
//     emergency_diffuser: {
//       emergency_type: string;
//       number_of_affected_nodes: number;
//       severity: "extreme" | "severe" | "harsh" | "mild" | "unknown";
//       affected_nodes: {
//         name: string;
//         labels: string;
//       }[];
//     };
//   };
// };

export type EventResponse = {
  results: any;
};

export type ResetPipelineResponse = {
  run_id: string;
  result: {
    emergency_reset: {
      number_of_reset_nodes: number;
    };
  };
};
