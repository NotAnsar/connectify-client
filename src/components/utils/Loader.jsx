import classes from './Layout.module.scss';
const Loader = ({ profile = false }) => {
	return (
		<div
			className={`${classes.loadercontainer} ${
				profile ? classes.fullheight : ''
			}`}
		>
			<div className={classes.customloader}></div>
		</div>
	);
};

export default Loader;
