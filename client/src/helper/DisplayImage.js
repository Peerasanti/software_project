import { useState } from 'react';

export default function DisplayImage({file}) {

    const [imgs, setImgs] = useState({});

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImgs(reader.result);
        console.log(imgs);
    }

    return (
        <div>
            <img style={{ width: '300px', height: '300px' }} src={imgs} alt=""/>
        </div>
    )
}