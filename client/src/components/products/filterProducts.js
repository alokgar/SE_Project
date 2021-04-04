import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { filterProduct } from '../../actions/product';

const FilterProducts = ({ filterProduct }) => {
    const [formData, setFormData] = useState({
        from: new Date(),
        to: new Date()
    });

    const [flag, setFlag] = useState(false);

    const { from, to } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });



    const onSubmit = async e => {
        e.preventDefault();
        console.log("onSubmit Clicked");
        filterProduct({ from, to });
        setFormData({
            from: new Date(),
            to: new Date()
        });
        setFlag(true);
    }

    if (flag) {
        return <Redirect to='/show_filtered_products' />
    }

    return (
        <form className='form' onSubmit={e => onSubmit(e)}>

            <div className='form-group'>
                <label for="from">From
            <input
                        type='date'
                        placeholder='from'
                        name='from'
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </label>
                <label
                    style={{ float: "right", marginRight: "20px" }} for="from">To
            <input
                        type='date'
                        placeholder='to'
                        name='to'
                        value={to}
                        onChange={e => onChange(e)}
                    />
                </label>
            </div>

            <input style={{ float: "right", marginRight: "20px" }} type='submit' className='btn btn-primary' value='Search Products' />
        </form>
    )
}

FilterProducts.propTypes = {
    filterProduct: PropTypes.func.isRequired
}

export default connect(null, { filterProduct })(FilterProducts);
