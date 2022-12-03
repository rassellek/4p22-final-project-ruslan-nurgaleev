import classNames from 'classnames'
import React from 'react'
import s from './Radio.module.scss'

const Radio = (props) => {
  const { value1, value2, onChange, isInvalid, errorMessage, name, id1, id2 } = props
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={name}>
        <p className={classNames(s.radioDefault, { [s.radioError]: isInvalid })}>*&nbsp;</p>
        <p>Тема обращения</p>
        {isInvalid ? <p className={s.errorMsg}>{errorMessage}</p> : null}
      </label>

      <div className={s.value1}>
        <input type='radio' name={name} id={id1} value={value1} onChange={onChange} />

        <label htmlFor={id1}>
          <p>{value1}</p>
        </label>
      </div>

      <div className={s.value2}>
        <input type='radio' name={name} id={id2} value={value2} onChange={onChange} />

        <label className={s.value2} htmlFor={id2}>
          <p>{value2}</p>
        </label>
      </div>
    </div>
  )
}

export default Radio
