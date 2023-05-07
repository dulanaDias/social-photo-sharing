import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import Post from "../components/Post"
import HomeHeader from "../components/HomeHeader"
import Network from "../Network"

export default ({ navigation }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log("home page loaded")
        refreshPosts()
    }, [])

    const loadComments = async (postId) => {
        const comments = await Network.get(`photo/${postId}/comment`)
        if(comments.data.success) {
            const index = posts.findIndex((post) => post.id == postId)
            posts[index].comments = comments.data.comments
            setPosts([...posts])
        }
    }

    const onReacted = async (reactionType, didReacted, id) => {
        const result = await Network.put('photo/react', { type: reactionType, reacted: didReacted, id })
        if(result.data.success) {
            const updatedReactions = result.data.updatedReactions
            const index = posts.findIndex((post) => post.id == id)
            
            const { like, dislike, love, funny, selfReaction } = updatedReactions
            posts[index] = {
                ...posts[index],
                like, dislike, love, funny, selfReaction
            }
            setPosts([...posts])
        }
    }

    const refreshPosts = async () => {
        const result = await Network.get('photo')

        if (result.data.success) {
            setPosts(result.data.data)
        }
    }

    const addComment = async (comment, postId) => {
        const comments = await Network.post(`photo/${postId}/comment`, {
            comment
        })
        if(comments.data.success) {
            const index = posts.findIndex((post) => post.id == postId)
            
            posts[index].comments = comments.data.comments
            setPosts([...posts])
        }
    }
    // index, item, seperators
    const renderPost = ({ item }) => {
        return <Post
            data={item}
            loadComments={loadComments}
            postComment={addComment}
            setReaction={onReacted}
        />
    }

    return <View style={styles.root}>
        <HomeHeader navigation={navigation}/>
        <FlatList
            renderItem={renderPost}
            data={posts}
            keyExtractor={(item) => `post-${item.id}`}
        />
    </View>
}

const styles = StyleSheet.create({
    root: {
        height: "100%"
    }
})
