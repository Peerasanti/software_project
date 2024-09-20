export default function PreviewImage({path}) {

    return (
        <div>
            <img style={{ width: '300px', height: '300px' }} src={path} alt=""/>
        </div>
    )
}