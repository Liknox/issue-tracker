import { useQuery } from "react-query"
import { IssueItem } from "./IssueItem"
import { useState } from "react"

export default function IssuesList({ labels, status }) {
	const [searchValue, setSearchValue] = useState("")

	const issuesQuery = useQuery(["issues", { labels, status }], () => {
		const statusString = status ? `&status=${status}` : ""
		const labelsString = labels.map(e => `labels[]=${e}`).join("&")
		return fetch(`/api/issues?${labelsString}${statusString}`).then(res => res.json())
	})

	const searchQuery = useQuery(
		["issues", "search", searchValue],
		() => fetch(`/api/search/issues?q=${searchValue}`).then(res => res.json()),
		{
			enabled: !!searchValue.length,
		}
	)

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault()
					if (e.target.elements.search.value === "") return
					setSearchValue(e.target.elements.search.value)
					e.target.elements.search.value = ""
				}}
			>
				<label htmlFor="search">Search Issues</label>
				<input
					type="search"
					placeholder="search"
					name="search"
					id="search"
					onChange={e => {
						if (e.target.value.length === 0) setSearchValue("")
					}}
				/>
			</form>
			<h2>Issues List</h2>
			{issuesQuery.isLoading ? (
				<p>Loading...</p>
			) : searchQuery.status === "idle" && searchQuery.isLoading === false ? (
				<ul className="issues-list">
					{issuesQuery.data.map(issue => (
						<IssueItem
							key={issue.id}
							title={issue.title}
							number={issue.number}
							assignee={issue.assignee}
							commentCount={issue.comments.length}
							createdBy={issue.createdBy}
							createdDate={issue.createdDate}
							labels={issue.labels}
							status={issue.status}
						/>
					))}
				</ul>
			) : (
				<>
					<h2>Search Results</h2>
					{searchQuery.isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							<p>{searchQuery.data.count} Results</p>
							<ul className="issues-list">
								{searchQuery.data.items.map(issue => (
									<IssueItem
										key={issue.id}
										title={issue.title}
										number={issue.number}
										assignee={issue.assignee}
										commentCount={issue.comments.length}
										createdBy={issue.createdBy}
										createdDate={issue.createdDate}
										labels={issue.labels}
										status={issue.status}
									/>
								))}
							</ul>
						</>
					)}
				</>
			)}
		</div>
	)
}
