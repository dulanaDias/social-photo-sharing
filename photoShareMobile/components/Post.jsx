import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import blankProfile from '../assets/blankProfile.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import love from '../assets/heart.png'
import funny from '../assets/laugh.png'
import Button from "./Button"
import TextField from './TextField'

const Comment = ({ data }) => {
    <View style={styles.commentRoot}>
        <View style={styles.commentProfile}>
            <Image
                style={styles.commentProfileImage}
                source={{uri: data.profile.picture} || blankProfile} />
            <Text style={{ fontWeight: "800" }}>{data.profile.name}</Text>
        </View>
        <Text>{data.body}</Text>
    </View>
}

export default ({ data, setReaction, loadComments, postComment }) => {
    const [commentsExpanded, setCommentsExpanded] = useState(false)
    const [comment, setComment] = useState("")

    const react = (reactionType) => {
        return () => {
            if (data.selfReaction == "none" || reactionType == data.selfReaction) {
                if (data.selfReaction == "none")
                    setReaction(reactionType, true, data.id)
                else
                    setReaction(reactionType, false, data.id)
            }
        }
    }

    useEffect(() => {
        if (commentsExpanded) {
            loadComments()
        }
    }, [commentsExpanded])

    const renderComments = ({ item }) => {
        return <Comment data={item} />
    }

    return <View style={styles.root}>
        <Image
            source={{uri: data.profile.image} || blankProfile}
            style={styles.profilePicture}
        />
        <Text>{data.profile.name}</Text>
        <Image source={{uri: data.image}} style={styles.image} />
        <Text>{data.description}</Text>
        <Text style={styles.selfReactionLabel}>{`You have reacted on this post with ${data.selfReaction}`}</Text>
        <View style={styles.reactionContainer}>
            <TouchableOpacity style={styles.reaction} onPress={react('like')} >
                <Image source={like} style={styles.reactionIcon} />
                <Text>{data.like}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={react('dislike')} >
                <Image source={dislike} style={styles.reactionIcon} />
                <Text>{data.dislike}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={react('love')} >
                <Image source={love} style={styles.reactionIcon} />
                <Text>{data.love}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reaction} onPress={react('funny')} >
                <Image source={funny} style={styles.reactionIcon} />
                <Text>{data.funny}</Text>
            </TouchableOpacity>
        </View>
        <Button color="white" backgroundColor="lightBlue"
            onPress={() => { setCommentsExpanded(!commentsExpanded) }}>
            View Comments
        </Button>
        {commentsExpanded
            &&
            <View>
            <FlatList
                data={data.comments || []}
                keyExtractor={(_, index) => `comment_${index}`}
                renderItem={renderComments}
            />
            <View>
                <TextField onChange={setComment} />
                <Button
                    color="white"
                    backgroundColor="lightBlue"
                    onPress={postComment(comment, data.id)}
                >
                    Post
                </Button>
            </View>
            </View>
            }
    </View>
}

const styles = StyleSheet.create({
    profilePicture: {
        borderRadius: 10,
        height: 30,
        width: 30
    },
    reaction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reactionContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reactionIcon: {
        height: 15,
        width: 15
    },
    selfReactionLabel: {
        fontSize: 20,
        fontWeight: "600"
    },
    image: {
        height: "auto",
        width: "100%",
        borderRadius: 5
    },
    commentRoot: {
        padding: 10,
        backgroundColor: "gray",
        borderRadius: 5
    },
    commentProfile: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    commentProfileImage: {
        borderRadius: 10,
        width: 20,
        height: 20
    },
    root: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: 'white'
    }
})