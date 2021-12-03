import Gallery from "./Gallery";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import sendArt from "../helpers/sendArt";

function Create( props ){
	let image = {
		name: "",
		creator: "",
		description: "",
		image: "",
	};
  const navigate = useNavigate();
	const [ art, setArt ] = useState("");
	const changeHandler = ( event ) =>{ 
		// console.log( event.target );
		setArt( event.target.value ); // use state update form
	};
	const submitHandler = ( event ) =>{
		event.preventDefault();
		let files = document.getElementById("image").files;
		let description = document.getElementById("description").value;
		var reader = new FileReader();
		if ( files.length > 0 ){
			reader.readAsDataURL(files[0]);
			reader.onload = function (){
				image.image = reader.result;
				image.name = files[0].name;
				image.description = description;
				image.creator = props.user.id;
				console.log( "Image datas:", image );
			}
		}
		props.user.image = image;
		console.log( props.user );
	  sendArt( image, props.user ).then((data) => {
			// props.addArt(); // TODO fix me if im'm counting art pieces ... for LARGE datasets ...
			console.log( "sendArt returned", data);
			navigate("/profile");
		});
	};
	return (
		<main className="Input">
			<h1>Share your Drawings/Creations</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="image">Choose an image to share:</label>
					<br />
					<input
						type="file"
						id="image"
						name="image"
						// accept="image/png, image/PNG, image/jpeg"
					/>
					<br />
					<label htmlFor="description">Describe this image:</label>
					<br />
					<input
						name="description"
						id="description"
						value={art}
						onChange={changeHandler}
					></input>
					<button type="submit">Create</button>
				</div>
			</form>
			<h2>Last 3 Creations in your Gallery</h2>
			<Gallery user={props.user} limit="3" />
		</main>
	);
};

export default Create;