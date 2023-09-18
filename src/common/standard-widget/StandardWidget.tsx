import React from 'react';
import './StandardWidget.css';

interface IStandardWidgetProps {
    className?: string;
    children?: React.ReactNode;
}

const StandardWidget = (props: IStandardWidgetProps): JSX.Element => {
    return (
        <div className={`standard-widget ${props.className ? props.className : ""}`}>
            {props.children}
        </div>
    );
};

export default StandardWidget;
