import logoutIcon from '../dashboard/assets/logout.png'
import profileSettings from '../dashboard/assets/profileSettings.png'
import blankProfile from '../dashboard/assets/blankProfile.webp'
import EditableField from './components/EditableField'
import Post from './components/Post'
import { useEffect, useState } from 'react'
import Network from '../../network'
import { useNavigate } from 'react-router-dom'

const styles = {
    icon: {
        height: 20,
        width: 20,
    },
    navButton: {
        backgroundColor: 'white'
    },
    gradientButton: {
        backgroundImage: 'linear-gradient(to right bottom, rgb(0, 178, 244), rgb(54 132 235))',
        color: 'white',
        fontWeight: 'bold'
    },
    photoListContainer: {
        backgroundColor: '#c1c1ea',
        height: '100vh',
        overflow: 'scroll'
    },
    profilePicture: {
        borderRadius: 50,
        height: 100,
        width: 100
    }
}

function Dashboard() {

    const navigate = useNavigate()
    const [captureDescription, setCaptureDescription] = useState(false)
    const [description, setDescription] = useState("")
    const [posts, setPosts] = useState([])

    const refreshPosts = async () => {
        const result = await Network.get('photo')

        if (result.data.success) {
            console.log(result.data.data)
            setPosts(result.data.data)
        }
    }

    const logout = () => {
        localStorage.clear()
        navigate('/auth')
    }

    useEffect(() => {
        refreshPosts()
    }, [])

    const onPublishPhoto = (event) => {
        const reader = new FileReader()
        reader.onload = async () => {
            const result = await Network.post('photo', {
                image: reader.result,
                description
            })
            
            if (result.data.success) {
                setDescription("")
                setCaptureDescription(false)
                refreshPosts()
            }
        }
        reader.onerror = () => {
            console.log(reader.error)
        }
        reader.readAsDataURL(event.currentTarget.getElementsByTagName('input')[0].files[0])
    }

    const cancelPhotoPost = () => {
        setCaptureDescription(false)
        setDescription("")
    }


    const onFileUploadClick = (event) => {
        event.currentTarget.getElementsByTagName('input')[0].value = ''
        event.currentTarget.getElementsByTagName('input')[0].click()
    }

    const onReacted = async (reactionType, didReacted, id) => {
        const result = await Network.put('photo/react', { type: reactionType, reacted: didReacted, id })
        if(result.data.success) {
            const updatedReactions = result.data.updatedReactions
            const index = posts.findIndex((post) => post.id == id)
            console.log({updatedReactions})
            const { like, dislike, love, funny, selfReaction } = updatedReactions
            posts[index] = {
                ...posts[index],
                like, dislike, love, funny, selfReaction
            }
            setPosts([...posts])
        }
    }

    return <div className="Dashboard">

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light" style={{
            backgroundImage: 'linear-gradient(to left top, #8e00ff, #00ffdb)'
        }}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Photo Sharing</a>
                <div>
                    <button
                        className='btn ms-3'
                        style={styles.navButton}
                        onClick={logout}
                    >
                        <img src={logoutIcon} style={styles.icon} />
                    </button>
                </div>
            </div>
        </nav>
        <div className='row container-fluid'>
            <div className='col-4 p-4'>
                <div className='m-auto card'>
                    <div className='card-body ps-3'>
                        <h5 className='card-title'>Profile</h5>
                        <div className='col col-gutter'>
                            <div className='d-flex  align-items-center'>
                                <img src={blankProfile} className='' style={styles.profilePicture} />
                                <button className='ms-2 btn btn-primary'>Change</button>
                            </div>

                            <EditableField value={"Nishain De Silva"} />
                            <EditableField value={"nishain.atomic@gmail.com"} />
                            <EditableField value={"sample"} isPassword />


                            {captureDescription && <div className='mt-3 row'>
                                <label class="form-label">Tell something photo</label>
                                <textarea class="form-control" value={description}
                                    onChange={
                                        (e) => setDescription(e.target.value)
                                    }
                                    rows="3"
                                 />
                            </div>}
                            <div className='row d-flex justify-content-center'>
                                <button
                                    className="btn btn-primary"
                                    onClick={captureDescription ? onPublishPhoto : onFileUploadClick} >
                                    <input type="file"
                                        onChange={() => { setCaptureDescription(true) }}
                                        hidden accept="image/png, image/gif, image/jpeg" />
                                    Post Photo
                                </button>
                                {captureDescription && <button
                                    onClick={cancelPhotoPost}
                                    className='btn btn-danger' >
                                    Cancel
                                </button>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div
                className='col-8'
                style={styles.photoListContainer}>
                {
                    posts.map((post) => <Post key={post.id} data={post} setReaction={onReacted} />)
                }

            </div>


        </div>

    </div>
}

export default Dashboard