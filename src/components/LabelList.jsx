import { useLabelsData } from "../helpers/useLabelsData"

export default function LabelList({ selected, toggle }) {
	const labelsQuery = useLabelsData()
	return (
		<div className="labels">
			<h3>Labels</h3>
			{labelsQuery.isLoading ? (
				<p>Loading</p>
			) : (
				<ul>
					{labelsQuery.data.map(e => (
						<li key={e.id}>
							<button onClick={() => toggle(e.id)} className={`label ${selected.includes(e.id) ? "selected" : ""} ${e.color}`}>
								{e.name}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
