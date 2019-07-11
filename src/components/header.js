import React, { PureComponent } from 'react';
import Nav from './nav';
import './header.scss';


export class Header extends PureComponent {
  render() {
    return (
      <section>
        <Nav />
      </section>
    );
  }
}
