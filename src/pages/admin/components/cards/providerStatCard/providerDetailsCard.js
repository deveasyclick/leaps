import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { FiClock } from 'react-icons/fi';
import './providerDetailCard.scss';

export default ({ researcher }) => (
  <div className="provide-stat-card">
    <p className="uploads">
      <span className="uploads-count">{researcher.file_uploads}</span>
      &nbsp;
      <span>Uploads</span>
    </p>
    <div className="stats d-flex">
      <p className="pending d-flex align-items-center">
        <FiClock size={18} className="pending-icon" />
        <span>
          {researcher.file_pending}
          &nbsp;
        </span>
        <span>pending</span>
      </p>
      <p className="approved">
        <IoMdCheckmarkCircle size={18} className="approved-icon" />
        <span>{researcher.file_approved}</span>
        &nbsp;
        <span>approved</span>
      </p>
    </div>
  </div>
);

const Card = styled.div`
  width: 20rem;
  background: white;
  padding: 0.5rem;
  border: 1px solid #dfe3e8;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #f9fbfd;
  }

  .pending-count,
  .uploads-count,
  .approved-count {
    margin: 0 3px;
  }

  .details-wrapper {
    .details {
      .name {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .uploads {
        margin-bottom: 0.5rem;
      }

      .approved-pending {
        margin-bottom: 0;

        .icon {
          margin-right: 5px;

          .pending-icon {
            color: $app-red;
          }

          .approved-icon {
            color: green;
          }
        }
      }
    }

    .approve-pending-popup {
      position: relative;

      .icon {
        cursor: pointer;
      }

      .caret {
        position: absolute;
        width: 0;
        height: 0;
        border-right: solid 10px transparent;
        border-left: solid 10px transparent;
        border-bottom: 10px solid #eaeaea;
        top: -10px;
        left: 46px;
      }

      .approved-pending {
        position: absolute;
        list-style: none;
        padding: 0;
        border-radius: 10px;
        display: none;
        top: 2rem;
        left: -42px;
        width: 7rem;
        background: #eaeaea;
        z-index: 100;

        .list {
          cursor: pointer;
          padding: 5px;
          text-align: center;

          &:hover {
            /*background: #e6e6e6;*/
            background: #6b59da;
            color: $white;
          }
        }

        .first-list {
          border-bottom: solid 1px #d0cccc;
        }
      }
    }

    .image {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      border: solid 1px;

      .img {
        border-radius: 100%;
      }
    }
  }

  .stats {
    .pending {
      padding-right: 10px;
      border-right: solid;

      .pending-icon {
        color: gray;
        margin-right: 5px;
      }
    }

    .approved {
      padding-left: 10px;

      .approved-icon {
        color: green;
        margin-right: 10px;
      }
    }
  }

  .caret-grid {
    padding: 0;
    list-style: none;
  }

  .icon-wrapper {
    cursor: pointer;
  }
`;
