
import classNames from 'classnames'
import React from 'react'
import s from './Textarea.module.scss'

const Textarea = (props) => {
  const { value, onChange, isInvalid, errorMessage, placeholder, name, label } = props
  return (
    <div className={s.root}>
      {isInvalid ? <div className={s.errorMsg}>{errorMessage}</div> : null}
      <textarea
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(s.textareaDefault, { [s.textareaError]: isInvalid })}
      />
      <label className={s.label} htmlFor={name}>
        <p>*&nbsp;</p>
        {label}
      </label>
    </div>
  )
}

export default Textarea
