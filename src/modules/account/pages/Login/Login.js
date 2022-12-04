import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { MainLayout } from 'shared'
import { Input } from './components/Index'

import { HouseIcon } from 'assets/icons'
import s from './Login.module.scss'

import { validateEmail } from '../Account.utils'

const Login = () => {
  const navigate = useNavigate()

  const [registrationIsValid, setRegistrationIsValid] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

  const [isErrorEmailMessage, setIsErrorEmailMessage] = useState('')
  const [isErrorPasswordMessage, setIsErrorPasswordMessage] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    const formData = {
      email,
      password,
    }

    let isValid = true

    if (formData.email === '') {
      setIsEmailInvalid(true)
      setIsErrorEmailMessage('Поле обязательно для заполнения')
      isValid = false
    } else if (!validateEmail(formData.email)) {
      setIsEmailInvalid(true)
      setIsErrorEmailMessage('Email некорректный')
      isValid = false
    }
    if (formData.password.trim() === '') {
      setIsPasswordInvalid(true)
      setIsErrorPasswordMessage('Поле обязательно для заполнения')
      isValid = false
    } else if (formData.password.length < 8) {
      setIsPasswordInvalid(true)
      setIsErrorPasswordMessage('Пароль должен содержать не менее 8 символов')
      isValid = false
    }
    if (isValid) {
      setRegistrationIsValid(true)
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
          <h2>Авторизация</h2>
        </div>

        <div className={s.container}>
          {!registrationIsValid ? (
            <form className={s.form} onSubmit={onSubmit}>
              <div className={s.title}>Авторизация</div>

              <Input
                value={email}
                placeholder={'Введите email'}
                name={'email'}
                onChange={(event) => {
                  setIsEmailInvalid(false)
                  setEmail(event.target.value)
                }}
                isInvalid={isEmailInvalid}
                errorMessage={isErrorEmailMessage}
                label={'Email'}
              />

              <Input
                value={password}
                placeholder={'Введите пароль'}
                onChange={(event) => {
                  setIsPasswordInvalid(false)
                  setPassword(event.target.value)
                }}
                isInvalid={isPasswordInvalid}
                errorMessage={isErrorPasswordMessage}
                label={'Введите пароль'}
              />

              <button type={'submit'} className={s.button}>
                Отправить
              </button>
            </form>
          ) : (
            <>
              <h2 className={s.title}>
                <p>Вы успешно авторизировались!</p>
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
                <p>
                  <button className={s.buttonNavigate} onClick={() => navigate('/support')}>
                    &gt; Обратиться в службу поддержки.
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

export default Login
