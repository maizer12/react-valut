import React, { useEffect, useMemo, useState } from 'react'
import Input from '../input'
import Select from '../select'
import './converter.Module.scss'
import axios from 'axios'
const Converter = () => {
	const [sumMasive, setSumMasive] = useState([''])
	const [value, setValue] = useState(0)
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
	function checkeds() {
		if (revers) {
		} else {
			return result
		}
	}
	function valueVan() {
		if (revers) {
			return setValue
		} else {
		}
	}
	function valueTo() {
		if (revers) {
			
		} else {
			return setValue
		}
	}

	function checkedt() {
		if (revers) {
			return result
		}
	}
	function reset() {
		setUserBottom(userTop)
		setUserTop(userBottom)
	}
	return (
		<section className='converter'>
			<h1 className='converter__title'>Конвертер Валют</h1>
			<ul className='converter__items'>
				<li className='converter__item'>
					<h4 className='converter__name'>{revers ? 'Отдам' : 'Получу'}</h4>
					<select
						onChange={event => setUserTop(event.target.value)}
						className='converter__select'
						name=''
						id=''
						value={userTop}
					>
						<Select option={option} />
					</select>
					<div className='converter__number'>
						<p className='converter__text'>{revers ? 'Отдам' : 'Получу'}</p>
						<Input
							setRevers={setRevers}
							revers={revers}
							setValue={valueVan()}
							value={checkeds()}
						/>
					</div>
				</li>
				<li onClick={() => reset()} className='converter__change'>
					<img width={50} height={40} src='./img/nb.png' alt='reverse' />
				</li>
				<li className='converter__item'>
					<h4 className='converter__name'>{revers ? 'Получу' : 'Отдам'}</h4>
					<select
						value={userBottom}
						onChange={event => setUserBottom(event.target.value)}
						className='converter__select'
						name=''
						id=''
					>
						<Select option={option} />
					</select>
					<div className='converter__number'>
						<p className='converter__text'>{revers ? 'Получу' : 'Отдам'}</p>
						<Input
							setRevers={setRevers}
							revers={revers}
							setValue={valueTo()}
							value={checkedt()}
						/>
					</div>
				</li>
			</ul>
		</section>
	)
}

export default Converter
