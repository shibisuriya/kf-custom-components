/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import ApiInspector from "api-inspector";

export default function booleone(props) {
  const {
    value,
    field,
    actions,
    disabled,
    parameter,
    readonly,
    errors,
    theme,
    fetchKfApi,
  } = props;

  const { id, name, type, isRequired, hint, defaultValue, color } = field;

  const { updateValue, validateField } = actions;

  return (
    <div style={{ outline: "3px solid red", backgroundColor: color }}>
      <ApiInspector {...props} />
      <div>
        {readonly ? (
          value
        ) : (
          <div>
            <div>
              <label htmlFor="yes">
                <Trans>Yes</Trans>
              </label>
              <input
                type="radio"
                id="yes"
                name="question"
                value={true}
                checked={!!value === true}
                onChange={() => {
                  updateValue(true);
                }}
              />
            </div>
            <div>
              <label htmlFor="no">
                <Trans>No</Trans>
              </label>
              <input
                type="radio"
                id="no"
                name="question"
                value={false}
                checked={!!value === false}
                onChange={() => {
                  updateValue(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Boolean.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  fieldId: PropTypes.string,
  hint: PropTypes.string,
  defaultValue: PropTypes.string,
  events: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  states: PropTypes.shape({}),
};
