import React from 'react';
import { connect } from 'react-redux';


class AccountComponent extends React.Component {
  render() {
    return (
      <section className="Account">
                account page
      </section>
    );
  }
}

const mapStateToProps = states => ({});
const mapDispatchToProps = dipatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);
