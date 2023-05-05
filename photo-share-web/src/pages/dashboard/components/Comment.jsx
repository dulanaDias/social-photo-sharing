export default ({ username, content }) => {
    return <div className="card" >
        <div className="card-body">
            <span className="card-text fw-bold underline">{username}</span>
            <p className="card-text">{content}</p>
        </div>
    </div>
}