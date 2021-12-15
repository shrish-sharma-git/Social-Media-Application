import React from 'react'

const PostModal = ({selectedImg, setSelectedImage }) => {
    const handleClick = (e) => {
        console.log('Image Clicked')
        if (e.target.classList.contains('backdrop')) {
            setSelectedImage(null);
        }
    }

    return (  
        <div className="backdrop" onClick={handleClick}>
            <img 
                src={selectedImg}
                alt=""
            />
        </div>
    );
}
 
export default PostModal;