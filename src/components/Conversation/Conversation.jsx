import { FiSend } from 'react-icons/fi';
import { HiPhotograph } from 'react-icons/hi';
import { BsCameraVideoFill, BsTelephoneFill } from 'react-icons/bs';

import classes from './Conversation.module.scss';
import Messenger from './Messenger';
import ProfilePic from '../utils/ProfilePic';
import { useEffect, useRef } from 'react';

const Conversation = () => {
	const chatContainerRef = useRef(null);

	useEffect(() => {
		const chatContainer = chatContainerRef.current;
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}, []);
	return (
		<aside className={classes.conversationContainer}>
			<div className={classes.users}>
				<p>Messages</p>
				<input type='text' placeholder='Search For Friend' />
				<div className={classes.messengers}>
					<Messenger />
					<Messenger />
					<Messenger />
				</div>
			</div>
			<div className={classes.chat}>
				<div className={classes.top}>
					<div className={classes.container}>
						<div className={classes.userInfo}>
							<ProfilePic width='45px' />
							<div className={classes.details}>
								<p>Karroauch Ansar</p>
								<span>Online</span>
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
					<p className={classes.message}>Hello</p>
					<p className={`${classes.message} ${classes.me}`}>Hello</p>
					<p className={classes.message}>Hello</p>
					<p className={classes.message}>Hello</p>
					<p className={classes.message}>Hello</p>
					<p className={classes.message}>Hello</p>
					<p className={`${classes.message} ${classes.me}`}>Hello</p>
					<p className={`${classes.message} ${classes.me}`}>Hello</p>
					<p className={`${classes.message} ${classes.me} ${classes.img}`}>
						<img
							src={
								'/upload/7ba65eef-e480-4b7c-87aa-e667938f39bfpexels-desativado-9544438.jpg'
							}
							alt=''
						/>
					</p>
					<p className={`${classes.message} ${classes.img}`}>
						<img
							src={
								'/upload/e8484a7b-1cfa-4ca3-b17b-3a9a53276647Screenshot (28).png'
							}
							alt=''
						/>
					</p>
				</div>
				<div className={classes.bottom}>
					<input type='text' placeholder='Type Message Here' />

					<button>
						<HiPhotograph />
					</button>
					<button className={classes.send}>
						<FiSend />
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Conversation;
