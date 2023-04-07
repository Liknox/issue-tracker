import axios from "axios";
import { useQuery } from "react-query";

export function useIssueData(issueNumber) {
   return useQuery(["issue", issueNumber], () => axios.get(`/api/issues/${issueNumber}`).then(res => res.data));
}
