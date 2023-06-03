import classes from './Conversation.module.scss';
import Messenger from './Messenger';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../axios';
import Chat from './Chat';
import { useSelector } from 'react-redux';

const Conversation = () => {
	const [conversations, setconversations] = useState([]);
	const [chatData, setChatData] = useState();
	const [searchFriend, setsearchfriend] = useState({ search: '', friend: [] });
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
		setsearchfriend({ search: '', friend: false });

		if (conversationsId === 0) {
			createConversation();
		} else {
			getMessages(conversationsId);
		}
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

				getMessages(data.data.conversation.id);
			} catch (error) {
				console.log(error);
			}
		}
		async function getMessages(cId) {
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

	return (
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
	);
};

export default Conversation;
