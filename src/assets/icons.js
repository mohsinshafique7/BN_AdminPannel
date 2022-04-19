import React from "react";

export const CollapseClose = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g>
                <path d="M0 0H24V24H0z" transform="translate(-182 -1654) translate(152 78) translate(20 1548) rotate(90 3 31)" />
                <path
                  fill={props.color}
                  d="M16 6.5H8c-.828 0-1.5.672-1.5 1.5v8c0 .828.672 1.5 1.5 1.5h8c.828 0 1.5-.672 1.5-1.5V8c0-.828-.672-1.5-1.5-1.5zm-8 1h8c.276 0 .5.224.5.5v8c0 .276-.224.5-.5.5H8c-.276 0-.5-.224-.5-.5V8c0-.276.224-.5.5-.5z"
                  transform="translate(-182 -1654) translate(152 78) translate(20 1548) rotate(90 3 31)"
                />
                <path
                  fill={props.color}
                  d="M12 9.5c.276 0 .5.224.5.5v1.5H14c.276 0 .5.224.5.5s-.224.5-.5.5h-1.5V14c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.5H10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1.5V10c0-.276.224-.5.5-.5z"
                  transform="translate(-182 -1654) translate(152 78) translate(20 1548) rotate(90 3 31)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CollapseOpen = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g transform="translate(-182 -628) translate(152 78) translate(30 550) rotate(90 12 12)">
                <path d="M0 0H24V24H0z" />
                <path
                  fill={props.color}
                  d="M16 6.5H8c-.828 0-1.5.672-1.5 1.5v8c0 .828.672 1.5 1.5 1.5h8c.828 0 1.5-.672 1.5-1.5V8c0-.828-.672-1.5-1.5-1.5zm-8 1h8c.276 0 .5.224.5.5v8c0 .276-.224.5-.5.5H8c-.276 0-.5-.224-.5-.5V8c0-.276.224-.5.5-.5z"
                />
                <rect width="5" height="1" x="9.5" y="11.5" fill={props.color} rx=".5" transform="rotate(90 12 12)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
