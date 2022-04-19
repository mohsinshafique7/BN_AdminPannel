import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSuggestion, productCoreReplace, manuallyReplaceProductCore } from "../../store/suggestions/action";
import { withRouter } from "react-router-dom";
import { Button, Popconfirm, Modal, Checkbox, Input, notification } from "antd";
import { SuggestionDescStyles } from "./style";
import { STATE_STATUSES } from "../../utils/app";
import Loader from "../Loader/Loader";

const SuggestionDesc = (props) => {
  const {
    getSuggestion,
    suggestion,
    suggestion: { suggestions },
    productCoreReplace,
    manuallyReplaceProductCore,
    status,
    history,
    match: { params },
  } = props;

  const [visible, setVisible] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [valueEan, setValueEan] = useState("");

  useEffect(() => {
    getSuggestion(params.id);
  }, [params.id, getSuggestion]);

  useEffect(() => {
    if (checkbox) {
      setValueEan(`${suggestions[0].coreProduct.sourceType}_${suggestions[0].coreProduct.ean}`);
    } else {
      setValueEan("");
    }
  }, [checkbox, suggestions]);

  const roundingNumber = (value) => {
    const number = Number(value);
    if (Number.isInteger(number)) {
      return `${number}%`;
    } else {
      return `${number.toFixed(2)}%`;
    }
  };

  const handleResolve = (objId) => {
    productCoreReplace(objId).then(() => history.goBack());
  };

  const handleType = (e) => setValueEan(e.target.value);

  const openNotification = () => {
    notification["error"]({
      message: "Error",
      description: "Incorrect EAN",
    });
  };

  const handleManually = () => {
    if (valueEan.length) {
      manuallyReplaceProductCore({ id: suggestion.core.id, suggestedEan: valueEan })
        .then(() => history.goBack())
        .catch(() => openNotification());
    }
  };

  return (
    <SuggestionDescStyles>
      <Button type="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
      <div className="item-title">Mapping Suggestions</div>
      {suggestions && status === STATE_STATUSES.READY ? (
        <>
          <div className="suggested-wrapper">
            <div className="suggested-box">
              <a className="image" href={suggestions[0].coreProduct.href} rel="noopener noreferrer" target="_blank">
                <img className="img" src={suggestions[0].coreProduct.productImage} alt="img" />
              </a>
              <div className="title">{suggestions[0].coreProduct.productTitle}</div>
              <div className="ean">Retailer Product ID: {suggestions[0].coreProduct.ean}</div>
              <div className="ean">Price: {suggestions[0].coreProduct.basePrice}</div>
              <div className="ean">Retailer: {suggestions[0].coreProduct.sourceType}</div>
              <div className="ean">Weight: {suggestions[0].coreProduct.size}</div>
              <div className="ean">Promotions: {suggestions[0].coreProduct.promotions.toString()}</div>
              <div className="resolve-btn">
                <Button type="primary" danger onClick={() => setVisible(true)}>
                  Resolve Manually
                </Button>
                <Modal
                  className="modal-suggestions"
                  title={props.title}
                  visible={visible}
                  onOk={handleManually}
                  onCancel={() => setVisible(false)}
                  okText="Resolve"
                >
                  <Input className="input-product" onChange={handleType} value={valueEan} placeholder="Enter EAN" />
                  <Checkbox onChange={() => setCheckbox(!checkbox)}>Set to Retailer's own Product ID</Checkbox>
                </Modal>
              </div>
            </div>

            {suggestions
              .sort((first, second) => second.match - first.match)
              .map((suggestion, index) => (
                <div key={index} className="suggested-box">
                  <div className="match">Total: {roundingNumber(suggestion.match)}</div>
                  <a className="image" href={suggestion.suggestedProduct.href} rel="noopener noreferrer" target="_blank">
                    <img className="img" src={suggestion.suggestedProduct.productImage} alt="img" />
                  </a>
                  <div className="title">{suggestion.suggestedProduct.productTitle}</div>
                  <div className="ean">EAN: {suggestion.suggestedCore.ean}</div>
                  <div className="ean">Price: {suggestion.suggestedProduct.basePrice}</div>
                  <div className="ean">Retailer: {suggestion.suggestedProduct.sourceType}</div>
                  <div className="ean">Weight: {suggestion.suggestedProduct.size}</div>
                  <div className="ean">Promotions: {suggestion.suggestedProduct.promotions.toString()}</div>
                  <br />

                  <div className="product-param">
                    <div className="title">Match Comparison:</div>
                    <div>
                      Image: <span>{roundingNumber(suggestion.matchImage)}</span>
                    </div>
                    <div>
                      Title: <span>{roundingNumber(suggestion.matchTitle)}</span>
                    </div>
                    <div>
                      Ingredients: <span>{roundingNumber(suggestion.matchIngredients)}</span>
                    </div>
                    <div>
                      Nutritional: <span>{roundingNumber(suggestion.matchNutritional)}</span>
                    </div>
                    <div>
                      Price: <span>{roundingNumber(suggestion.matchPrice * 100)}</span>
                    </div>
                    <div>
                      Weight: <span>{roundingNumber(suggestion.matchWeight * 100)}</span>
                    </div>
                  </div>
                  <br />
                  <Popconfirm
                    onConfirm={() => handleResolve({ id: suggestion.core.id, suggestedId: suggestion.suggestedCore.id })}
                    title="Resolve to this Product?"
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="resolve-btn" type="primary">
                      Resolve
                    </Button>
                  </Popconfirm>
                </div>
              ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </SuggestionDescStyles>
  );
};

export default connect(
  (state) => ({
    suggestion: state.suggestions.suggestion,
    status: state.suggestions.status,
  }),
  { getSuggestion, productCoreReplace, manuallyReplaceProductCore }
)(withRouter(SuggestionDesc));
