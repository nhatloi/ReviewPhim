import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
import { DeleteOutlined} from '@ant-design/icons';


const { TextArea } = Input;
function SingleComment(props) {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.token)
    const isLogged = useSelector(state => state.auth.isLogged)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const openRemove = async(e) => {
        try {
           const res = await Axios.post('/comment/removeComment', {commentId:props.comment._id},{headers:{Authorization:token}})
           props.refreshFunction()
           return alert(res.data.msg);

        } catch (error) {
            alert('Failed to save Comment')
        }
    }

    const onSubmit = (e) => {

        if (!isLogged) {
            return alert('Please Log in first');
        }
        e.preventDefault();

        const variables = {
            writer: user._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
            name:props.comment.writer.name
        }


        Axios.post('/comment/saveComment', {comment:variables},{headers:{Authorization:token}})
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction()
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={user._id} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>,
        <span onClick={openRemove} key="remove">{props.comment.writer._id === user._id?<DeleteOutlined />:null}</span>,
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.avatar}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>


            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment
