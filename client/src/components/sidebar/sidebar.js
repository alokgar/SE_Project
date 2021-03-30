import React, { Fragment, useEffect } from 'react';
import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import 'react-sidebar-ui/dist/index.css';
const Sidebar1 = () => {

  return (
    // <Fragment>
    //   <div className="sidebar bg-dark" style={{opacity:'0.9',height:"100%",width:'200px',float:'left',position:'absolute'}}>
    //      <ul style={{display:'flex',flexDirection:'column',justifyItems:'center',alignItems:'center'}}>
    //          <li style={{padding:'20px'}}><h2>Menu</h2></li>
    //          <li style={{padding:'10px'}}>Home</li>
    //          <li style={{padding:'10px'}}>Customer</li>
    //          <li style={{padding:'10px'}}>Products</li>
    //      </ul>
    //   </div>
    // </Fragment>
    <div>
      <Sidebar  isCollapsed={false} classes = "bg-dark sidebar">
        
        <DropdownItem
          values={['First', 'Second', 'Third']}
          bgColor={'black'}>
          Menu
        </DropdownItem>

        <Item bgColor='black'>
          <Icon><i className="fas fa-home"/></Icon>
          Home
        </Item>
        <Item bgColor='black'>
          <Icon><i className="fas fa-info"/></Icon>
          About
        </Item>
        <Item bgColor='black'>
          <Icon><i className="fas fa-sitemap"/></Icon>
          My Website
        </Item>
        <Item bgColor='black'>
          <Icon><i className="far fa-address-book"/></Icon>
          Contacts
        </Item>
        <Item bgColor='black'>
          <Icon><i className="fas fa-rss-square"/></Icon>
          Blog
        </Item>
        <InputItem type='text' placeholder={'Search...'}/>
      </Sidebar>
    </div>
  );
};

export default Sidebar1;