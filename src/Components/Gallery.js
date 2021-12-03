import React from "react";
import Art from './Art';
import getArt from "../helpers/getArt";

class Gallery extends React.Component { // Art items limited from the getArt helper
	constructor( props ){
		super( props );
		this.state = {
			art:[] 
		};
		this.addArt = ( data ) =>{
			// console.log( "Gallery.addArt(data)", data );
			this.setState({ art: data });
			//() =>{
			// 	return{
			// 		art: data,
			// 	};
		};
	};
	componentDidMount(){ // wait till component exists on the page, then fill it
		// console.log( this.props.user );
		getArt( this.props.limit, this.props.user.username )
		// getArt( this.props.limit, "" )
		.then( ( data ) => {
			// console.log( "Gallery.getArt( data )", data );
			this.addArt( data );
		});
	};
	render(){
		// console.log( links );
		// console.log( this.props.user );
		let gallery = this.state.art;
		// console.log( gallery );
		return (
			<div className="Gallery">
				{ gallery.map( ( art ) =>{
					// console.log( art.image );
						return (
							<Art
								key={art._id}
								description={art.description}
								creator={art.creator}
								image={art.image}
								name={art.name}
								createdAt={art.createdAt}
							/>
						);
        })}
			</div>
		);
	};
};
export default Gallery;