import Gallery from "./Gallery";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import sendArt from "../helpers/sendArt";

function Create( props ){
	let image = {
		name: "",
		creator: "",
		image: "",
	};
  const navigate = useNavigate();
	const [ art, setArt ] = useState("");
	const changeHandler = ( event ) =>{
		// console.log( event.target );
		setArt( event.target.value );
	};
	const submitHandler = ( event ) =>{
		event.preventDefault();
		let files = document.getElementById("image").files;
		var reader = new FileReader();
		if ( files.length > 0 ){
			reader.readAsDataURL(files[0]);
			reader.onload = function (){
				image.image = reader.result;
				image.name = files[0].name;
				image.creator = props.user.id;
				console.log( "Image datas:", image );
			}
		}
		props.user.image = image;
		console.log( props.user );
	  sendArt( image, props.user ).then((data) => {
			// props.addArt(); // TODO fix me
			console.log( "sendArt returned", data);
		});
		// navigate("/");
	};
	return (
		<main className="Input">
			<h1>Draw Your Thoughts</h1>
			<form onSubmit={submitHandler}>
				<label htmlFor="image">Choose an image to share:</label>
				<br/>
				<input
					type="file"
					id="image"
					name="image"
					// accept="image/png, image/PNG, image/jpeg"
					// value={art}
				/>
				{/* <textarea
						name="art"
						value={art}
						onChange={changeHandler}
					></textarea> */}
				<button type="submit">Create</button>
			</form>
			<h2>Last 3 Creations in your Gallery</h2>
			<Gallery user={props.user} limit="3" />
		</main>
	);
};

export default Create;