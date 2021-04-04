import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup'


const Sidebar1 = () => {

  return (
    <Fragment>
      <div className="sidebar bg-dark col-md-2" style={{opacity:'0.9',height:"100%",width:'200px',height:'100%'}}>
         {/* <ul style={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
             <li style={{padding:'20px'}}><h2>Menu</h2></li>
             <li style={{padding:'10px'}}>Home</li>
             <li style={{padding:'10px'}}>Customer</li>
             <li style={{padding:'10px'}}>Products</li>
         </ul> */}
  
  <ListGroup style={{margin:'100px 0px'}}>
  <ListGroup.Item className="sidebar-item"  action href="/products">
  Products
  </ListGroup.Item>
  <ListGroup.Item className="sidebar-item" action >
    Success
  </ListGroup.Item>
  <ListGroup.Item className="sidebar-item"action >
    Danger
  </ListGroup.Item>
  <ListGroup.Item  className="sidebar-item" action >
    Warning
  </ListGroup.Item>
  <ListGroup.Item className="sidebar-item" action >
    Info
  </ListGroup.Item>
  <ListGroup.Item className="sidebar-item"action >
    Light
  </ListGroup.Item>
  <ListGroup.Item className="sidebar-item"action >
    Dark
  </ListGroup.Item>
</ListGroup>
      </div>
    </Fragment>
    // <div>
    //   <Sidebar  isCollapsed={false} classes = "bg-dark sidebar">
        
    //     <DropdownItem
    //       values={['First', 'Second', 'Third']}
    //       bgColor={'black'}>
    //       Menu
    //     </DropdownItem>

        // <Item bgColor='black'>
        //   <Icon><i className="fas fa-home"/></Icon>
        //   Home
        // </Item>
    //     <Item bgColor='black'>
    //       <Icon><i className="fas fa-info"/></Icon>
    //       About
    //     </Item>
    //     <Item bgColor='black'>
    //       <Icon><i className="fas fa-sitemap"/></Icon>
    //       My Website
    //     </Item>
    //     <Item bgColor='black'>
    //       <Icon><i className="far fa-address-book"/></Icon>
    //       Contacts
    //     </Item>
    //     <Item bgColor='black'>
    //       <Icon><i className="fas fa-rss-square"/></Icon>
    //       Blog
    //     </Item>
    //     <InputItem type='text' placeholder={'Search...'}/>
    //   </Sidebar>
    // </div>
  );
};

export default Sidebar1;