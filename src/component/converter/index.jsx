import React, { useEffect, useMemo, useState } from 'react'
import Input from '../input'
import Select from '../select'
import './converter.Module.scss'
import axios from 'axios'
const Converter = () => {
	const [sumMasive, setSumMasive] = useState([''])
	const [value, setValue] = useState('')
	const [result, setResult] = useState(0)
	const [userTop, setUserTop] = useState(0)
	const [userBottom, setUserBottom] = useState(0)
	const [revers, setRevers] = useState(true)
	const option = [
		'UAH украинская гривна',
		'USD доллар США',
		'EUR евро',
		'RUB российский рубль',
	]
	useEffect(() => {
		axios
			.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
			.then(res => {
				sumMasive.push(res.data.filter(e => e.cc === 'USD').map(e => e.rate))
				sumMasive.push(res.data.filter(e => e.cc === 'EUR').map(e => e.rate))
				sumMasive.push(res.data.filter(e => e.cc === 'RUB').map(e => e.rate))
			})
	}, [])
	useMemo(() => {
		if (userTop == 0 && userBottom == 0) {
			setResult(value)
		} else if (userTop == 0) {
			setResult(value / sumMasive[userBottom])
		} else if (userBottom == 0) {
			setResult(value * sumMasive[userTop])
		} else {
			setResult((value * sumMasive[userTop]) / sumMasive[userBottom])
		}
	}, [value, userTop, userBottom, revers])
	return (
		<section className='converter'>
			<h1 className='converter__title'>КОНВЕРТЕР</h1>
			<ul className='converter__items'>
				<li className='converter__item'>
					<select
						onChange={event => setUserTop(event.target.value)}
						className='converter__select'
						name=''
						id=''
					>
						<Select option={option} />
					</select>
					<div className='converter__number'>
						<p className='converter__text'>{revers ? 'Отдам' : 'Получу'}</p>
						{revers ? <Input setValue={setValue} /> : <Input value={result} />}
					</div>
				</li>
				<li onClick={() => setRevers(!revers)} className='converter__change'>
					<img width={50} height={40} src='./img/nb.png' alt='change' />
				</li>
				<li className='converter__item'>
					<select
						onChange={event => setUserBottom(event.target.value)}
						className='converter__select'
						name=''
						id=''
					>
						<Select option={option} />
					</select>
					<div className='converter__number'>
						<p className='converter__text'>{revers ? 'Получу' : 'Отдам'}</p>
						{revers ? <Input value={result} /> : <Input setValue={setValue} />}
					</div>
				</li>
			</ul>
		</section>
	)
}

export default Converter
