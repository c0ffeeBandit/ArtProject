import React from "react";
import Gallery from './Gallery';

class Main extends React.Component {
	render() {
		return (
			<main className="Main">
				<h1>Recent Creations</h1>
				<Gallery user="" limit="20"/>
			</main>
		);
	};
};
export default Main;