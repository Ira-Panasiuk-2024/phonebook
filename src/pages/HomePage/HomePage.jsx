import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <main>
      <section className={css.homeSection}>
        <h1 className={css.title}>Welcome to the PhoneBook! <br /> Create an account or log in to unlock new horizons of communication!</h1>
      </section>
    </main>
  );
};

export default HomePage;
