import React, { Component } from 'react'
import Link from 'next/link'

import styles from './styles.module.css'

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <nav class={`navbar navbar-expand-lg navbar-light ${styles.menu}`}>
          <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="https://img.icons8.com/fluency/48/000000/ethereum.png"/></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <span class={styles.link}><Link aria-current="page" href="/">Home</Link ></span>
                <span class={styles.link}><Link aria-current="page" href="/campaigns/new">New campaign</Link ></span>
              </div>
            </div>
          </div>
        </nav>      
      </div>
    )
  }
}
