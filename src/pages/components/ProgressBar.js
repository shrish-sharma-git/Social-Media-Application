import React, { useEffect } from 'react'

const ProgressBar = ({ progress, file, setFile, url }) => {

    useEffect(() => {
        if(url){
            setFile(null); 
        }
    }, [url, setFile]);

    return (  
        <div>Progress {progress}%</div>
    );
}
 
export default ProgressBar;