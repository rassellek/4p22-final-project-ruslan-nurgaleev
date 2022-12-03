import classNames from 'classnames'
import React from 'react'
import s from './Input.module.scss'

const Input = (props) => {
  const { value, onChange, isInvalid, errorMessage, placeholder, name, label } = props
  return (
    <div className={s.root}>
      {isInvalid ? <div className={s.errorMsg}>{errorMessage}</div> : null}
      <input
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(s.inputDefault, { [s.inputError]: isInvalid })}
      />
      <label className={s.label} 
      htmlFor={name}>
        <p>*&nbsp;</p>
        {label}
      </label>
    </div>
  )
}

export default Input
