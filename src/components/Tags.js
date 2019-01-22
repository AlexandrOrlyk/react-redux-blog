import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { addTag, deleteTag, editTag } from '../actions/tags'

class Tags extends Component {

	state = {
		modal: false,
		Tag:
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
			Tag: {
				id: id,
				name: name,
			}
		});
	}

	onChangeValue = (e) => {
		let { Tag } = this.state;
		let { value } = e.target;
		Tag.name = value;
		this.setState({
			Tag
		})
	}

	onHandleSubmit = () => {
		let { Tag } = this.state;
		Tag.id === '' ?
		this.props.addTag(Tag):
		this.props.editTag(Tag)
		this.setState({
			modal: false,
			Tag:
			{
				id: '',
				name: '',
			}
		});
	}
	render() {

		const { Tag } = this.state
		return (
			<div>
				<Table hover>
					<thead>
						<tr>
							<th><button className="btn btn-sm btn-outline-secondary "  onClick={this.toggle}><i className="fa fa-plus">  Add Tag</i></button></th>
							<th>Tag</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					{this.props.Tags.loaded && this.props.Tags.list.map(Tag =>
						(<tbody key={Tag.id}>
							<tr>
								<th scope="row">{Tag.id}</th>
								<td>{Tag.name}</td>
								<td>
									<button
										onClick={() => this.toggleEdit(Tag.id, Tag.name)}
										className="btn btn-sm btn-outline-secondary"
									><i className="fa fa-edit" /></button>
								</td>
								<td>
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => this.props.deleteTag(Tag.id)}
									> <i className="fa fa-trash-o" /> </button>
								</td>
							</tr>
						</tbody>))}
				</Table>
				
				
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Tag name</ModalHeader>
					<ModalBody>
						<input type='text'
							maxLength={10}
							name="body"
							value={Tag.name}
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
	Tags: store.Tags
})


const mapDispatchProps = (dispatch) => ({
	addTag: (Tag) => dispatch(addTag(Tag)),
	deleteTag: (id) => dispatch(deleteTag(id)),
	editTag: (Tag) => dispatch(editTag(Tag))
})

export default connect(putStateToProps, mapDispatchProps)(Tags)

