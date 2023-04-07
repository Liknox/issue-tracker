import axios from "axios"
import { useQuery } from "react-query"

export const useUserData = userId => {
	if (userId === null) return null
	const userData = useQuery(["users", userId], () => axios.get(`/api/users/${userId}`).then(res => res.data))

	return userData
}
