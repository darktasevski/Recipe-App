import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../Auth/withAuth';

const Profile = ({ session }) => {
	return (
		<div className="App">
			<UserInfo currentUser={session.getCurrentUser} />
			<UserRecipes username={session.getCurrentUser.username} />
		</div>
	);
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
