import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {

  render(){
    return(
      <nav>
        <ul>
          <li><Link>a</Link></li>
          <li><Link>b</Link></li>
          <li><Link>c</Link></li>
        </ul>
      </nav>
    );
  }

}

export default Navigation;
