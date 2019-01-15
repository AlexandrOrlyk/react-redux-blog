import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
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
			modal: !this.state.modal,
		});
	}

	toggleEdit = (id, name) => {
		this.setState({
			modal: true,
			category: {
				id: id,
				name: name,
			}
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
		category.id === '' ?
		this.props.addCategory(category):
		this.props.editCategory(category)
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
							<th><button className="btn btn-sm btn-outline-secondary "  onClick={this.toggle}><i className="fa fa-plus">  Add category</i></button></th>
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
										onClick={() => this.toggleEdit(category.id, category.name)}
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
				
				
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Category name</ModalHeader>
					<ModalBody>
						<input type='text'
							maxLength={10}
							name="body"
							value={category.name}
							onChange={(e) => this.onChangeValue(e)}
						/>
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-sm btn-outline-success fa fa-check-circle-o" onClick={this.onHandleSubmit}>  Ok</button>{' '}
						<button className="btn btn-sm btn-outline-danger fa fa-ban" onClick={this.toggle}>  Cancel</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
const putStateToProps = (store) => ({
	categories: store.categories
})


const mapDispatchProps = (dispatch) => ({
	addCategory: (category) => dispatch(addCategory(category)),
	deleteCategory: (id) => dispatch(deleteCategory(id)),
	editCategory: (category) => dispatch(editCategory(category))
})

export default connect(putStateToProps, mapDispatchProps)(Categories)

