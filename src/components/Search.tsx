import React, { useState } from 'react';
import { Input } from 'antd';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
const { Search: AntSearch } = Input;

const Search = () => {
	const history = useHistory();
	const location = useLocation();
	const queryObject = new URLSearchParams(location.search);
	const queryText = queryObject.get('query');
	const [value, setValue] = useState(queryText || '');

	const onSearch = (value: any) => {
		if (value) history.push(`/?query=${value}`);
	};

	return (
		<div className='sm:max-w-xs'>
			<AntSearch
				placeholder='Search restaurants'
				value={value}
				onSearch={onSearch}
				onChange={(e) => setValue(e.target.value)}
				allowClear
				enterButton='Search'
				size='large'
			/>
		</div>
	);
};

export default Search;
