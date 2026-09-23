import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import Web3Status from '../Web3Status'
import logo from '../../assets/brand/logo.svg'

const Bar = styled.header`
  width: 100%; max-width: 1320px; margin: 0 auto; padding: 10px 12px;
  display: flex; align-items: flex-start; gap: 32px; color: #eceeef;
  a { color: inherit; text-decoration: none; }
  nav { display: flex; align-items: center; justify-content: space-evenly; gap: 32px; flex: 1; min-height: 34px; }
  nav a { font-family: monospace; text-transform: uppercase; letter-spacing: 1px; font-size: 16px; font-weight: 400; line-height: 1.3; padding: 6.6px 0; transition: color 150ms ease; }
  nav a:hover, nav a.active { color: #7ade20; }
  @media (min-width: 1200px) and (max-width: 1399px) { max-width: 1140px; }
  @media (min-width: 992px) and (max-width: 1199px) { max-width: 960px; }
  @media (min-width: 992px) and (max-width: 1200px) { nav a { font-size: 14.4px; } }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 720px;
    nav { gap: 14px; }
    nav a { font-size: 12px; }
  }
  @media (min-width: 576px) and (max-width: 767px) { max-width: 540px; }
  @media (max-width: 767px) {
    flex-wrap: wrap; align-items: center; gap: 12px; padding-top: 20px;
    nav { order: 3; flex-basis: 100%; justify-content: space-around; gap: 8px; }
    nav a { font-size: 13px; min-height: 44px; display: flex; align-items: center; }
  }
  @media (max-width: 500px) {
    padding: 20px 12px 12px;
  }
`
const Brand = styled.a`
  display: flex; flex-shrink: 0; position: relative; top: -10px; align-self: flex-start;
  img { width: 72px; height: auto; }
  @media (max-width: 767px) { top: -20px; img { width: 56px; } }
`
const Controls = styled.div`
  margin-left: auto; max-width: 210px; min-width: 0;
  button { border-radius: 3px; font-family: monospace; }
`
export default function Header() {
  return <Bar>
    <Brand href="/" aria-label="INU Cash home"><img src={logo} alt="INU Cash" /></Brand>
    <nav aria-label="Trading navigation">
      <NavLink to="/swap">Swap</NavLink>
      <NavLink to="/pool">Pools</NavLink>
    </nav>
    <Controls><Web3Status /></Controls>
  </Bar>
}
