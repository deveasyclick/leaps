import React, { PureComponent } from 'react';
import Nav from '../nav';
import './header.scss';

export class Header extends PureComponent {
  render() {
    const { width, search } = this.props;
    return (
      <section>
        <Nav search={search} width={width} />
      </section>
    );
  }
}
