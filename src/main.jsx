import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import { worker } from "@uidotdev/react-query-api"
import { QueryClient, QueryClientProvider } from "react-query"
import App from "./App"
import "./index.css"

const queryClient = new QueryClient()

new Promise(res => setTimeout(res, 100))
	.then(() =>
		worker.start({
			quiet: true,
			onUnhandledRequest: "bypass",
		})
	)
	.then(() => {
		ReactDOM.createRoot(document.getElementById("root")).render(
			<QueryClientProvider client={queryClient}>
				<HashRouter>
					<div className="container">
						<App />
					</div>
				</HashRouter>
			</QueryClientProvider>
		)
	})
