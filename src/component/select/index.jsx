import React from 'react'

const Select = ({ option }) => {
	return (
		<>
			{option.map((e, i) => (
				<option key={i} value={i}>
					{e}
				</option>
			))}
		</>
	)
}

export default Select
