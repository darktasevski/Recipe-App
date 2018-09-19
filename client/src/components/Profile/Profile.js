import React from 'react';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ currentUser }) => {
	return (
		<div className="App">
			<UserInfo currentUser={currentUser} />
			<UserRecipes username={currentUser.username} />
		</div>
	);
};

export default Profile;
