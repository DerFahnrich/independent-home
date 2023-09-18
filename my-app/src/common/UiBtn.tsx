import React from 'react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  classNames: string;
};

const UiBtn = ({ onClick, children, classNames, disabled }: Props) => {
  return (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default UiBtn;
