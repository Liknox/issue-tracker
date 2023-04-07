import axios from "axios";
import { useQuery } from "react-query";

export function useIssueComments(issueNumber) {
   return useQuery(["issue", issueNumber, "comments"], () => axios.get(`/api/issues/${issueNumber}/comments`).then(res => res.data));
}
