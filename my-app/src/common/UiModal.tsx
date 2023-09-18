import React from 'react';
import TagsContainer from './TagsContainer';
import BetaBadge from '@components//appDirectory/BetaBadge';

type Props = {
  headerIcon?: string;
  headerText?: string;
  title?: string;
  isBeta?: boolean;
  subtitle?: string;
  closable?: boolean;
  useSimple?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  deleteBtn?: React.ReactElement;
  confirmBtn?: React.ReactElement;
  children: React.ReactNode;
  isInstalled?: boolean;
  hideFooter?: boolean;
  modalWidth?: number;
  isConfig?: boolean;
  newModal?: boolean;
  height?: number;
};

const UiModal: React.FC<Props> = ({
  headerIcon,
  headerText,
  title,
  isBeta,
  subtitle,
  closable,
  cancelText,
  confirmText,
  hideFooter,
  deleteBtn,
  confirmBtn,
  onConfirm,
  onCancel,
  children,
  useSimple,
  modalWidth,
  isConfig,
  newModal,
  height,

}) => {
  const cancelLabel = cancelText || 'Cancel';
  const confirmLabel = confirmText || 'Confirm';

  const tvxModalContentStyle: React.CSSProperties = {
    maxHeight: hideFooter ? '100%' : 'inherit',
  };

  const modalStyle: React.CSSProperties = {
    maxHeight: '100%',
    width: modalWidth ? `${modalWidth}px` : '600px',
    height: height ? height : '',
    display: height ? "flex" : ""
  };

  const contentHeaderStyle: React.CSSProperties = {
    padding: '15px 24px',
    height: "100%",
    width: "100%",
  };

  const iconHeaderStyle: React.CSSProperties = {
    borderRadius: "8px",
    opacity: 1,
    backgroundColor: "rgba(248,248,248, 1)",
    width: "72px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  const tags = null;

  const ContentHeader = () => {
    return (
        <div className="content-header" style={contentHeaderStyle}>
          <div className="tvx-flex-align">
            <div
                className="tvx-ui-text-header app-name"
                style={{ fontSize: '24px' }}
            >
              {title}
            </div>
            {isBeta && <BetaBadge />}
          </div>
          {subtitle && (
              <span className="tvx-description app-company">
                        {subtitle}
                      </span>
          )}
          {modalBar}
        </div>
    )
  }

  const modalBar = !useSimple && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        marginTop: '12px',
      }}
      className="modal-bar"
    >
      <TagsContainer tags={tags} />
      <div className="action-btn" style={{ display: 'flex', gap: '8px' }}>
        {deleteBtn}
        {confirmBtn}
      </div>
    </div>
  );

  return (
    <>
      {
        <div className="backdrop">
          <div style={modalStyle} className="tvx-modal-container special-modal">
            <div className="tvx-modal-header">
              {headerIcon && (
                <div style={iconHeaderStyle}>
                <img className="headerIcon" width={38} height={38} src={headerIcon}/>
                </div>
              )}
              {!headerIcon && headerText && <span>{headerText}</span>}
              {newModal && <ContentHeader />}
              {closable && (
                <img onClick={onCancel} src="/img/svg/lightgrey_cross.svg" />
              )}
            </div>
            <div
              style={tvxModalContentStyle}
              className={`tvx-modal-content ${
                !hideFooter ? 'reserve-height' : ''
              }`}
            >
              <>
                {!useSimple && !newModal && (
                  <ContentHeader />
                )}
                {children}
              </>
              {useSimple && !hideFooter && (
                <div
                  className="tvx-modal-footer"
                  style={{
                    width: 'auto',
                    right: 0,
                  }}
                >
                  <button
                    className= {newModal ? "brilliant-tvx-ui-button simple" : "tvx-ui-button simple"}
                    style={{ padding: '8px 12px' }}
                    onClick={onCancel}
                  >
                    {cancelLabel}
                  </button>
                  <button
                    className={newModal ? "brilliant-tvx-ui-button solid" : "tvx-ui-button simple"}
                    style={{ padding: '8px 0' }}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default UiModal;
