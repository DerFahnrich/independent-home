import React from 'react';

type Props = {
  tags: string[] | null;
};

const TagsContainer = ({ tags }: Props) => {
  return (
    <div className="tvx-flex-align app-tags">
      {!tags || tags.length === 0
        ? ''
        : tags.map((tag, index) => (
          <div key={tag + index} className="tvx-flex-align app-tag">
            <span>{tag}</span>
          </div>
        ))}
    </div>
  );
};

export default TagsContainer;
