import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import win31 from '../media/win31.png'
import korwin from '../media/korwin.png'
import pattern from '../media/datapattern.png'
import jojo from '../media/jojo.png'
import beer from '../media/beer.png'
import frontimg from '../media/frontpageNotLoggedIn.png'
import frontimglogged from '../media/frontpageLoggedIn.png'
import frontBook1 from '../media/frontBook1.png'
import frontBook2 from '../media/frontBook2.png'
import frontBook3 from '../media/frontBook3.png'
import frontBook4 from '../media/frontBook4.png'
import Book from '../components/Book'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { v4 } from 'uuid'

function FrontPage(props) {
	var book1 = {
		title: 'Windows 3.1 PL',
		description: "'MS Windows 3.1 PL' to książka przeznaczona dla szerokiego kręgu odbiorców zainteresowanych",
		cover_photo: win31,
		isbn: 1,
		owner_id: 1,
	}
	var book2 = {
		title: 'Niebezpieczne Ubezpieczenia',
		description: "'W czasach mody, czy wręcz manii ubezpieczeniowej, książka jest niezwykle cenną odtrutką na",
		cover_photo: korwin,
		isbn: 2,
		owner_id: 2,
	}
	var book3 = {
		title: 'Feature Selection for Data and Pattern Recognition',
		description:
			"This book presents recent developments and research trends in the field' of feature selection for data and pattern recognition, highlighting a number of latest advances",
		cover_photo: pattern,
		isbn: 3,
		owner_id: 3,
	}
	var book4 = {
		title: 'JOJO’s Bizzare Adventure',
		description: 'A multigenerational tale of the heroic Joestar family and their never-ending battle against evil!',
		cover_photo: jojo,
		isbn: 4,
		owner_id: 4,
	}
	var sessionUsername = sessionStorage.getItem('sessionUserUsername')

	const [bookIds, setBookIds] = useState([])
	const [books, setBooks] = useState([])
	const [userId, setUserId] = useState()
	const [filter, setFilter] = useState('')

	useEffect(() => {
		if (sessionUsername !== null) {
			axios.get('http://localhost:5000/api/user_info/' + sessionUsername).then(response => {
				setUserId(response.data.user.id)
				axios.get('http://localhost:5000/api/owned_book_info').then(response => {
					setBookIds(response.data.books)
				})
			})
		}
	}, [])

	useEffect(() => {
		if (bookIds !== undefined && bookIds.length > 0) {
			var fetchedBooks = []
			for (let i = 0; i < bookIds.length; i++) {
				axios.get('http://localhost:5000/api/book_info/' + bookIds[i].book_id).then(response => {
					fetchedBooks.push(response.data)
				})

				if (i === bookIds.length - 1 && fetchedBooks !== undefined) {
					setTimeout(function () {
						let fbTMP = []

						for (let i = 0; i < bookIds.length; i++) {
							if (fetchedBooks[i] === undefined) break

							let tmp = {
								author: fetchedBooks[i].author,
								book_id: fetchedBooks[i].book_id,
								cover_photo: fetchedBooks[i].cover_photo,
								google_book_id: fetchedBooks[i].google_book_id,
								isbn: fetchedBooks[i].isbn,
								title: fetchedBooks[i].title,
								rentable: bookIds[i].rentable,
							}
							fbTMP.push(tmp)
						}

						let othersBooks = []
						for (let i = 0; i < fbTMP.length; i++) {
							for (let j = 0; j < bookIds.length; j++) {
								if (bookIds[j].book_id === fbTMP[i].book_id) {
									if (bookIds[j].owner_id !== userId) {
										let tmp = { ...fbTMP[i], ...bookIds[j] }
										othersBooks.push(tmp)
									}
								}
							}
						}

						setBooks(othersBooks.slice(0, 5))
						//console.log(othersBooks.slice(0,5))
					}, 1000)
				}
			}
		}
	}, [bookIds])

	return (
		<>
			<div>
				<Navbar site={'/FrontPage'} isLoggedIn={props.isLoggedIn} username={props.username} />
			</div>

			{props.isLoggedIn ? (
				<>
					<div className='container-fluid flex-grow-1 d-flex flex-column'>
						<div className='row'>
							<img src={frontimglogged} className='p-0' style={{ objectFit: 'cover', height: '320px' }} />
							<div className='position-absolute'>
								<div className='fs-1 mt-5 text-uppercase text-shadow-light'>
									<p className='fw-bold text-bananablue h1 text-top-notlogged'>banana books</p>
									<p className='text-bananabluedark h1 mt-3' style={{"font-size":"60px", "font-weight":"bold"}}>Read more, rent more, Expand your mind <br/>with every book</p>
								</div>
							</div>
						</div>

						<div className='row bg-banana-blue p-2'>
							<div className='col-xl-3 col-md-6 row gx-3'>
								<div className='col d-flex justify-content-start align-items-center'>
									<Link to='/PersonalLibrary' className='col-6'>
										<button className='btn btn-banana-primary-dark col-12'>My Library</button>
									</Link>
								</div>
							</div>

							<div className='col-xl-9 col-md-6 d-flex justify-content-end col-12'>
								<div className='col-3 align-self-center'>
									<input
										type='text'
										className='form-control'
										placeholder='Find Books'
										value={filter}
										onChange={e => {
											setFilter(e.target.value)
										}}></input>
								</div>
								<Link to={'/Offers#' + filter}>
									<button className='btn btn-banana-white-outline'>Search</button>
								</Link>
							</div>
						</div>

						<div className='row gx-5 m-0 mt-4 mb-3 flex-grow-1 row-cols-lg-5 row-cols-sm-3'>
							{books.map(b => (
								<div key={v4()} className='col d-flex'>
									<Book variant='medium' border {...b}></Book>
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<>
					<div className='container-fluid'>
						<div className='row justify-content-center align-items-center'>
							<div className='col-md-5'>
								<div className='fs-1 mt-3 mb-0 text-uppercase text-shadow-light'>
									<p className='text-bananablue fw-bold h1 text-top-logged'>banana books</p>
									<p className='text-bananabluedark h2 text-bot-logged'>
										"Rent more, read more, expand your mind with every Book!"
									</p>
								</div>
								<img className='img-fluid w-100' src={frontimg} alt='fajnie sobie ludek siedzi :D' />
							</div>
							<div className='col-md-5 order-md-last'>
								<div className='d-flex flex-column align-items-end'>
									<img className='img-fluid w-25 mt-4' src={frontBook2} alt='' />
									<img className='img-fluid w-25 mb-0' src={frontBook4} alt='' />
									<img className='img-fluid w-25 mb-0' src={frontBook3} alt='' />
									<img className='img-fluid w-25 mb-0' src={frontBook1} alt='' />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default FrontPage
