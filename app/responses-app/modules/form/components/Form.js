import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Attribute from './Attribute';

export default class Form extends Component {

  static propTypes = {
	  title: PropTypes.string.isRequired,
	  description: PropTypes.string,
	  type: PropTypes.string.isRequired,
	  basis: PropTypes.string.isRequired,
	  basisname: PropTypes.string.isRequired
	}

	constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      description,
      type,
      basis,
      basisname
    } = this.props;

    return (
      <div className='form-responses__header'>
        <Header title={title} description={description} />
        <Attribute label='Тип' value={type} />
        <Attribute label='Основание' value={`${basis}, ${basisname}`} />
      </div>
    );
  }
}