import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import withSession from '../Auth/withSession';
import { UNLIKE_RECIPE, LIKE_RECIPE, GET_RECIPE } from '../../queries/index';

class LikeRecipe extends Component {
	state = {
		liked: false,
	};

	componentDidMount = () => {
		if (this.props.data.getCurrentUser) {
			const { favorites } = this.props.data.getCurrentUser;
			const isLiked = favorites.some(r => r.id === this.props.id);
			if (isLiked) {
				this.setState({ liked: true });
			}
		}
	};

	handleLike = async (likeRecipe, unlikeRecipe) => {
		const {
			data: { getCurrentUser },
			id,
		} = this.props;

		if (this.state.liked) {
			const { data } = await likeRecipe(id, getCurrentUser.username);
			await this.props.refetch();
		} else {
			const { data } = await unlikeRecipe(id, getCurrentUser.username);
			await this.props.refetch();
		}
	};

	updateLike = (cache, { data: { likeRecipe } }) => {
		const { id } = this.props;
		const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { id } });

		cache.writeQuery({
			query: GET_RECIPE,
			variables: { id },
			data: {
				getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
			},
		});
	};

	updateUnlike = (cache, { data: { unlikeRecipe } }) => {
		const { id } = this.props;
		const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { id } });

		cache.writeQuery({
			query: GET_RECIPE,
			variables: { id },
			data: {
				getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
			},
		});
	};

	onClick = (likeRecipe, unlikeRecipe) =>
		this.setState(
			prevState => ({ liked: !prevState.liked }),
			() => this.handleLike(likeRecipe, unlikeRecipe)
		);

	render() {
		const {
			data: { getCurrentUser },
			id,
		} = this.props;

		return (
			getCurrentUser && (
				<Mutation
					mutation={UNLIKE_RECIPE}
					variables={{ id, username: getCurrentUser.username }}
					update={this.updateUnlike}
				>
					{unlikeRecipe => (
						<Mutation
							mutation={LIKE_RECIPE}
							variables={{ id, username: getCurrentUser.username }}
							update={this.updateLike}
						>
							{likeRecipe => (
								<button onClick={() => this.onClick(likeRecipe, unlikeRecipe)}>
									{this.state.liked
										? 'Remove from favorites'
										: 'Add to favorites'}
								</button>
							)}
						</Mutation>
					)}
				</Mutation>
			)
		);
	}
}

export default withSession(LikeRecipe);
