import React from 'react'
import Link from 'next/link'
import { PALETTE } from '../lib/constants'

const Footer = (props) => (
  <div className="footer">
    <div>
      <Link href="/about"><a>about</a></Link>
      <a href="mailto:hi@dawnlabs.io?subject=Carbon%20Feedback&anp;body=">send feedback</a>
      <a href="https://github.com/dawnlabs/carbon">source</a>
    </div>
    <div>a project by <a href="https://twitter.com/dawn_labs">@dawn_labs</a> ¬</div>
    <style jsx>{`
      .footer {
        margin: 48px 0;
      }

      div {
        text-align: center;
        font-size: 14px;
        margin: 16px 0;
        color: ${PALETTE.GRAY};
      }

      a {
        margin-right: 16px;
        color: #fff;
        text-decoration: none;
      }

      a:last-child {
        margin-right: 0;
      }

      a:hover {
        border-bottom: 1px solid #fff;
      }
    `}</style>
  </div>
)

export default Footer
