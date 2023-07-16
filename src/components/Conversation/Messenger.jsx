import React from 'react';
import ProfilePic from '../utils/ProfilePic';
import classes from './Conversation.module.scss';
import { AiOutlineDelete } from 'react-icons/ai';

function highlightString(string, search, className = classes.green) {
	const lowerString = string.toLowerCase();
	const lowerSearch = search.toLowerCase();

	let lastIndex = 0;
	const highlightedElements = [];

	while (lowerString.indexOf(lowerSearch, lastIndex) !== -1) {
		const matchIndex = lowerString.indexOf(lowerSearch, lastIndex);
		const beforeMatch = string.substring(lastIndex, matchIndex);
		const match = string.substring(matchIndex, matchIndex + search.length);

		highlightedElements.push(
			beforeMatch,
			<span key={matchIndex} className={className}>
				{match}
			</span>
		);
		lastIndex = matchIndex + search.length;
	}

	if (lastIndex < string.length) {
		highlightedElements.push(string.substring(lastIndex));
	}

	return <React.Fragment>{highlightedElements}</React.Fragment>;
}

const Messenger = ({
	conversation,
	getMessages,
	type = 'messenger',
	search,
	online,
	deleteConversation,
}) => {
	const user = {
		id: conversation.id,
		nom: conversation.nom,
		photo: conversation.photo,
		prenom: conversation.prenom,
		username: conversation.username,
	};

	let fullname = `${user.nom} ${user.prenom}`;
	let username = user.username;

	if (type === 'search') {
		fullname = highlightString(fullname, search);
		username = highlightString(username, search);
	}

	function showChat() {
		if (type === 'messenger') getMessages(conversation.conversation_id, user);
		else getMessages(0, user);
	}

	return (
		<div className={classes.messenger} onClick={showChat}>
			<div className={classes.userInfo}>
				<ProfilePic width='45px' user={user} withlink={false} />

				<div className={classes.details}>
					<p>{fullname}</p>

					<span>@{username}</span>
				</div>
			</div>

			<p className={classes.lastDate}>
				<span className={classes.online}>
					{online.some((item) => item.userId === user.id)
						? 'Online'
						: 'Offline'}
				</span>
				{type === 'messenger' && (
					<span
						className={classes.svg}
						onClick={(e) => {
							e.stopPropagation();
							deleteConversation(conversation.conversation_id);
						}}
					>
						<AiOutlineDelete />
					</span>
				)}
			</p>
		</div>
	);
};

export default Messenger;
