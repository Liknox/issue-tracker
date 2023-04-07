import axios from "axios"
import { useQuery } from "react-query"

export function useIssueComments(issueNumber) {
	return useQuery(["issue", issueNumber, "comments"], ({ signal }) =>
		axios.get(`/api/issues/${issueNumber}/comments`, { signal }).then(res => res.data)
	)
}
