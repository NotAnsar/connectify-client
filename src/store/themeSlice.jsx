import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
	const theme = `${window?.localStorage?.getItem('theme')}`;
	if (['light', 'dark'].includes(theme)) return theme;

	const userMedia = window.matchMedia('(prefers-color-scheme: light)');
	if (userMedia.matches) {
		localStorage.setItem('theme', 'light');
		return 'light';
	}

	localStorage.setItem('theme', 'dark');
	return 'dark';
};

const initialState = getTheme();

if (initialState === 'light') {
	document.body.classList.add('light');
} else {
	document.body.classList.remove('light');
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggle: (state) => {
			localStorage.setItem('theme', state === 'dark' ? 'light' : 'dark');

			document.body.classList.toggle('light');

			return state === 'dark' ? 'light' : 'dark';
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;
