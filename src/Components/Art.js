function Art( props ){
    return (
        <div className="Art">
            <img src="./img/lightdarklight.jpg" alt="art symbol" />
            <p className="description">{props.description}</p>
            <p> Artist? </p>
            <p> What else goes here? Render art! </p>
            <div>
                <span>
                    <small>Author: </small>
                    {props.author}
                </span>
            </div>
        </div>
	);
};
export default Art;