/* global config */
import React from 'react';
import Icon from '../../Icon';
import './styles.scss';

const Logos = () => (
  <div className="Logos">
    <div className="Logos__List">
      {config.hotelGroup.list.map((name, key) => (
        <div key={key} className="Logos__Hotel">
          <Icon name={name} />
        </div>
      ))}
      <div className="Logos__LHGLogo" />
    </div>
  </div>
);

export default Logos;
