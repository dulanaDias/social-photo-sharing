export default ({ username, content }) => {
    return <div className="card mb-2 p-1" >
        <div className="card-body p-0">
            <span className="card-text fw-bold underline">{username}</span>
            <p className="card-text">{content}</p>
        </div>
    </div>
}