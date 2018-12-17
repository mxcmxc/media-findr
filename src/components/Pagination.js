import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';

const propTypes = {
	images: PropTypes.array.isRequired,
	videos: PropTypes.array.isRequired,
	onChangePage: PropTypes.func.isRequired,
	initialPage: PropTypes.number,
	pageSize: PropTypes.number
}
 
const defaultProps = {
	initialPage: 1,
	pageSize: 12
}

const styles = theme => ({
	pagination: {
		display: 'flex',
		listStyleType: 'none',
		marginTop: '3vh',
		padding: '0 2em',
		backgroundColor: '#000',
		borderRadius: '20px',
		alignItems: 'baseline',
	},
	pageNumbers: {
		display: 'block',
		padding: '0 2em',
		transition: '400ms ease',
		color: '#fff',
		letterSpacing: '0.1em',
		lineHeight: '3em',

		'&:hover, &.current': {
			backgroundColor: '#eee',
			color: '#2b2b2b',
		},

		'&.prev:hover, &.next:hover': {
			backgroundColor: 'transparent',
			color: '#eee',
		},
	},
})
  

class Pagination extends Component {

	state = {
		pager: {}
	};

	componentDidMount() {
		// set page if items array isn't empty
		if (this.props.images && this.props.images.length) {
			this.setImagePage(this.props.initialPage);
		}
		else if (this.props.videos && this.props.videos.length) {
			this.setVideoPage(this.props.initialPage);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// reset page if items array has changed
		if (this.props.images !== prevProps.images) {
			this.setImagePage(this.props.initialPage);
		}
		else if (this.props.videos !== prevProps.videos) {
			this.setVideoPage(this.props.initialPage);
		}
	}

	setImagePage(page) {
		let { images, pageSize } = this.props;
		let {pager} = this.state

		if (page < 1 || page > pager.totalPages) {
				return;
		}

		// get new pager object for specified page
		pager = this.getPager(images.length, page, pageSize);

		// get new page of items from items array
		let pageOfItems = images.slice(pager.startIndex, pager.endIndex + 1);

		// update state
		this.setState({ 
			pager: pager 
		});

		// call change page function in parent component
		this.props.onChangePage(pageOfItems);
	}

	setVideoPage(page) {
		let { videos, pageSize } = this.props;
		let {pager} = this.state

		if (page < 1 || page > pager.totalPages) {
				return;
		}

		// get new pager object for specified page
		pager = this.getPager(videos.length, page, pageSize);

		// get new page of items from items array
		let pageOfItems = videos.slice(pager.startIndex, pager.endIndex + 1);

		// update state
		this.setState({ 
			pager: pager 
		});

		// call change page function in parent component
		this.props.onChangePage(pageOfItems);
	}

	getPager(totalItems, currentPage, pageSize) {
		// default to first page
		currentPage = currentPage || 1;

		// default page size is 10
		pageSize = pageSize || 12;

		// calculate total pages
		let totalPages = Math.ceil(totalItems / pageSize);

		let startPage, endPage;
		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
					startPage = 1;
					endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
					startPage = totalPages - 9;
					endPage = totalPages;
			} else {
					startPage = currentPage - 5;
					endPage = currentPage + 4;
			}
		}

		// calculate start and end item indexes
		let startIndex = (currentPage - 1) * pageSize;
		let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

		// return object with all pager properties required by the view
		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages
		};
	}
 
	render() {
		const {classes} = this.props
		let { pager } = this.state;
		let imagePagination;
		let videoPagination;

		if (!pager.pages || pager.pages.length <= 1) {
				// don't display pager if there is only 1 page
				return null;
		}

		if(this.props.location.pathname === '/images') {
			imagePagination = (
				<div className={classes.paginationWrapper}>
					<ul className={classes.pagination}>
						<li className={pager.currentPage === 1 ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="navigate_next">
								<FirstPage className={classes.pageNumbers} onClick={() => this.setImagePage(1)}/> 
							</IconButton>
						</li>
						<li className={pager.currentPage === 1 ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="skip_previous">
								<SkipPrevious className={classes.pageNumbers} onClick={() => this.setImagePage(pager.currentPage - 1)}/> 
							</IconButton>
						</li>

						{pager.pages.map((page, index) =>
							<li key={index} className={pager.currentPage === page ? 'active' : ''} >
								<Button className={classes.pageNumbers} onClick={() => this.setImagePage(page)}>{page}</Button>
							</li>
						)}

						<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="skip_next">
								<SkipNext className={classes.pageNumbers} onClick={() => this.setImagePage(pager.currentPage + 1)}/> 
							</IconButton>
						</li>
						<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="page_last">
								<LastPage className={classes.pageNumbers} onClick={() => this.setImagePage(pager.totalPages)}/> 
							</IconButton>
						</li>
					</ul>
				</div>
			)
		}
		else if (this.props.location.pathname === '/videos') {
			videoPagination = (
				<div className={classes.paginationWrapper}>
					<ul className={classes.pagination}>
						<li className={pager.currentPage === 1 ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="navigate_next">
								<FirstPage className={classes.pageNumbers} onClick={() => this.setVideoPage(1)}/> 
							</IconButton>
						</li>
						<li className={pager.currentPage === 1 ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="skip_previous">
								<SkipPrevious className={classes.pageNumbers} onClick={() => this.setVideoPage(pager.currentPage - 1)}/> 
							</IconButton>
						</li>

						{pager.pages.map((page, index) =>
								<li key={index} className={pager.currentPage === page ? 'active' : ''}>
									<Button className={classes.pageNumbers} onClick={() => this.setVideoPage(page)}>{page}</Button>
								</li>
						)}

						<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="skip_next">
								<SkipNext className={classes.pageNumbers} onClick={() => this.setVideoPage(pager.currentPage + 1)}/> 
							</IconButton>
						</li>
						<li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
							<IconButton color="inherit" aria-label="page_last">
								<LastPage className={classes.pageNumbers} onClick={() => this.setVideoPage(pager.totalPages)}/> 
							</IconButton>
						</li>
					</ul>
				</div>
			)
		}

		return (
			<div>
				{imagePagination}
				{videoPagination}
			</div>
		);
	}
}
 
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default withStyles(styles)(Pagination);

// credit: https://github.com/cornflourblue/react-pagination-example