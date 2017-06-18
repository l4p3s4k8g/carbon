import React from 'react'

export default (props) => (
  <div onClick={props.onClick} className="toolbar-btn" style={Object.assign({
    background: props.bg
  }, props.style)}>
    <span>{props.title}</span>
    <style jsx>{`
      div {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        color: #000;
        border: 0.5px solid #000;
        border-radius: 3px;
      }
      div:last-of-type {
        border-radius: 0px 3px 3px 0px;
        border-left: 0px;
      }
    `}</style>
  </div>
)
