import React from 'react';
import { Input } from 'antd';
import { useHistory } from 'react-router';
const { Search: AntSearch } = Input;

const Search = () => {
	const history = useHistory();
	const onSearch = (value: any) => {
		if (value) history.push(`search?query=${value}`);
	};

	return (
		<div className='sm:max-w-xs'>
			<AntSearch placeholder='Search restaurants' onSearch={onSearch} allowClear enterButton='Search' size='large' />
		</div>
	);
};

export default Search;
