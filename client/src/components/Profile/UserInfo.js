import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
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
				<h5>
					{currentUser.username}
					's favorite recipes:
				</h5>
				{currentUser.favorites.length ? (
					currentUser.favorites.map(fav => (
						<li key={fav.id}>
							<Link to={`/recipe/${fav.id}`}>
								<p>{fav.name}</p>
							</Link>
						</li>
					))
				) : (
					<small>
						<strong>{currentUser.username} doesn't have favorite recipes</strong>
					</small>
				)}
			</ul>
		</div>
	);
};

export default UserInfo;
