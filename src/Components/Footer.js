import React from "react";
import links from "../data/routes.json";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";

class Footer extends React.Component {
	render(){
		return (
			<footer className="Footer">
				<ul>
					{links
						.filter( ( link, index ) =>{
							if ( this.props.loggedin ) {
								return index % 2 === 0;
							} else {
								return index % 2 !== 0;
							}
						})
						.map( ( link ) =>{
							return <ListItem key={link} location={link} />;
						})}
					<li className="listItem">
						<Link to="/">
							<img
								src="./img/lightdarklight.jpg"
								alt="Art logo"
							/>
						</Link>
					</li>
				</ul>
			</footer>
		);
	};
};
export default Footer;