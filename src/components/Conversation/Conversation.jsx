import classes from './Conversation.module.scss';
import Messenger from './Messenger';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../axios';
import Chat from './Chat';
import { useSelector } from 'react-redux';

const Conversation = () => {
	const [conversations, setconversations] = useState([]);
	const [chatData, setChatData] = useState(false);
	const { online } = useSelector((state) => state.socket);
	const [messages, setmessages] = useState();

	useEffect(() => {
		getConversations();
		async function getConversations() {
			try {
				const data = await makeRequest.get('/conversations');

				setconversations(data.data.conversations);
			} catch (error) {
				console.log(error);
			}
		}
		return () => {
			setconversations([]);
		};
	}, []);

	function getMessages(conversationsId, user) {
		getMessages();
		async function getMessages() {
			try {
				const data = await makeRequest.get('/messages/' + conversationsId);
				setmessages(data.data.messages);
				setChatData({ user, conversationsId });
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<aside className={classes.conversationContainer}>
			<div className={classes.users}>
				<p>Messages</p>
				<input type='text' placeholder='Search For Friend' />
				<div className={classes.messengers}>
					{conversations.map((c) => (
						<Messenger conversation={c} key={c.id} getMessages={getMessages} />
					))}
				</div>
			</div>
			{chatData && online && (
				<Chat
					user={chatData.user}
					messages={messages}
					setmessages={(a) => setmessages((m) => [...m, a])}
					online={online}
					conversationsId={chatData.conversationsId}
				/>
			)}
		</aside>
	);
};

export default Conversation;
