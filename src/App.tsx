import { useEffect, useRef, useState } from "react";
import MAP from "./assets/Map_world_dark_soon.svg";
import locationActive from "./assets/location-active.svg";
import locationSoon from "./assets/location-soon.svg";

import phoneScreenshot from "./assets/phone-screen.png";
import telegramIcon from "./assets/telegram-plane.svg";
import "./effects.css";

function moveHero(event: React.PointerEvent<HTMLDivElement>) {
  if (
    event.pointerType !== "mouse" ||
    !window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches
  )
    return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.setProperty("--hero-x", `${x * 16}px`);
  event.currentTarget.style.setProperty("--hero-y", `${y * 12}px`);
}

function resetHero(event: React.PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.setProperty("--hero-x", "0px");
  event.currentTarget.style.setProperty("--hero-y", "0px");
}

const telegramUrl =
  import.meta.env.VITE_TELEGRAM_URL ||
  "https://t.me/test_classifyv1_bot?startapp";
type IconName =
  | "send"
  | "pin"
  | "arrow"
  | "chevron"
  | "search"
  | "heart"
  | "home"
  | "bike"
  | "laptop"
  | "grid"
  | "plus"
  | "bell"
  | "user"
  | "check"
  | "message"
  | "menu"
  | "tractor"
  | "close";
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    send: (
      <path
        fill="currentColor"
        stroke="none"
        d="M22.05 2.27 1.35 10.25c-1.41.57-1.4 1.36-.26 1.71l5.31 1.66 2.03 6.23c.25.69.13.96.86.96.56 0 .81-.25 1.12-.55l2.58-2.51 5.36 3.96c.99.55 1.7.27 1.95-.92l3.52-16.58c.36-1.44-.55-2.1-1.77-1.55ZM7.23 13.24l12.02-7.58c.6-.37 1.16-.17.71.24l-9.93 8.96-.39 4.13-2.41-5.75Z"
      />
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 6l-1.1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10H3Z" />
        <path d="M9 20v-7h6v7" />
      </>
    ),
    bike: (
      <>
        <circle cx="5" cy="17" r="4" />
        <circle cx="19" cy="17" r="4" />
        <path d="m5 17 5-9 6 9H5m9-13h3l2 13M7 8h6" />
      </>
    ),
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="1.5" />
        <path d="m4 16-2 4h20l-2-4M9 20h6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    message: (
      <path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.6-5A9 9 0 1 1 21 11Z" />
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    tractor: (
      <>
        <path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" />
        <path d="M16 18h-5" />
        <path d="M18 5a1 1 0 0 0-1 1v5.573" />
        <path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" />
        <path d="M4 11V4" />
        <path d="M7 15h.01" />
        <path d="M8 10.1V4" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="7" cy="15" r="5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
function TelegramButton({
  children = "Открыть в Telegram",
}: {
  children?: React.ReactNode;
}) {
  return (
    <a
      className="button button-primary"
      href={telegramUrl}
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="send" size={19} />
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}
function Logo() {
  return (
    <a href="#" className="logo" aria-label="TWA Classifieds — на главную">
      <span className="logo-mark">
        <Icon name="grid" size={23} />
      </span>
      <span>
        TWA Classifieds
        {/* <span className="logo-twa">by </span> */}
      </span>
    </a>
  );
}
const listings = [
  {
    id: "villa",
    category: "Жильё",
    title: "Вилла с собственным бассейном",
    price: "29 млн Rp",
    period: "/ месяц",
    place: "Чангу, Берава",
    image: "villa",
    detail:
      "Две спальни, кухня-гостиная и свой бассейн. Пример объявления об аренде жилья на Бали.",
  },
  {
    id: "bike",
    category: "Транспорт",
    title: "KTM 790 Duke, 2022",
    price: "118 млн Rp",
    period: "",
    place: "Чангу",
    image: "bike",
    detail:
      "Мотоцикл для поездок по острову. Пример карточки с фотографией, ценой и местом продажи.",
  },
  {
    id: "laptop",
    category: "Техника",
    title: "MacBook Pro 13″",
    price: "12 млн Rp",
    period: "",
    place: "Семиньяк",
    image: "laptop",
    detail:
      "Ноутбук для работы и путешествий. Пример объявления в категории «Техника».",
  },
  {
    id: "room",
    category: "Жильё",
    title: "Светлая квартира у океана",
    price: "18 млн Rp",
    period: "/ месяц",
    place: "Санур",
    image: "room",
    detail:
      "Пример объявления об аренде квартиры. В приложении можно выбрать район и связаться с автором.",
  },
  {
    id: "surf",
    category: "Хобби",
    title: "Сёрфборд для первых волн",
    price: "2,5 млн Rp",
    period: "",
    place: "Улувату",
    image: "surf",
    detail: "Доска для сёрфинга. Демонстрационный пример раздела «Хобби».",
  },
  {
    id: "camera",
    category: "Техника",
    title: "Камера для новых историй",
    price: "8 млн Rp",
    period: "",
    place: "Убуд",
    image: "camera",
    detail:
      "Пример объявления о продаже камеры. Все изображения и цены на лендинге демонстрационные.",
  },
];
// const categories: { title: string; icon: IconName }[] = [
//   { title: "Все объявления", icon: "grid" },
//   { title: "Жильё", icon: "home" },
//   { title: "Транспорт", icon: "bike" },
//   { title: "Техника", icon: "laptop" },
//   { title: "Хобби", icon: "heart" },
// ];
const cities = [
  {
    name: "Бали",
    country: "Индонезия",
    districts: ["Чангу", "Убуд", "Семиньяк", "Санур", "Улувату"],
    currency: "Индонезийские рупии · Rp",
  },
  {
    name: "Пхукет",
    country: "Таиланд",
    districts: ["Раваи", "Ката", "Карон", "Банг Тао", "Патонг"],
    currency: "Тайские баты · ฿",
  },
  {
    name: "Бангкок",
    country: "Таиланд",
    districts: ["Сукхумвит", "Силом", "Ари", "Тонглор"],
    currency: "Тайские баты · ฿",
  },
  {
    name: "Дубай",
    country: "ОАЭ",
    districts: ["Марина", "Бизнес-Бэй", "JLT", "Даунтаун"],
    currency: "Дирхамы ОАЭ · AED",
  },
];
function PhonePreview() {
  return (
    <div className="phone phone-with-screenshot">
      <img
        className="phone-screenshot"
        src={phoneScreenshot}
        alt="Classifieds на Бали: категории и объявления рядом с вами"
        width={425}
        height={876}
        fetchPriority="high"
      />
    </div>
  );
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category] = useState("Все объявления");
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<(typeof listings)[number] | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => opener?.focus();
  }, [selected]);
  const visibleListings =
    category === "Все объявления"
      ? listings.slice(0, 4)
      : listings.filter((l) => l.category === category);
  const toggleSaved = (id: string) =>
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id],
    );
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Основная навигация"
          >
            {[
              ["#discover", "Что можно найти"],
              ["#how-it-works", "Как это работает"],
              ["#locations", "Города"],
            ].map(([url, label]) => (
              <a key={url} href={url} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="header-cta"
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
          >
            В Telegram <Icon name="arrow" size={17} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero-background">
          <div className="hero container">
            <div className="hero-copy">
              <div className="hero-badge">
                <Icon name="send" size={15} />
                <span>Ваш район. Ваш Telegram.</span>
              </div>
              <h1>
                Новый город.
                <br />
                Свои люди.
                <br />
                Всё рядом.
              </h1>
              <p className="hero-description">
                Жильё, байк, вещи и услуги — от людей рядом с вами. Находите
                нужное и договаривайтесь прямо в Telegram.
              </p>
              <div className="hero-actions">
                <TelegramButton />
                <a className="text-link" href="#discover">
                  Посмотреть, что внутри <Icon name="arrow" size={18} />
                </a>
              </div>
              <p className="hero-note">
                <Icon name="check" size={15} />
                Без отдельного приложения и нового аккаунта
              </p>
            </div>
            <div
              className="hero-visual"
              onPointerMove={moveHero}
              onPointerLeave={resetHero}
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="orbit-dot" />
              <div className="visual-place">
                <span className="live-dot" />
                Бали, Чангу
              </div>
              <PhonePreview />
              <div className="floating-listing">
                <img
                  src="/images/villa.jpg"
                  alt="Вилла с бассейном — пример объявления"
                />
                <div>
                  <span>Жильё рядом</span>
                  <strong>Место, где хочется жить</strong>
                  <p>
                    <Icon name="pin" size={13} />
                    Берава · 1,2 км
                  </p>
                </div>
                <span className="floating-heart">
                  <Icon name="heart" size={19} />
                </span>
              </div>
              <div className="floating-message">
                <span className="message-avatar">А</span>
                <div>
                  <strong>
                    Алексей <span>сейчас</span>
                  </strong>
                  <p>Привет! Да, байк ещё свободен 👋</p>
                </div>
              </div>
              <div className="big-pin">
                <Icon name="pin" size={44} />
              </div>
            </div>
          </div>
        </section>
        <div className="city-strip">
          <div className="container flex flex-wrap items-center justify-between gap-5">
            <span>Ближе, чем кажется</span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {cities.map((c) => (
                <a href="#locations" key={c.name}>
                  <Icon name="pin" size={17} />
                  {c.name}
                </a>
              ))}
            </div>
            <a href="#locations" className="strip-note !text-[12px]">
              Зона покрытия сервиса
            </a>
          </div>
        </div>
        <section id="discover" className="section container">
          <div className="section-heading">
            <div>
              <h2>Для жизни на новом месте</h2>
              <p>От ключей от дома до доски для первой волны.</p>
            </div>
          </div>
          {/* <div className="category-tabs" aria-label="Категории объявлений">
            {categories.map((c) => (
              <button
                key={c.title}
                className={category === c.title ? "active" : ""}
                aria-pressed={category === c.title}
                onClick={() => setCategory(c.title)}
              >
                <Icon name={c.icon} size={18} />
                {c.title}
              </button>
            ))}
          </div> */}
          <div className="listing-grid" aria-live="polite">
            {visibleListings.map((l) => (
              <article className="listing-card" key={l.id}>
                <div className="listing-photo">
                  <button
                    className="photo-link"
                    onClick={() => setSelected(l)}
                    aria-label={`Посмотреть: ${l.title}`}
                  >
                    <img
                      src={`/images/${l.image}.jpg`}
                      alt={l.title}
                      loading="lazy"
                    />
                  </button>
                  <span className="listing-tag">{l.category}</span>
                  <button
                    className={`save-button ${saved.includes(l.id) ? "is-saved" : ""}`}
                    aria-label={
                      saved.includes(l.id)
                        ? `Убрать из избранного: ${l.title}`
                        : `Сохранить: ${l.title}`
                    }
                    aria-pressed={saved.includes(l.id)}
                    onClick={() => toggleSaved(l.id)}
                  >
                    <Icon name="heart" size={20} />
                  </button>
                </div>
                <div className="listing-content">
                  <p className="listing-price">
                    {l.price} <span>{l.period}</span>
                  </p>
                  <button
                    className="listing-title"
                    onClick={() => setSelected(l)}
                  >
                    {l.title}
                  </button>
                  <p className="listing-place">
                    <Icon name="pin" size={15} />
                    {l.place}
                    <span>Бали</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="category-footnote">
            А ещё — работа, услуги, вещи для дома, одежда и всё, что нужно
            каждый день.
          </p>
        </section>
        <section id="how-it-works" className="how-section">
          <div className="container how-layout">
            <div className="how-intro">
              <span className="section-symbol">
                <Icon name="tractor" size={27} />
              </span>
              <h2>
                Автоматический сбор объявлений
                <br /> с площадок вашего города
              </h2>
              <p>
                Знакомый Telegram.
                <br />
                Более удобный способ находить.
              </p>
              <TelegramButton />
            </div>
            <div className="steps">
              {[
                {
                  title: "Выберите свой район",
                  text: "Бали или Бангкок, Чангу или Сукхумвит. Смотрите предложения там, где вы живёте.",
                  icon: "pin",
                },
                {
                  title: "Найдите то самое",
                  text: "Выберите категорию, задайте цену и сохраните понравившееся в избранное.",
                  icon: "search",
                },
                {
                  title: "Напишите человеку",
                  text: "Перейдите из объявления в личный чат. Задайте вопросы и договоритесь о встрече.",
                  icon: "send",
                },
              ].map((step, i) => (
                <div className="step" key={step.title}>
                  <span className="step-number">0{i + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <Icon name={step.icon as IconName} size={24} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="features-background">
          <div className="section container features-layout">
            <div>
              <h2>
                Меньше шума.
                <br />
                Больше полезного.
              </h2>
              <p className="section-description">
                Объявления не теряются в переписке.
                <br />
                Всё нужное собрано в одном месте.
              </p>
            </div>
            <div className="feature-list">
              <div>
                <Icon name="pin" />
                <h3>Сначала ваш район</h3>
                <p>
                  Место видно в каждом объявлении. Не нужно уточнять, где
                  находится продавец.
                </p>
              </div>
              <div>
                <Icon name="heart" />
                <h3>То, что понравилось, под рукой</h3>
                <p>
                  Сохраняйте объявления, чтобы сравнить варианты и вернуться к
                  ним позже.
                </p>
              </div>
              <div>
                <Icon name="message" />
                <h3>Общение напрямую</h3>
                <p>
                  Все вопросы — автору в Telegram. Знакомый чат вместо ещё
                  одного мессенджера.
                </p>
              </div>
              <div>
                <Icon name="bell" />
                <h3>Нужное найдётся — мы сообщим</h3>
                <p>
                  Укажите, что ищете, район и бюджет. Когда появится подходящее
                  объявление, бот пришлёт уведомление в Telegram.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section id="locations" className="container locations-section">
          <div className="locations-copy">
            <h2>
              Почувствуйте
              <br />
              себя местным.
            </h2>
            <p>
              Выберите город и посмотрите его районы.
              <br />
              Здесь начинается ваше «рядом».
            </p>
            <div className="city-buttons" aria-label="Города">
              {cities.map((c, i) => (
                <button
                  key={c.name}
                  aria-pressed={i === cityIndex}
                  className={i === cityIndex ? "active" : ""}
                  onClick={() => setCityIndex(i)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="location-preview" aria-live="polite">
            <div className="map-pattern" />
            <div className="map-pin map-pin-small">
              <Icon name="home" size={17} />
            </div>
            <div className="map-pin map-pin-main">
              <Icon name="pin" size={34} />
            </div>
            <div className="map-pin map-pin-second">
              <Icon name="bike" size={18} />
            </div>
            <div className="city-detail">
              <span>{city.country}</span>
              <h3>{city.name}</h3>
              <p>{city.districts.join(" · ")}</p>
              <small>{city.currency}</small>
            </div>
          </div>
        </section> */}

        <section id="locations" className="container location-cta">
          <div
            className="location-map-scroll"
            role="region"
            aria-label="Карта локаций с горизонтальной прокруткой"
            tabIndex={0}
          >
            <img
              className="location-map-image"
              src={MAP}
              alt="Карта локаций Classifieds: синие отметки — мы уже работаем, персиковые — скоро запускаемся"
            />
          </div>
          <p className="location-scroll-hint">Листайте карту влево и вправо</p>
          <ul className="location-legend" aria-label="Обозначения на карте">
            <li>
              <img src={locationActive} width={20} height={24} alt="" />
              <span>Мы уже работаем</span>
            </li>
            <li>
              <img src={locationSoon} width={20} height={24} alt="" />
              <span>Скоро запускаемся</span>
            </li>
          </ul>
        </section>
        <section
          className="section container faq-section"
          style={{ display: "none" }}
        >
          <div>
            <h2>
              Пара вопросов
              <br />
              перед знакомством
            </h2>
            <p className="section-description">
              Всё просто. Как и сам Classifieds.
            </p>
          </div>
          <div className="faq-list">
            {[
              [
                "Нужно устанавливать приложение?",
                "Нет. Classifieds открывается внутри Telegram как мини-приложение. Отдельное приложение скачивать не нужно.",
              ],
              [
                "Как разместить своё объявление?",
                "Откройте мини-приложение и нажмите «Подать». Выберите категорию, добавьте фото, укажите город и район, описание и цену.",
              ],
              [
                "В какой валюте указаны цены?",
                "В местной валюте выбранной страны: на Бали — индонезийские рупии, в Таиланде — баты, в Дубае — дирхамы.",
              ],
              [
                "Как связаться с автором объявления?",
                "В карточке объявления нажмите «Написать». Откроется личный чат с автором в Telegram.",
              ],
              [
                "Можно уже пользоваться сервисом?",
                "Сейчас доступна тестовая версия на демоданных. Объявления на этой странице — примеры, а кнопки ведут в тестового бота. Реальные публикации и серверные функции готовятся к запуску.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Icon name="plus" size={21} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="container final-cta">
          <div className="cta-icon">
            <img src={telegramIcon} alt="Telegram" width={40} height={40} />
          </div>
          <h2>
            Ваше новое «рядом»
            <br />
            уже в Telegram.
          </h2>
          <p>Найдите нужное. Предложите своё. Знакомьтесь с местными.</p>
          <TelegramButton />
          <span className="cta-note">
            Познакомьтесь с тестовой версией Classifieds
          </span>
        </section>
      </main>
      <footer className="container footer">
        <Logo />
        <div className="flex footer_item  gap-2">
          <a href="#how-it-works">Политика конфиденциальности</a>
          <a href="#how-it-works">Правила и условия</a>
          <a href="#how-it-works">Рекламодателям</a>
        </div>
        <span>© {new Date().getFullYear()} TWA Classifieds</span>
      </footer>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <dialog
            open
            className="listing-modal"
            aria-modal="true"
            aria-labelledby="listing-modal-title"
            ref={dialogRef}
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSelected(null);
              if (event.key === "Tab") {
                const focusable =
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    "button, a[href]",
                  );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (
                  event.shiftKey &&
                  (document.activeElement === first ||
                    document.activeElement === event.currentTarget)
                ) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Закрыть объявление"
              onClick={() => setSelected(null)}
            >
              <Icon name="close" />
            </button>
            <img src={`/images/${selected.image}.jpg`} alt={selected.title} />
            <div className="modal-content">
              <span className="demo-label">Демонстрационное объявление</span>
              <h2 id="listing-modal-title">{selected.title}</h2>
              <p className="listing-price">
                {selected.price} <span>{selected.period}</span>
              </p>
              <p>{selected.detail}</p>
              <TelegramButton>Открыть тестовую версию</TelegramButton>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
export default App;
