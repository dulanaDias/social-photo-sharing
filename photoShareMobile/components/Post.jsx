import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import blankProfile from '../assets/blankProfile.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'
import love from '../assets/heart.png'
import funny from '../assets/laugh.png'
import send from '../assets/send.png'
import Button from "./Button"
import TextField from './TextField'

const Comment = ({ data }) => {
    return <View style={styles.commentRoot}>
        <View style={styles.commentProfile}>
            <Image
                style={styles.commentProfileImage}
                source={data.profile.picture ? { uri: data.profile.picture } : blankProfile} />
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
            loadComments(data.id)
        }
    }, [commentsExpanded])

    const renderComments = ({ item }) => {
        return <Comment data={item} />
    }

    return <View style={styles.root}>
        <View style={styles.postProfileBanner}>
            <Image
                source={data.profile.image ? { uri: data.profile.image } : blankProfile}
                style={styles.profilePicture}
            />
            <Text style={styles.topUsername}>{data.profile.username}</Text>
        </View>

        <Image resizeMode="contain"
            source={data.image ? { uri: data.image } : blankProfile} style={styles.image} />
        <Text style={styles.description}>{data.description}</Text>
        {data.selfReaction != "none" && <Text style={styles.selfReactionLabel}>{`You have reacted on this post with ${data.selfReaction}`}</Text>}
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
        <Button
            color="black"
            style={styles.commentSectionExpandButton}
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TextField
                        style={{ flex: 1 }}
                        value={comment}
                        placeholder="Add a comment..."
                        onChange={setComment} />
                    <TouchableOpacity style={{
                        borderColor: "#498d93",
                        flex: 0,
                        borderRadius: 25,
                        borderWidth: 1,
                        padding: 10,
                        marginStart: 5
                    }}
                    onPress={() => {
                        if(comment.length) {
                            postComment(comment, data.id)
                            setComment('')
                        }
                    }}
                    >
                        <Image
                            source={send}
                            style={{ height: 20, width: 20, tintColor: "#498d93" }} />
                    </TouchableOpacity>

                </View>
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    profilePicture: {
        borderRadius: 550,
        height: 50,
        width: 50
    },
    postProfileBanner: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: 'center'
    },
    reaction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reactionContainer: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15
    },
    reactionIcon: {
        height: 20,
        width: 20,
        marginEnd: 10
    },
    description: {
        marginTop: 8,
        color: "black",
        fontSize: 15,
    },
    topUsername: {
        color: "black",
        fontSize: 21,
        fontWeight: "900",
        marginStart: 10
    },
    selfReactionLabel: {
        marginTop: 8,
        color: "black",
        fontSize: 15,
        fontWeight: "600"
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 5
    },
    commentRoot: {
        padding: 10,
        backgroundColor: "#bedbff",
        borderWidth: 1,
        borderColor: '#63bdff',
        borderRadius: 5,
        marginVertical: 7
    },
    commentSectionExpandButton: {
        borderColor: 1,
        borderWidth: 1
    },
    commentProfile: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    commentProfileImage: {
        borderRadius: 10,
        marginEnd: 10,
        width: 30,
        height: 30
    },
    root: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: 'white'
    }
})