import "./art.css";
function Art( props ){
    // console.log( "Art props", props );
    // console.log( "Art props image?", props.image );
    return (
			<div className="Art">
				<p>Description: {props.description}</p>
				<p>Image name: {props.name} </p>
				<p>CreatedAt: {props.createdAt}</p>{" "}
				<img className="artimg" src={props.image} alt={props.name} />
				<div>
					<span>
						<small>creator: </small>
						{props.creator}
					</span>
				</div>
			</div>
		);
};
export default Art;