import logoutIcon from '../dashboard/assets/logout.png'
import profileSettings from '../dashboard/assets/profileSettings.png'
import blankProfile from '../dashboard/assets/blankProfile.webp'
import EditableField from './components/EditableField'
import Post from './components/Post'
import { useState } from 'react'


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

    const [captureDescription, setCaptureDescription] = useState(false)

    const onPublishPhoto = async (event) => {
        console.log('called')
        const reader = new FileReader()
        reader.onload = () => {
            console.log(reader.result)
            setCaptureDescription(true)
        }
        reader.onerror = () => {
            console.log(reader.error)
        }
        console.log('reading file...')
        reader.readAsDataURL(event.target.files[0])
        event.target.value = ''
    }

    const cancelPhotoPost = (event) => {
        event.currentTarget.getElementsByTagName('input')[0].value = ''
        setCaptureDescription(false)
    }

    const onFileUploadClick = (event) => {
        event.currentTarget.getElementsByTagName('input')[0].click()
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
                    <button className='btn ms-3' style={styles.navButton}>
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
                                <textarea class="form-control" rows="3"></textarea>
                            </div>}
                            <div className='row d-flex justify-content-center'>
                                <button
                                    className={`btn btn-${captureDescription ? 'danger' : 'primary'}`}
                                    onClick={captureDescription ? cancelPhotoPost : onFileUploadClick} >
                                    <input type="file"
                                        hidden accept="image/png, image/gif, image/jpeg"
                                        onChange={onPublishPhoto} />
                                    {captureDescription ? "cancel" : "Post Photo"}
                                </button>
                                {captureDescription && <button className='btn btn-primary'  >
                                    Post
                                </button>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='col-8' style={styles.photoListContainer}>
                <Post />
                <Post />
                <Post />
                <Post />

            </div>


        </div>

    </div>
}

export default Dashboard