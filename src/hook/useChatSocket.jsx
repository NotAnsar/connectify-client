import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';

const useChatSocket = () => {
	const [socket, setSocket] = useState(null);
	const [online, setOnline] = useState(null);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const newSocket = socketIOClient('http://localhost:3000', {
			transports: ['websocket'],
		});

		setSocket(newSocket);

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		newSocket.emit('new-user-add', user.id);

		return () => {
			newSocket.disconnect();
		};
	}, [user.id]);

	useEffect(() => {
		if (socket) {
			socket.on('get-users', (users) => {
				setOnline(users.map(({ userId }) => userId));
			});
		}
	}, [socket]);

	return { socket, online };
};

export default useChatSocket;
