import React from 'react';
import SynapseDraft from '../src/SynapseDraft';

require('./demo.scss');

function SynapseDraftDemo() {
  return (
    <div className="demo__wrapper">
      <h1 className="h1 text-center">Synapse Draft.js</h1>
      <p className="p text-center">
        A simple WYSIWYG text editor utilizing Facebook's Draft.js library– customized by Synapse Studios.
      </p>
      <p className="p text-center">
        View this project on <a href="https://github.com/synapsestudios/synapse-draft">Github</a>
      </p>
      <SynapseDraft />
    </div>
  );
}

export default SynapseDraftDemo;
