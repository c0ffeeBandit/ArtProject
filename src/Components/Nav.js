import React from "react";
import links from "../data/routes.json";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

class Nav extends React.Component {
	render() {
		// console.log( "Nav (pre filter) says: " + links );
		return (
			<nav className="Navigation" style={{ position: "fixed" }}>
				<ul>
					<li className="listItem">
						<Link to="/">
							<img
								src="./img/lightdarklight.jpg"
								alt="Art logo"
							/>
						</Link>
					</li>
					{links
						// .filter((link, index) => {
						// 	if ( this.props.loggedin ) {
						// 		return index % 2 === 0;
						// 	} else {
						// 		return index % 2 !== 0;
						// 	}
						// })
						.map((link) => {
							return <ListItem key={link} location={link} />;
						})}
				</ul>
			</nav>
		);
	};
};
export default Nav;