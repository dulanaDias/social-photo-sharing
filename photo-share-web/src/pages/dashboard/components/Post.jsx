import sample from '../assets/sample.jpeg'
import likeIcon from '../assets/like.png'
import dislikeIcon from '../assets/dislike.png'
import heartIcon from '../assets/heart.png'
import laughIcon from '../assets/laugh.png'
import { useEffect, useState } from 'react'
import Comment from './Comment'

const styles = {
    reactionIcon: {
        height: 15,
        width: 15,
        marginRight: 10
    }
}

export default ({ data, setReaction, loadComments, postComment }) => {
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [comment, setComment] = useState("")

    const react = (reactionType) => {
        return () => {
            if (data.selfReaction == "none" || reactionType == data.selfReaction)
                if (data.selfReaction == "none")
                    setReaction(reactionType, true, data.id)
                else
                    setReaction(reactionType, false, data.id)
        }
    }

    useEffect(() => {
        if (commentsVisible)
            loadComments(data.id)
    }, [commentsVisible])
    
    return <div className='mt-3 ms-2 me-2 row'>
        <div class="card ps-0 pe-0" style={{ width: "50%" }}>
            <img src={data.image} class="card-img-top" alt="..." />
            <div class="card-body">
                {data.selfReaction != "none" && <span className='row'>{`You have reacted on this post with ${data.selfReaction}`}</span>}
                <div className="row">
                    <button
                        onClick={react('like')}
                        className="btn reactionButton col d-flex align-items-center"
                    >
                        <img src={likeIcon} style={styles.reactionIcon} />
                        <span>{data.like}</span>
                    </button>
                    <button
                        onClick={react('dislike')}
                        className="btn reactionButton col d-flex align-items-center"
                    >
                        <img src={dislikeIcon} style={styles.reactionIcon} />
                        <span>{data.dislike}</span>
                    </button>
                    <button
                        onClick={react('love')}
                        className="btn reactionButton col d-flex align-items-center"
                    >
                        <img src={heartIcon} style={styles.reactionIcon} />
                        <span>{data.love}</span>
                    </button>
                    <button
                        onClick={react('funny')}
                        className="btn reactionButton col d-flex align-items-center"
                    >
                        <img src={laughIcon} style={styles.reactionIcon} />
                        <span>{data.funny}</span>
                    </button>
                </div>
                <h5 class="card-title">{`Uploaded by ${data.profile.username}`}</h5>
                <p class="card-text">{data.description}</p>
                <button
                    class={`btn btn-${commentsVisible ? 'danger' : 'primary'}`}
                    onClick={() => {
                        setCommentsVisible(!commentsVisible)
                    }}
                >
                    {commentsVisible ? "Hide comments" : "See comments"}
                </button>
            </div>
        </div>

        {commentsVisible && <div class="col card ms-2">
            <div class="card-body">
                <h5 class="card-title">Comments</h5>
                <div className="row"
                    style={{ overflow: 'scroll' }}
                >
                    {/* <Comment key={`comment-key-dsd`} data={{
                        body: 'hello world',
                        profile: {
                            name: 'hjfbdshbfsf',
                            picture: ''
                        }
                    }} /> */}
                    {(data.comments || []).map((comment, index) => 
                        <Comment key={`comment-key-${index}`} data={comment} />
                    )}
                </div>
                <div className='d-flex'>
                    <input
                        className='form-control'
                        placeholder="Enter a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button 
                        className='btn btn-primary ms-1'
                        onClick={() => { postComment(comment, data.id) }}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>}
    </div>

}