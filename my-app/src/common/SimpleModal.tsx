import React from 'react';

interface Props {
    header?: string;
    message?: string;
    open: boolean;
    onClose: () =>  void;
    onConfirm?: () => void;
    messageStyle?: React.CSSProperties;
    children?: React.ReactNode;
}

const SimpleModal = (props: Props) => {

    const { header, message, open, onClose, onConfirm, messageStyle, children } = props;

    if (!open) {
        return <></>
    }

    return (
        <div className="backdrop">
            <div className="tvx-modal-container">
                {header && <div className="tvx-modal-header">
                    <h1>{header}</h1>
                </div>}
                <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "20px"}}>
                    {message !== undefined && <div style={messageStyle !== undefined ? messageStyle : {textAlign: "center"}}>{message}</div>}
                    {children !== undefined && <div>{children}</div>}
                    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center"}}>
                        <button className={`tvx-ui-button solid wb-buttons${onConfirm ? "__white" : "" }`} style={{width: onConfirm ? "50%" : "100%"}} onClick={onClose}>Cancel</button>
                        {!!onConfirm && <button className="tvx-ui-button solid wb-buttons" style={{width: "50%"}} onClick={onConfirm}>OK</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimpleModal;
