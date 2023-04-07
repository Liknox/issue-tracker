import axios from "axios";
import { useQuery } from "react-query";

export function useIssueData(issueNumber) {
   return useQuery(["issue", issueNumber], ({signal}) => axios.get(`/api/issues/${issueNumber}`, {signal}).then(res => res.data));
}
