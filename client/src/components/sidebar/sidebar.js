import React, { Fragment, useEffect } from 'react';

const Sidebar = () => {

  return (
    <Fragment>
      <div className="sidebar bg-dark" style={{opacity:'0.9',height:"100%",width:'200px',float:'left',position:'absolute'}}>
         <ul style={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
             <li style={{padding:'20px'}}><h2>Menu</h2></li>
             <li style={{padding:'10px'}}>Home</li>
             <li style={{padding:'10px'}}>Customer</li>
             <li style={{padding:'10px'}}>Products</li>
         </ul>
      </div>
    </Fragment>
  );
};



export default Sidebar;