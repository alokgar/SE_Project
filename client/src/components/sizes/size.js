import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSizes, addSize, editSize } from '../../actions/size';
import Table from 'react-bootstrap/Table';
// import Edit_size from './Edit_size';

const Size = ({
    getSizes,
    addSize,
    editSize,
    sizes

}) => {

    useEffect(() => {
        getSizes();
    }, [getSizes]);


    const [formData, setFormData] = useState({
        packing_type: '',
        unit: ''
    });

    const { packing_type, unit } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addSize({ packing_type, unit });
        setFormData({
            packing_type: '',
            unit: ''
        });
    }

    return sizes === null ? (
        <div></div>) : (
        <Fragment>
            All Sizes are shown here
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Packing_type</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map(function (size) {
                        return (
                            <div >
                               <td>{size.packing_type}</td>
                            </div>
                        )

                    })}
                </tbody>
            </Table>


            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='packing_type'
                        name='packing_type'
                        value={packing_type}
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='unit'
                        name='unit'
                        value={unit}
                        onChange={e => onChange(e)}
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Add Size' />
            </form>
        </Fragment>
    );
};



Size.propTypes = {
    getSizes: PropTypes.func.isRequired,
    addSize: PropTypes.func.isRequired,
    editSize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    sizes: state.size.sizes
});

export default connect(
    mapStateToProps,
    { getSizes, addSize, editSize }
)(Size);