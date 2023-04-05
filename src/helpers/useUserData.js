import { useQuery } from "react-query"

export const useUserData = userId => {
   if (userId === null) return null
	const userData = useQuery(["users", userId], () => fetch(`/api/users/${userId}`).then(res => res.json()))

	return userData
}
