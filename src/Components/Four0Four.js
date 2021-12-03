import React from "react";

// 				<h1>Something Went Wrong getting to {props.path}</h1>


class Error extends React.Component {
	render(props){
		return (
			<main className="FourOFour">
				<h1>Something Went Wrong</h1>
				<img src="./img/404.jpg" alt="404 page" />
			</main>
		);
	}
}
export default Error;