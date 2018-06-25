import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('bookStore')
@observer
export default class List extends React.Component {}

const List = ({ bookStore }) => <Comp />
export default inject('bookStore')(observer(List))
