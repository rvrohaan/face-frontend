import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
    return (
        <div className="ma" style={{display: 'flex', justifyContent: 'center'}}>
            <div className="absolute mt2">
                <img id="inputimg" src={imageURL} alt='' width="500px" height="auto"/>
                <div className="bounding_box" style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;