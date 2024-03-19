import css from './header.module.css'

const Header = () => {

  return (
    <header>
        <div className={css.container}>
        <img className={css.logo} src="https://cdn-icons-png.flaticon.com/128/5197/5197369.png" alt="logo" />
        <h2 className={css.title}>DressCode</h2>
        </div>
    </header>
  )
}

export default Header