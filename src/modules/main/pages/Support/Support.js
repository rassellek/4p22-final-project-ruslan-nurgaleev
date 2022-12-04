import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { MainLayout } from 'shared'
import { Input, Textarea, Radio, Checkbox } from './components/Index'

import { HouseIcon } from 'assets/icons'
import s from './Support.module.scss'

import { validateEmail } from './Support.utils'

const Support = () => {
  const navigate = useNavigate()

  const [supportIsValid, setSupportIsValid] = useState(false)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [textarea, setTextarea] = useState('')
  const [radio, setRadio] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [file, setFile] = useState()

  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isNameInvalid, setIsNameInvalid] = useState(false)
  const [isTextareaInvalid, setIsTextareaInvalid] = useState(false)
  const [isRadioInvalid, setIsRadioInvalid] = useState(false)
  const [isCheckboxInvalid, setIsCheckboxInvalid] = useState(false)

  const [isErrorMessage, setIsErrorMessage] = useState('')

  const handleChange = () => {
    setCheckbox(!checkbox)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const formData = {
      email,
      name,
      textarea,
      radio,
      checkbox,
      file,
    }

    let isValid = true

    if (formData.email === '') {
      setIsEmailInvalid(true)
      setIsErrorMessage('Поле обязательно для заполнения')
      isValid = false
    } else if (!validateEmail(formData.email)) {
      setIsEmailInvalid(true)
      setIsErrorMessage('Email некорректный')
      isValid = false
    }
    if (formData.name === '') {
      setIsNameInvalid(true)
      isValid = false
    }
    if (formData.radio === '') {
      setIsRadioInvalid(true)
      isValid = false
    }
    if (formData.textarea === '') {
      setIsTextareaInvalid(true)
      isValid = false
    }
    if (formData.checkbox === false) {
      setIsCheckboxInvalid(true)
      isValid = false
    }
    if (isValid) {
      setSupportIsValid(true)
      console.log(formData)
    }
  }

  return (
    <MainLayout>
      <div className={s.root}>
        <div className={s.navigate}>
          <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
            <HouseIcon className={s.icon} />
          </button>
          <span>&nbsp;&gt;&nbsp;</span>
          <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
            <h2>Главная</h2>
          </button>
          <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          <h2>Служба поддержки</h2>
        </div>

        <div className={s.container}>
          {!supportIsValid ? (
            <form className={s.form} onSubmit={onSubmit}>
              <div className={s.title}>Обратная связь</div>

              <Input
                value={email}
                placeholder={'Введите email'}
                name={'email'}
                onChange={(event) => {
                  setIsEmailInvalid(false)
                  setEmail(event.target.value)
                }}
                isInvalid={isEmailInvalid}
                errorMessage={isErrorMessage}
                label={'Email'}
              />

              <Input
                value={name}
                placeholder={'Введите имя'}
                onChange={(event) => {
                  setIsNameInvalid(false)
                  setName(event.target.value)
                }}
                isInvalid={isNameInvalid}
                errorMessage={'Поле обязательно для заполнения'}
                label={'Введите имя'}
              />

              <Radio
                value1={'Ошибка на сайте'}
                value2={'Другое'}
                id1={'radio-1'}
                id2={'radio-2'}
                name={'radio-group'}
                onChange={(event) => {
                  setIsRadioInvalid(false)
                  setRadio(event.target.value)
                }}
                isInvalid={isRadioInvalid}
                errorMessage={'Выберите тему обращения'}
              />

              <Textarea
                value={textarea}
                placeholder={'Опишите возникшую ситуацию максимально подробно...'}
                onChange={(event) => {
                  setIsTextareaInvalid(false)
                  setTextarea(event.target.value)
                }}
                isInvalid={isTextareaInvalid}
                errorMessage={'Поле обязательно для заполнения'}
                label={'Сообщение'}
              />

              <Checkbox
                name={'check'}
                value={checkbox}
                onChange={(event) => {
                  setIsCheckboxInvalid(false)
                  handleChange()
                }}
                isInvalid={isCheckboxInvalid}
                errorMessage={'Подтвердите согласие'}
              />
              <div className={s.loading}>
                <p>Скриншот</p>
                <input
                  id='file-input'
                  type='file'
                  name='file'
                  multiple
                  onChange={(event) => {
                    setFile(event.target.value)
                  }}
                />
              </div>

              <button type={'submit'} className={s.button}>
                Отправить
              </button>
            </form>
          ) : (
            <>
              <h2 className={s.title}>
                <p>Ваше обращение успешно отправлено!</p>
                <p>Вы можете перейти на главную страницу или воспользоваться каталогом товаров.</p>
                <p>
                  <button className={s.buttonNavigate} onClick={() => navigate('/home')}>
                    &gt; Вернуться на главную страницу.
                  </button>
                </p>
                <p>
                  <button className={s.buttonNavigate} onClick={() => navigate('/')}>
                    &gt; Посмотреть каталог товаров.
                  </button>
                </p>
              </h2>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default Support
