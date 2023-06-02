import { FiSend } from 'react-icons/fi';
import classes from './Conversation.module.scss';
import { HiPhotograph } from 'react-icons/hi';
import { BsCameraVideoFill, BsTelephoneFill } from 'react-icons/bs';
import ProfilePic from '../utils/ProfilePic';
import { useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../axios';
import { useSelector } from 'react-redux';

const Chat = ({ messages, user, online, setmessages, conversationsId }) => {
	const chatContainerRef = useRef(null);
	const [message, setMessage] = useState('');
	const { socket } = useSelector((state) => state.socket);

	useEffect(() => {
		const eventListener = (a) => {
			if (a.conversation_id === conversationsId && a.sender_id === user.id) {
				console.log(a);
				setmessages(a);
			}
		};
		if (socket) {
			socket.on('receive-message', eventListener);
		}
		return () => socket.off('receive-message', eventListener);
	}, [socket, conversationsId, setmessages, user.id]);

	useEffect(() => {
		chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
	}, [messages]);

	function submitHandler(e) {
		e.preventDefault();

		if (message.trim() === '') return;

		send();
		async function send() {
			try {
				const data = await makeRequest.post('/messages/send', {
					content: message,
					conversation_id: conversationsId,
					receiver: user.id,
				});

				setmessages(data.data.message);
				setMessage('');
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div className={classes.chat}>
			<div className={classes.top}>
				<div className={classes.container}>
					<div className={classes.userInfo}>
						<ProfilePic width='45px' user={user} />
						<div className={classes.details}>
							<p>
								{user.nom} {user.prenom}
							</p>

							<span>
								{online.some((item) => item.userId === user.id)
									? 'Online'
									: 'Offline'}
							</span>
						</div>
					</div>

					<p className={classes.call}>
						<span>
							<BsCameraVideoFill />
						</span>
						<span>
							<BsTelephoneFill />
						</span>
					</p>
				</div>
			</div>
			<div className={classes.middle} ref={chatContainerRef}>
				{messages.map((m) => (
					<p
						key={m.id}
						className={`${classes.message} ${
							m.sender_id === user.id ? '' : classes.me
						}`}
					>
						{m.content}
					</p>
				))}
			</div>
			<form className={classes.bottom} onSubmit={submitHandler}>
				<input
					type='text'
					placeholder='Type Message Here'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<button>
					<HiPhotograph />
				</button>
				<button className={classes.send} type='submit'>
					<FiSend />
				</button>
			</form>
		</div>
	);
};

export default Chat;
