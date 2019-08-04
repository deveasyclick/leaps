import React, { PureComponent } from 'react';
import Nav from '../nav';
import './header.scss';


export class Header extends PureComponent {
  render() {
    const {width} = this.props;
    return (
      <section>
        <Nav width={width} />
      </section>
    );
  }
}
