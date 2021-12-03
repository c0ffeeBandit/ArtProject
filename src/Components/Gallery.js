import React from "react";
// import Art from './Art';
import getArt from "../helpers/getArt";

class Gallery extends React.Component {
	// Arts limited from the fetch helper
	constructor( props ){
		super( props );
		this.state = {
			art:[]
		};
		this.addArt = ( data ) =>{
			this.setState( () =>{
				return{
					art:data
				};
			});
		};
	};
	componentDidMount(){ // wait till component exists on the page, then fill it
		// console.log( this.props.user );
		getArt( this.props.limit, this.props.user.username )
		.then( ( data ) => {
			this.addArt( data );
		});
	};
	render(){
		// console.log( links );
		// console.log( this.props.user );
		let { gallery } = this.state;
		return (
			<div className="Gallery" >
				{/* { gallery.map( ( art ) =>{
						return (
							<Art key = { art.id }
							description = { art.description }
							author = { art.author } />
							// TODO generate smaller preview of the art
						);
        })} */}
				<p>Gallery Render Stub - {gallery}</p>
			</div>
		);
	};
};
export default Gallery;