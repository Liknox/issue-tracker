import axios from "axios"
import { useQuery } from "react-query"

export const useLabelsData = () => {
	const labelsQuery = useQuery(["labels"], () => axios.get("/api/labels").then(res => res.data), {
		staleTime: 1000 * 60 * 60,
	})
	return labelsQuery
}
