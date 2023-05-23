import React from "react";

const ImageLink = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div style={{display: "flex", justifyContent: "center"}}>
                <input className="f4 w-40 pa2" type="text" style={{displey: "flex"}} placeholder="Enter URL" onChange={onInputChange} />
                <button  className="w-10 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLink;