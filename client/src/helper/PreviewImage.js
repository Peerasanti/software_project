import { useState } from 'react';

export default function PreviewImage({file}) {

    const [image_url, setImage_url] = useState({});

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImage_url(reader.result)
    }

    return (
        <div>
            <img style={{ width: '300px', height: '300px' }} src={image_url} alt=""/>
        </div>
    )
}