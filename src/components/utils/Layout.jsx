import classes from './Layout.module.scss';

const Layout = ({ children }) => {
	return <div className={classes.container}>{children}</div>;
};

export default Layout;
