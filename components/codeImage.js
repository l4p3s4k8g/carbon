import { EOL } from 'os'
import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import domtoimage from 'dom-to-image'
import highlight from 'highlight.js'
import CodeMirror from 'react-codemirror'

const padding = '50px 50px'

const DEFAULT_CODE = `
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`

const MAX_LINES = 40

class CodeImage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      code: this.props.children
    }
    
    this.save = this.save.bind(this)
  }

  save () {
    // save
    domtoimage.toJpeg(this.container)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.jpeg'
        link.href = dataUrl
        link.click()
      })
  }

  highlight () {
    highlight.initHighlighting.called = false
    highlight.initHighlighting()
  }

  componentDidMount () {
    // highlight
    this.highlight()

    //highlight when content changes
    this.editor.addEventListener('input', () => {
      console.log('edit')
      this.highlight()
    })
  }

  render () {
    let code = this.state.droppedContent || this.props.children || DEFAULT_CODE
    const split = code.split(EOL)
    if (split.length > MAX_LINES) code = [...split.slice(0, MAX_LINES - 1), '', '...'].join(EOL)

    return this.props.connectDropTarget(
      <div id='section'>
        <link rel='stylesheet' href='https://highlightjs.org/static/demo/styles/default.css'/>
        <div id='container' ref={(container) => { this.container = container }}>

          <div contentEditable="true" ref={(editor) => { this.editor = editor}}>
            <pre>
              <code>
                {this.props.initCode}
              </code>
            </pre>
          </div>
        </div>
        <button onClick={this.highlight}/>
        <style jsx>{`
          #section {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #container {
            background: green;
            padding: ${padding};
           
          }
          pre {
            background: white;
            padding: 10px;
            box-shadow: 10px 10px 12px -5px rgba(0,0,0,0.17);
          }
        `}</style>
      </div>
    )
  }
}

const drop = (props, monitor, component) => {
  const bundle = monitor.getItem()
  const file = bundle.files[0]
  const reader = new FileReader()
  reader.onload = function(event) {
    component.setState({
      droppedContent: event.target.result
    })
  };
  reader.readAsText(file, "UTF-8");
}

export default DropTarget(NativeTypes.FILE, { drop }, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem()
}))(CodeImage)
