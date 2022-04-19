import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BlurredBackground from "components/BlurredBackground";
import { PopupContainer } from "components/PopContainer";
import { BUTTONS_TYPE } from "constants/buttons-type.constants";
import { COLORS } from "assets/colors/colors";
import CustomButton from "components/CustomButton";

import "./styles.scss";
//Actions
import { logOut, requestReLogIn } from "store/auth/action";
import { STATE_STATUSES } from "utils/app";

const ErrorPopup = ({ cancelHandler, tokenHasExpired, cantVerifyToken }) => {
  //Selectors
  const { refreshToken, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const message = tokenHasExpired
    ? "Your user session is about to expire. Continue session?"
    : cantVerifyToken
    ? "Can't verify token. Please try to re-login."
    : "Something went wrong during fetch.";
  const okBtnText = tokenHasExpired ? "Continue" : cantVerifyToken ? "Re-login" : "Reload Page";

  const confirmClick = () => {
    if (tokenHasExpired) {
      dispatch(requestReLogIn({ refreshToken })).then(() => {
        cancelHandler();
        window.location.reload();
      });
    } else if (cantVerifyToken) {
      dispatch(logOut());
      cancelHandler();
    } else {
      cancelHandler();
      window.location.reload();
    }
  };

  const cancelClick = () => {
    if (tokenHasExpired) {
      dispatch(logOut());
      cancelHandler();
    } else if (cantVerifyToken) {
      dispatch(logOut());
      cancelHandler();
    } else {
      cancelHandler();
    }
  };

  return (
    <BlurredBackground>
      <PopupContainer isLoading={status === STATE_STATUSES.PENDING} onClose={cancelClick}>
        <div className="error-popup">
          <div className="main-text">{message}</div>
          <div className="buttons-container">
            <CustomButton
              isLoading={status === STATE_STATUSES.PENDING}
              title={okBtnText}
              onClick={confirmClick}
              type={BUTTONS_TYPE.SOLID}
              color={COLORS.primaryBlue}
            />
            {cantVerifyToken ? null : (
              <CustomButton
                disabled={status === STATE_STATUSES.PENDING}
                title={"Cancel"}
                onClick={cancelClick}
                type={BUTTONS_TYPE.CANCEL}
              />
            )}
          </div>
        </div>
      </PopupContainer>
    </BlurredBackground>
  );
};

export default ErrorPopup;
