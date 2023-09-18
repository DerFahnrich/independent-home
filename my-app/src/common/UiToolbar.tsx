import React from 'react';

type Props = {
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  children: React.ReactNode;
};

const UiToolbar = ({ children, style, itemStyle }: Props) => {
  return (
    <div style={style} className={'tvx-flex tvx-toolbar'}>
      <div
        className="tvx-flex justify-between tvx-toolbar-container"
        style={{ padding: 0 }}
      >
        <div className="tvx-flex align-items">
          <div className="item" style={itemStyle}>
            <div className="tvx-flex tvx-toolbar-action-tabs">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiToolbar;
