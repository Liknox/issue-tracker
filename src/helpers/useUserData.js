import axios from "axios"
import { useQuery } from "react-query"

export const useUserData = userId => {
	if (userId === null) return null
	const userData = useQuery(
		["users", userId],
		({ signal }) => axios.get(`/api/users/${userId}`, signal).then(res => res.data),
		{
			staleTime: 1000 * 60 * 5,
		}
	)

	return userData
}
