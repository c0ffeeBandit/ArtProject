import React from "react";
import Gallery from './Gallery';

class Main extends React.Component {
	render() {
		return (
			<main className="Main">
				<h1>Main Page</h1>
				<h1>Creations</h1>
				<Gallery user="" />
			</main>
		);
	};
};
export default Main;