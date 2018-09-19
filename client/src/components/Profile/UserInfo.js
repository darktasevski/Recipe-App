import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
	console.log(date);
	const newDate = new Date(+date).toLocaleDateString('en-US');

	return `${newDate}`;
};

const UserInfo = ({ currentUser }) => {
	return (
		<div>
			<h3>User Info</h3>
			<p>Username: {currentUser.username}</p>
			<p>Email: {currentUser.email}</p>
			<p>Cake day: {formatDate(currentUser.joinDate)}</p>
			<ul>
				{currentUser.favorites.length ? (
					<Fragment>
						<h3>
							{currentUser.username}
							's favorite recipes:{' '}
						</h3>
						{currentUser.favorites.map(fav => (
							<li key={fav.id}>
								<Link to={`/recipe/${fav.id}`}>
									<p>{fav.name}</p>
								</Link>
							</li>
						))}
					</Fragment>
				) : (
					<strong>{currentUser.username} doesn't have favorite recipes</strong>
				)}
			</ul>
		</div>
	);
};

export default UserInfo;
