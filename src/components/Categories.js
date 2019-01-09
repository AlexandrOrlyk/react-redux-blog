import React, { Component } from 'react';
import { connect } from 'react-redux';
import { button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { addCategory, deleteCategory, editCategory } from '../actions/categories'


class Categories extends Component {

	state = {
		modal: false,
		category:
		{
			id: '',
			name: '',
		}
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}
	onChangeValue = (e) => {
		let { category } = this.state;
		let { value } = e.target;
		category.name = value;
		this.setState({
			category
		})
	}



	onHandleSubmit = () => {
		let { category } = this.state;
		this.props.addCategory(category);
		this.setState({
			modal: false,
			category:
			{
				id: '',
				name: '',
			}
		});
	}



	render() {
		const { category } = this.state
		return (
			<div>
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Category</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					{this.props.categories.loaded && this.props.categories.list.map(category =>
						(<tbody key={category.id}>
							<tr>
								<th scope="row">{category.id}</th>
								<td>{category.name}</td>
								<td>
									<button
										onClick={this.toggle}
										className="btn btn-sm btn-outline-secondary"
									><i className="fa fa-edit" /></button>
								</td>
								<td>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => this.props.deleteCategory(category.id)}
									> <i className="fa fa-trash-o" /> </button>
								</td>
							</tr>
						</tbody>))}
						
				</Table>
				<hr />
					<button className="btn btn-sm btn-outline-success " onClick={this.toggle}><i className="fa fa-plus">  Add category</i></button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
					<ModalBody>
						<input type='text'
							name="body"
							value={category.name}
							onChange={(e) => this.onChangeValue(e)}
						/>
					</ModalBody>
					<ModalFooter>
						<button  className="btn btn-sm btn-outline-success fa fa-plus" color="primary" onClick={this.onHandleSubmit}>  Add category</button>{' '}
						<button className="btn btn-sm btn-outline-danger fa fa-ban" color="secondary" onClick={this.toggle}>  Cancel</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const putStateToProps = (store, ownprops) => ({
	categories: store.categories
})


const mapDispatchProps = (dispatch) => ({
	addCategory: (category) => dispatch(addCategory(category)),
	deleteCategory: (id) => dispatch(deleteCategory(id)),
	editCategory: (category) => dispatch(editCategory(category))
})

export default connect(putStateToProps, mapDispatchProps)(Categories)

