export default ({ data }) => {
    return <div className="card mb-2 p-1" >
        <div className="card-body p-0">
            <img
                src={data.profile.picture} 
                style={{ height: 30, width: 30, borderRadius: '50%' }}
            />
            <span className="card-text fw-bold underline">{data.profile.name}</span>
            <p className="card-text">{data.body}</p>
        </div>
    </div>
}