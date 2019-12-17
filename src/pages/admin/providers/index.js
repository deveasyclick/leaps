import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import {
  fetchResearchers,
  updateResearcherDetails,
} from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import Card from '../components/cards/providerCard/providerCard';
import { updateUserUpload } from '../../../helpers/utils';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researchers: [],
      hideNav: false,
    };
    this.researcherClicked = this.researcherClicked.bind(this);
    this.updateResearcherDetails = this.updateResearcherDetails.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHERS_SUCCESS
    ) {
      const researchers = [...this.props.dash.data];
      this.setState({
        researchers,
      });
      Promise.all(
        researchers.map((researcher) => {
          const doc = { user_email: researcher.email, user_id: researcher.uid };
          return updateUserUpload(doc);
        }),
      )
        .then(() => {
          console.log('Researchers stat updated');
        })
        .catch((err) => {
          console.log("An error occur updating the researcher's stats", err);
        });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.UPDATE_RESEARCHER_DETAILS_SUCCESS
    ) {
      const { getResearchers } = this.props;
      getResearchers();
    }
  }

  researcherClicked(researcher) {
    this.props.history.push(`/researcher/${researcher.uid}`);
  }

  updateResearcherDetails(obj) {
    const { updateResearcherDetail } = this.props;
    updateResearcherDetail(obj);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    const { getResearchers } = this.props;
    getResearchers();
    this.resize();
  }

  resize() {
    const currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    const { researchers } = this.state;

    return (
      <section className="container Admin">
        <div className="row">
          <div className="col">
            <h3 className="researchers-title">Content providers</h3>
          </div>
        </div>
        <div className="row cards-row">
          {researchers.map((researcher, index) => (
            <div
              className="col-12 col-md-6 col-sm-3 col-lg-4"
              key={index}
              style={{ marginBottom: '20px' }}
              onClick={() => this.researcherClicked(researcher)}
            >
              <Card
                researcher={researcher}
                updateResearcherDetails={this.updateResearcherDetails}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

const mapPropsToState = states => ({
  dash: states.dash,
});
const mapPropsToDispatch = dispatch => ({
  getResearchers: () => dispatch(fetchResearchers()),
  updateResearcherDetail: obj => dispatch(updateResearcherDetails(obj)),
});
export default connect(mapPropsToState, mapPropsToDispatch)(AdminDashboard);
