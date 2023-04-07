import axios from "axios"

const fetchWithError = async (url, options) => {
	const response = await axios.get(url, options)

	if (response.status === 200) {
		const result = await response.data

		if (result.error) {
			throw new Error(result.error)
		}

		return result
	}

	throw new Error(`Error ${response.status}: ${response.statusText}`)
}

export default fetchWithError
