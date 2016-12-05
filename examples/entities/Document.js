import React from 'react';
import { Entity } from 'draft-js';
import { ENTITY_TYPE } from '../../lib';

export function findDocumentEntities(contentBlock, callback) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            Entity.get(entityKey).getType() === ENTITY_TYPE.DOCUMENT
        );
    }, callback);
}

const Document = ({ entityKey, children }) => {
    const { url, title } = Entity.get(entityKey).getData();
    return (
        <span data-tooltip={url} className="RichEditor-link icon icon-doc-full" title={title}>
            {children}
        </span>
    );
};

Document.propTypes = {
    entityKey: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
};

export default Document;
