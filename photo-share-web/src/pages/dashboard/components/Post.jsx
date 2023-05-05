import sample from '../assets/sample.jpeg'
import likeIcon from '../assets/like.png'
import dislikeIcon from '../assets/dislike.png'
import heartIcon from '../assets/heart.png'
import laughIcon from '../assets/laugh.png'
import { useState } from 'react'
import Comment from './Comment'

const styles = {
    reactionIcon: {
        height: 15,
        width: 15,
        marginRight: 10
    }
}

export default () => {
    const [commentsVisible, setCommentsVisible] = useState(false)

    return <div className='mt-3 ms-2 me-2 row'>
        <div class="card" style={{width: "50%"}}>
            <img src={sample} class="card-img-top" alt="..." />
            <div class="card-body">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <img src={likeIcon} style={styles.reactionIcon} />
                        <span>0</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <img src={dislikeIcon} style={styles.reactionIcon} />
                        <span>0</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <img src={heartIcon} style={styles.reactionIcon} />
                        <span>0</span>
                    </div>
                    <div className="col d-flex align-items-center">
                        <img src={laughIcon} style={styles.reactionIcon} />
                        <span>0</span>
                    </div>
                </div>
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button
                    class={`btn btn-${commentsVisible ? 'danger' : 'primary'}`}
                    onClick={() => {setCommentsVisible(!commentsVisible)}}
                >
                    {commentsVisible ? "Hide comments" : "See comments"}
                </button>
            </div>
        </div>

        {commentsVisible && <div class="col card ms-2">
            <div class="card-body">
                <h5 class="card-title">Comments</h5>
                <div style={{ height: '100%' }}>
                <div className="row" style={{  overflow: 'scroll', height: '100vh'}}>
                    <Comment username="Nishain De Silva" content="This is awesome!" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />

                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                    <Comment username="Nishain De Silva" content="This is awesome!. Some long text blah blah blah" />
                </div>
                </div>
                
               
            </div>
        </div>}
    </div>

}