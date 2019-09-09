import React from 'react';
import { SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

import Topic from './Topic';

const onResultStats = (results, time) => (
	<div className="flex justify-end">
		{results} results found {/*in {time}ms*/}
	</div>
);

const onData = (data, currentTopics, toggleTopic) => (
	<div className="result-item" key={data.id}>
		<div className="flex justify-center align-center result-card-header">
			<a className="link" href={data.url} target="_blank" rel="noopener noreferrer">
				<div className="flex wrap">
					<div>{data.username}/</div>
					<div>{data.name}</div>
				</div>
			</a>
		</div>
		<div className="m10-0">{data.tweet}</div>
		<div className="m10-0">{data.date}</div>
		<div className="flex wrap justify-center">
			{
				data.hashtags.slice(0, 7)
					.map(item => (
						<Topic
							key={item}
							active={currentTopics.includes(item)}
							toggleTopic={toggleTopic}
						>
							{item}
						</Topic>
					))
			}
		</div>
		<div className="flex">
			<div><div className="btn card-btn"><i className="card-icon fas fa-star" />{data.nlikes}</div></div>
			<div><div className="btn card-btn"><i className="card-icon fas fa-code-branch" />{data.nreplies}</div></div>
			<div><div className="btn card-btn"><i className="card-icon fas fa-eye" />{data.nretweets}</div></div>
		</div>
	</div>
);

const Results = ({ toggleTopic, currentTopics }) => (
	<div className="result-list">
		<SelectedFilters className="m1" />
		<ReactiveList
			componentId="results"
			dataField="tweet"
			renderItem={data => onData(data, currentTopics, toggleTopic)}
			onResultStats={onResultStats}
			react={{
				and: [	'username',
						'hashtags',
						'nretweets',
						'nreplies',
						'nlikes'],
			}}
			pagination
			innerClass={{
				list: 'result-list-container',
				pagination: 'result-list-pagination',
				resultsInfo: 'result-list-info',
				poweredBy: 'powered-by',
			}}
			size={9}
			sortOptions={[
				{
					label: 'Best Match',
					dataField: '_score',
					sortBy: 'desc',
				},
				{
					label: 'Most Likes',
					dataField: 'nlikes',
					sortBy: 'desc',
				},
				{
					label: 'Fewest Likes',
					dataField: 'nlikes',
					sortBy: 'asc',
				},
				{
					label: 'Most Replies',
					dataField: 'nreplies',
					sortBy: 'desc',
				},
				{
					label: 'Fewest Replies',
					dataField: 'nreplies',
					sortBy: 'asc',
				},
				{
					label: 'A to Z',
					dataField: 'name.keyword',
					sortBy: 'asc',
				},
				{
					label: 'Z to A',
					dataField: 'name.keyword',
					sortBy: 'desc',
				},
				{
					label: 'Most likes',
					dataField: 'nlikes',
					sortBy: 'desc',
				},
				{
					label: 'Least Likes',
					dataField: 'nlikes',
					sortBy: 'asc',
				},
			]}
		/>
	</div>
);

Results.propTypes = {
	toggleTopic: PropTypes.func,
	currentTopics: PropTypes.arrayOf(PropTypes.string),
};

export default Results;
