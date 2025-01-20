import { useState,useMemo } from 'react';
import { faker } from '@faker-js/faker';

import styled from 'styled-components'; // RDT預設樣式
import DataTable from 'react-data-table-component';
import './styles.css';

// 表單內元件-客製化樣式
const customStyles = {
  header: {
    style: {
      minHeight: '56px',
      backgroundColor: 'rgb(126, 162, 215)',
      color: '#343a40',
      fontWeight: 'bold',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#e9ecef',
    },
  },
}

const createUser = () => ({
	id: faker.string.uuid(),
	name: faker.internet.userName(),
	email: faker.internet.email(),
	address: faker.location.streetAddress(),
	bio: faker.lorem.sentence(),
	image: faker.image.avatar(),
});

const createUsers = (numUsers = 5) => new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(200);

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="依照使用者名稱搜尋"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>
    <button type="button" onClick={onClear} className='table-button'>{/* 使用獨立的CSS樣式客製化 */}
			X
		</button>
	</>
);

// 首列內容
const columns = [
	{
		name: '使用者名稱',
		selector: row => row.name,
		sortable: true,
	},
	{
		name: '信箱',
		selector: row => row.email,
		sortable: true,
	},
	{
		name: '地址',
		selector: row => row.address,
		sortable: true,
	},
];



// 搜尋功能
function Filtering() {
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = fakeUsers.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


	return (
		<div className='table-width'>
		<DataTable
			title="標題列 & 標題" // 標題列 & 標題
			columns={columns} // 首列內容
			data={filteredItems} // 資料來源
      customStyles={customStyles} // 加入客製化樣式
			pagination // 啟用分頁
			paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader // 副Header
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows // 核取方塊
			persistTableHead
      striped // 條紋樣式
			dense // 緊湊表格(減少列的間距)
		/>
		</div>
	);
};

export default Filtering