import React from 'react';

const RepoListEntry = (props) => (

	<tr>
	<td>{props.repo.id}</td>
	<td><a href={props.repo.html_url}>{props.repo.login}</a></td>
	<td><a href={props.repo.repo_html_url} >{props.repo.name}</a></td>
	<td>{props.repo.forks_count}</td>
	<td>{props.repo.created_at}</td>
	<td>{props.repo.pushed_at}</td>
	<td>{props.repo.default_branch}</td>
	<td>{props.repo.size}</td>
	</tr>
)


export default RepoListEntry;