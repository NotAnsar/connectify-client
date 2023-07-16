import classes from './Conversation.module.scss';
import Messenger from './Messenger';
import { Fragment, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import Error from '../utils/Error';

const Conversation = () => {
	const [conversations, setconversations] = useState([]);
	const [chatData, setChatData] = useState();
	const [searchFriend, setsearchfriend] = useState({ search: '', friend: [] });
	const { online } = useSelector((state) => state.socket);
	const [messages, setmessages] = useState();
	const [error, setError] = useState(null);
	const { socket } = useSelector((state) => state.socket);

	useEffect(() => {
		const eventListener = (cId) => {
			setChatData();
			getConversations();
			setError(`Conversation with id ${cId} was deleted`);
		};
		if (socket) socket.on('conversation-deleted', eventListener);
	}, [socket]);

	useEffect(() => {
		getConversations();

		return () => {
			setconversations([]);
		};
	}, []);

	async function getConversations() {
		try {
			const data = await makeRequest.get('/conversations');

			setconversations(data.data.conversations);
		} catch (error) {
			console.log(error);
		}
	}

	function getMessages(conversationsId, user) {
		setsearchfriend({ search: '', friend: false });

		if (conversationsId === 0) createConversation();
		else getMessage(conversationsId);

		async function createConversation() {
			try {
				const data = await makeRequest.post('/conversations', {
					participant_id: user.id,
				});

				if (!conversations.find((c) => c.id === user.id)) {
					const newConvesation = {
						...user,
						conversation_id: data.data.conversation.id,
					};
					setconversations((prev) => [...prev, newConvesation]);
				}

				getMessage(data.data.conversation.id);
			} catch (error) {
				console.log(error);
			}
		}
		async function getMessage(cId) {
			try {
				const data = await makeRequest.get('/messages/' + cId);
				setmessages(data.data.messages);
				setChatData({ user, conversationsId: cId });
			} catch (error) {
				console.log(error);
			}
		}
	}

	function getFriends(e) {
		const value = e.target.value;

		if (value === '') setsearchfriend({ search: value, friend: false });
		else getFriend();

		async function getFriend() {
			try {
				const data = await makeRequest.post('/follow/search', {
					searchData: value,
				});

				setsearchfriend({ search: value, friend: data.data.friends });
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function deleteConversation(cId) {
		try {
			await makeRequest.delete(`/conversations/${cId}`);

			setChatData();
			setconversations((prev) =>
				prev.filter((conversation) => conversation.conversation_id !== cId)
			);
			setError(`Conversation with id ${cId} was deleted`);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Fragment>
			{error && <Error msg={error} setAlert={setError} />}
			<aside className={classes.conversationContainer}>
				<div className={classes.users}>
					<p>Messages</p>
					<input
						type='text'
						placeholder='Search For Friend'
						value={searchFriend.search}
						onChange={getFriends}
					/>
					<div className={classes.messengers}>
						{searchFriend.search === '' &&
							online &&
							conversations.map((c) => (
								<Messenger
									conversation={c}
									key={c.id}
									getMessages={getMessages}
									online={online}
									deleteConversation={deleteConversation}
								/>
							))}
						{searchFriend.search !== '' && searchFriend.friend.length === 0 && (
							<p style={{ fontSize: '14px' }}>No contact was found</p>
						)}
						{searchFriend.search !== '' &&
							searchFriend.friend.length > 0 &&
							online && (
								<>
									<p style={{ fontSize: '15px', paddingLeft: '0.5rem' }}>
										Friends
									</p>
									{searchFriend.friend.map((c) => (
										<Messenger
											conversation={c}
											key={c.id}
											type='search'
											search={searchFriend.search}
											getMessages={getMessages}
											online={online}
										/>
									))}
								</>
							)}
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
		</Fragment>
	);
};

export default Conversation;
