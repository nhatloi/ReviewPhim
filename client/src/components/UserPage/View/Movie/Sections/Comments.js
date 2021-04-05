import React, { useState } from 'react'
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const { Title } = Typography;
function Comments(props) {
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.token)
    const isLogged = useSelector(state => state.auth.isLogged)
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if (!isLogged) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user._id,
            postId: props.postId
        }
        try {
            const res = await axios.post('/comment/saveComment',{comment:variables},{headers:{Authorization:token}})
            setComment("")
            props.refreshFunction(res.data.result)
        } catch (error) {
            alert('Failed to save Comment')
        }
    }

    return (    
        <div>
            <br />
            <Title level={3} > Share your opinions about {props.movieTitle} </Title>
            <hr />
            {/* Comment Lists  */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Comment</Button>
            </form>

        </div>
    )
}

export default Comments
