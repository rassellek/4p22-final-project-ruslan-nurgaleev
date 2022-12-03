import classNames from 'classnames'
import React from 'react'
import s from './Checkbox.module.scss'

const Checkbox = (props) => {
  const { onChange, isInvalid, errorMessage, name, value } = props
  return (
    <div className={s.root}>
      <div className={s.checkbox}>
        <label htmlFor={name}>
          <p className={classNames(s.checkboxDefault, { [s.checkboxError]: isInvalid })}>*&nbsp;</p>
          <p>&nbsp;Я согласен c политикой конфиденциальности.</p>
        </label>

        {isInvalid ? <p className={s.errorMsg}>{errorMessage}</p> : null}

        <input type='checkbox' name={name} checked={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default Checkbox
