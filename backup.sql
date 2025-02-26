--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocks (
    id integer NOT NULL,
    project_id integer NOT NULL,
    type character varying(50) NOT NULL,
    title character varying(255),
    content jsonb,
    ordinary_title character varying(255),
    ordinary_content jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description text[],
    "order" integer DEFAULT 0 NOT NULL,
    review text[],
    reviewer_name text,
    reviewer_photo text,
    reviewer_job_title text,
    media jsonb,
    dedicated_description text[],
    media_position text
);


ALTER TABLE public.blocks OWNER TO postgres;

--
-- Name: blocks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blocks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blocks_id_seq OWNER TO postgres;

--
-- Name: blocks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blocks_id_seq OWNED BY public.blocks.id;


--
-- Name: last_projects; Type: TABLE; Schema: public; Owner: artem
--

CREATE TABLE public.last_projects (
    id integer NOT NULL,
    is_nda boolean DEFAULT false,
    title text NOT NULL,
    direction text NOT NULL,
    deadline text NOT NULL,
    tags text[] NOT NULL,
    "position" integer NOT NULL,
    CONSTRAINT last_projects_position_check CHECK ((("position" >= 1) AND ("position" <= 6)))
);


ALTER TABLE public.last_projects OWNER TO artem;

--
-- Name: last_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: artem
--

CREATE SEQUENCE public.last_projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.last_projects_id_seq OWNER TO artem;

--
-- Name: last_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: artem
--

ALTER SEQUENCE public.last_projects_id_seq OWNED BY public.last_projects.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text[],
    publish_year character varying(255),
    completed_works_titles character varying[],
    preview_image text,
    preview_description text,
    app_image text,
    tags character varying[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: blocks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks ALTER COLUMN id SET DEFAULT nextval('public.blocks_id_seq'::regclass);


--
-- Name: last_projects id; Type: DEFAULT; Schema: public; Owner: artem
--

ALTER TABLE ONLY public.last_projects ALTER COLUMN id SET DEFAULT nextval('public.last_projects_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blocks (id, project_id, type, title, content, ordinary_title, ordinary_content, created_at, updated_at, description, "order", review, reviewer_name, reviewer_photo, reviewer_job_title, media, dedicated_description, media_position) FROM stdin;
9	1	author	Авторы	[{"name": "Сергей Мерзлов", "job_title": "Проектирование, UX/UI"}, {"name": "Артур Хестанов", "job_title": "Оформление кейса"}]	\N	\N	2024-12-18 20:18:08.995136	2024-12-18 20:20:03.850504	{NULL}	8	\N	\N	\N	\N	\N	\N	one-to-two
2	1	splitBlock	Сбор требований	\N	\N	\N	2024-12-18 17:22:59.098137	2024-12-18 17:56:28.305134	{"Встретились с заказчиком для обсуждения концепции. Определили самые важные требования, договорились о сроках, зафиксировали базовый набор фич для MVP"}	1	\N	\N	\N	\N	\N	\N	one-to-two
4	1	splitBlock	Проектирование	\N	\N	\N	2024-12-18 18:20:22.202733	2025-01-13 18:49:32.036147	{"Интерфейс проектировали, исходя из потребностей родителей. Чтобы, посмотрев на экран, они сразу получили понятный и развёрнутый ответ на вопрос, как дела у ребёнка в школе"}	3	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/digital-profile/design-1.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/design-2.png", "type": "image"}]	\N	one-to-one
8	1	review	\N	\N	\N	\N	2024-12-18 19:36:43.557069	2024-12-18 19:36:43.557069	{NULL}	7	{"В процессе работы мы обсуждали концепцию профиля и дизайн-макетов интерфейса системы. Все наши пожелания были учтены, и результат нас полностью удовлетворил. Кроме того, Сергей со своей комадой работал быстро и качественно"}	Сергей Чернышев	http://uxpro.ru/images/digital-profile/reviewer-photo.png	Генеральный директор	\N	\N	one-to-two
19	2	author	Авторы	[{"name": "Сергей Мерзлов", "job_title": "Проектирование, UX/UI"}, {"name": "Артур Хестанов", "job_title": "Оформление кейса"}]	\N	\N	2025-01-13 18:37:01.935089	2025-01-13 18:37:01.935089	\N	10	\N	\N	\N	\N	\N	\N	one-to-two
7	1	splitBlock	Дизайн профиля педагога	\N	\N	\N	2024-12-18 19:26:36.860805	2025-01-13 18:52:22.306509	{"Для педагогов продумали удобную систему электронных дневников с разбивкой по успеваемости каждого ученика, возможность вести профессиональное портфолио и загружать методические материалы для комфортной и продуктивной работы"}	6	\N	\N	\N	\N	[{"src": "https://uxpro.ru/images/digital-profile/teacher-profile-design-1.png", "type": "image"}]	\N	one-to-two
5	1	centeredBlock	В чём уникальность сервиса?	[{"title": "Метрики, которых больше нигде нет", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-1-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-4.png"], "description": "Из исследований мы выбрали показатели успеваемости, которые больше всего интересны родителям: средние баллы, количество пропущенных уроков, активность на занятиях и вовлечённость в учебный процесс"}, {"title": "Акцент на оценках за контрольные", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-2-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-4.png"], "description": "Родители также отмечали, что чаще смотрят на оценки за контрольные, чем на текущие"}, {"title": "Наглядность оценок за четверть", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-3-1.png"], "description": "Представлены в виде диаграмм. Сразу видна общая картина, легко определить, какие предметы нужно «подтянуть»"}, {"title": "Информирование о школьных мероприятиях", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-4-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-4.png"], "description": "Родителям не нужно состоять в родительских чатах, чтобы узнавать о событиях в классе и школе"}, {"title": "Подсказки по учёбе", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-5-1.png"], "description": "Полезная фича, которую мы предложили — «Помощник». Он анализирует успеваемость ребёнка, определяет его сильные стороны и подбирает курсы и мероприятия для их развития. Родителю останется только выбрать"}]	\N	\N	2024-12-18 18:53:45.807527	2024-12-18 19:16:13.102153	{NULL}	4	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/digital-profile/uniqueness-footer.png", "type": "image"}]	\N	one-to-two
1	1	splitBlockDivided	Этапы работы	[{"title": "Сбор требований", "dedicatedDescription": "Интервью с заказчиком, анализ концепции, стейкхолдеры, функциональные требования"}, {"title": "Исследование", "dedicatedDescription": "Конкурентный анализ, поиск респондентов, анализ, дизайн исследования"}, {"title": "Проектирование", "dedicatedDescription": "Информационная архитектура, прототипы, UX–тексты"}, {"title": "Дизайн", "dedicatedDescription": "Концепция, макеты, UI–кит, контроль"}]	\N	\N	2024-12-18 16:36:39.720666	2025-01-13 15:50:33.781943	{NULL}	0	\N	\N	\N	\N	[{"src": "http://uxpro.ru/video/digital-profile/stages-of-work.mp4", "type": "video", "poster": "http://uxpro.ru/images/digital-profile/stages-of-work-1.png"}, {"src": "http://uxpro.ru/images/digital-profile/stages-of-work-2.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/stages-of-work-3.png", "type": "image"}]	\N	one-to-two
6	1	splitBlock	Дизайн профиля ученика	\N	\N	\N	2024-12-18 19:21:40.030083	2024-12-18 19:21:40.030083	{"Мы показали успеваемость ребёнка так, чтобы родителю не пришлось что-то высчитывать или анализировать. Оценки, рейтинги, графики и цифры — все понятно с первого взгляда"}	5	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/digital-profile/student-profile-design-1.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/student-profile-design-2.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/student-profile-design-3.png", "type": "image"}]	\N	one-to-two
14	2	splitBlock	Моментальное зачисление баллов продавцу — сразу после продажи	\N	\N	\N	2025-01-13 18:14:09.164571	2025-01-13 18:15:46.505474	{"В приложении видно сколько баллов и за какую продукцию, акции и задачи они получены"}	5	\N	\N	\N	\N	[{"src": "https://uxpro.ru/images/profibonus/seller-points-1.png", "type": "image"}, {"src": "https://uxpro.ru/images/profibonus/seller-points-2.png", "type": "image"}, {"src": "https://uxpro.ru/images/profibonus/seller-points-3.png", "type": "image"}]	{}	one-to-two
11	2	splitBlockDivided	Этапы работы	[{"title": "Анализ", "dedicatedDescription": "Сбор информации, интервью, требования"}, {"title": "Проектирование", "dedicatedDescription": "Сборка флоу, информационная архитектура, прототипирование, UX-тексты"}, {"title": "Дизайн", "dedicatedDescription": "Концепция, макеты, UI–кит, дизайн-контроль"}]	\N	\N	2025-01-13 16:23:55.788642	2025-01-13 16:23:55.788642	\N	2	\N	\N	\N	\N	\N	\N	one-to-two
12	2	splitBlock	Поставщики	\N	\N	\N	2025-01-13 16:25:24.007324	2025-01-13 21:35:58.885259	{"Сервис спроектирован так, чтобы&nbsp;поставщик смог быстро оценить и&nbsp;проконтролировать сбыт. Всё&nbsp;движение товара в&nbsp;магазинах&nbsp;— перед&nbsp;глазами","Сразу видят ключевые метрики: активированные коды, статистику и&nbsp;динамику&nbsp;сбыта"}	3	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/profibonus/suppliers-1.png", "type": "image"}]	\N	one-to-two
13	2	splitBlock	Мы продумали очень простой механизм генерации QR-кодов	\N	\N	\N	2025-01-13 16:33:06.578546	2025-01-13 17:50:39.06144	\N	4	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/profibonus/qr-generation-1.png", "type": "image"}, {"src": "http://uxpro.ru/images/profibonus/qr-generation-2.png", "type": "image", "description": "Коды поставщиков"}, {"src": "http://uxpro.ru/images/profibonus/qr-generation-3.png", "type": "image", "description": "Баллы продавцов"}]	{"Поставщику остается только распечатать и наклеить их на товар. Продавцы при продаже сканируют QR-коды через приложение Profibonus"}	one-to-two
18	2	review	\N	\N	\N	\N	2025-01-13 18:30:09.874215	2025-01-13 18:30:09.874215	\N	9	{"Благодаря большой работе, которую проделала команда UxPRO, программой так просто и удобно пользоваться!","Дальнейший текст уже не имеет значения, потому что не сможет передать как квалификация и опыт, чёткая организация процесса и грамотное взаимодействие Сергея с командой разработки привели к созданию такого продуманного и современного продукта как Profibonus"}	Павел Щелманов	\N	Руководитель проекта	\N	\N	one-to-two
3	1	splitBlock	Исследование	[{"smallTitle": "#интервью", "dedicatedDescription": ["«У меня из-за сильной занятости на работе нет времени особо вникать, какая успеваемость в школе. Хорошо, что у дочери не возникает проблем в учёбе»", "«Мы хотим поступить в МГУ, поэтому к образованию относимся серьёзно. Если где‑то появляются четвёрки, начинаем более усиленно заниматься с ребёнком»", "«Не следила, пока не узнала, что сын прогуливает уроки! Пропустил, перестал понимать темы, из-за этого стал пропускать ещё больше. Пришлось в итоге платить репетиторам, чтобы он хоть как‑то нагнал»", "«Была слишком занята личной жизнью, чтобы уделять достаточно внимания учёбе сына. Когда я наконец обратила внимание, оказалось, что он весь погряз в тройках»", "«У меня из-за сильной занятости на работе нет времени особо вникать, какая успеваемость в школе. Хорошо, что у дочери не возникает проблем в учёбе»", "«Текущие оценки не смотрю, но мне важно, как Алиса справляется с контрольными»"]}]	\N	\N	2024-12-18 17:43:04.837064	2025-01-13 18:48:07.550044	{"Провели интервью с родителями школьников. Получили ответы на главные вопросы: как относятся к процессу школьного образования, на что обращают внимание, следят ли за успеваемостью"}	2	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/digital-profile/study-1.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/study-3.png", "type": "image"}, {"src": "http://uxpro.ru/images/digital-profile/study-2.png", "type": "image"}]	\N	horizontal-two-to-one
15	2	splitBlock	Мы проработали два механизма, чтобы поставщик мог поощрять продавцов баллами: акции и задачи	\N	\N	\N	2025-01-13 18:19:44.1788	2025-01-13 18:56:05.75451	\N	6	\N	\N	\N	\N	[{"src": "https://uxpro.ru/images/profibonus/promotions-and-tasks-1.png", "type": "image", "description": "Создает акцию или задачу"}, {"src": "https://uxpro.ru/images/profibonus/promotions-and-tasks-2.png", "type": "image", "description": "Переписка между поставщиком и продавцом — также в Profibonus"}, {"src": "https://uxpro.ru/images/profibonus/promotions-and-tasks-3.png", "type": "image", "description": "За выполнение  начисляются баллы"}, {"src": "https://uxpro.ru/images/profibonus/promotions-and-tasks-4.png", "type": "image"}]	\N	one-to-two
16	2	splitBlock	Продавцы	\N	\N	\N	2025-01-13 18:23:32.90762	2025-01-13 18:57:20.003684	{"Сервис спроектирован так, чтобы продавцы могли легко активировать QR-коды, следить за акциями и выполнять задачи, зарабатывая бонусы и обменивая их на деньги или сертификаты"}	7	\N	\N	\N	\N	[{"src": "https://uxpro.ru/images/profibonus/sellers-1.png", "type": "image", "description": "Баллы — это деньги"}, {"src": "https://uxpro.ru/images/profibonus/sellers-2.png", "type": "image", "description": "Баллы — это сертификаты"}]	\N	two-to-two
17	2	splitBlock	Web & App	\N	\N	\N	2025-01-13 18:25:01.885495	2025-01-13 18:59:24.164089	{"Веб-версия, адаптивы для всех разрешений, приложения для обеих ролей"}	8	\N	\N	\N	\N	[{"src": "https://uxpro.ru/images/profibonus/web-app-1.png", "type": "image"}, {"src": "https://uxpro.ru/images/profibonus/web-app-2.png", "type": "image"}]	\N	one-to-one
10	2	splitBlock	Постановка задачи	[{"title": "Проблемы", "dedicatedDescription": ["Мы реализовали несколько похожих проектов управления лояльностью. Из анализа и исследований знаем, что у продавцов вызывает трудность процесс активации QR-кодов. Особенно, если их сразу несколько или они плохо считываются. Также возникают сложности с выводом накопленных баллов. Поставщикам не хватает детальной статистики по расходам денежных средств и активации кодов. Нет инструмента быстрого информирования продавцов об актуальных акциях и бонусах за их выполнение"]}, {"title": "Результат", "dedicatedDescription": ["Мы объединили в одном сервисе все механики взаимодействия поставщиков и продавцов, придумали удобный и «воздушный» дизайн. Сервис доступен на всех платформах и устройствах — разработали Web- и App-версии. Ниже расскажем, как всё работает"]}, {"statistics": [{"title": "1005", "description": "Экранов"}, {"title": "7", "description": "Месяцев"}, {"title": "732", "description": "Часа"}]}]	\N	\N	2025-01-13 16:16:15.884377	2025-01-13 19:42:21.146845	{}	1	\N	\N	\N	\N	[{"src": "http://uxpro.ru/images/profibonus/stages-of-work-1.png", "type": "image"}]	{"Нужен сервис, который объединит поставщиков и продавцов, упростит их коммуникацию и позволит быстро приходить к общему результату — увеличению продаж","Поставщикам важно получить инструмент, с помощью которого можно следить за статистикой сбыта по регионам, поощрять продавцов за высокие показатели продаж, запуская акции и ставя задачи. А продавцам — монетизировать свои профессиональные компетенции и конвертировать бонусы в деньги"}	one-to-two
\.


--
-- Data for Name: last_projects; Type: TABLE DATA; Schema: public; Owner: artem
--

COPY public.last_projects (id, is_nda, title, direction, deadline, tags, "position") FROM stdin;
2	t	Сервис по ведению внешней экономической деятельности	ВЭД	5 месяцев	{Проектирование,UX/UI}	2
4	t	Мобильное приложение для модулей хранения	Startup	2 недели	{Проектирование}	4
5	t	Корпоративный HR-сервис	HRM-система	2 месяца	{Проектирование,UX/UI}	5
6	f	Рефакторинг системы лояльности	Сервис	3 месяца	{Исследование,Проектирование,UX/UI}	6
1	t	Сервис транспортной телематики	Телематика	3 месяца	{Исследование,Проектирование,UX/UI}	1
3	f	Сервис декларирования и прохождения таможенных процедур	ВЭД	5 месяцев	{Исследование,Проектирование,UX/UI}	3
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, publish_year, completed_works_titles, preview_image, preview_description, app_image, tags, created_at, updated_at) FROM stdin;
1	Цифровой профиль	{"Цифровой профиль снимает нагрузку с родителей школьников. Больше не нужно проверять тетради и дневники, высчитывать вероятные оценки за четверть — достаточно просто зайти в профиль","В нём собрана вся информация — успеваемость, посещаемость, статистика, достижения, события"}	2024	{Исследования,Проектирование,"Дизайн интерфейса",Дизайн-контроль}	https://uxpro.ru/images/digital-profile/app-image.png	Цифровой профиль ученика и педагога средней школы	https://uxpro.ru/images/digital-profile/app-image.png	{Web,Mobile,Desktop,Образование,Платформа,Ученик,Учитель,Школа}	2024-12-12 21:25:32.21398	2024-12-12 21:25:32.21398
3	Programmatica	{"Разработка личного кабинета"}	2024	{Исследования}	https://uxpro.ru/images/programmatica/app-image.png	Платформа для ведения рекламных кампаний	https://uxpro.ru/images/programmatica/app-image.png	{Web}	2024-12-25 18:45:39.425885	2024-12-25 18:45:39.425885
4	Jarvis	{"Разработка личного кабинета"}	2024	{Исследования}	https://uxpro.ru/images/jarvis/app-image.png	Сервис для разработчиков компьютерных игр	https://uxpro.ru/images/jarvis/app-image.png	{Web}	2024-12-25 18:45:39.837841	2024-12-25 18:45:39.837841
2	Profibonus	{"Сервис управления продажами в реальном времени, где можно влиять на мотивацию продавцов и следить за динамикой продаж"}	2024	{Анализ,Проектирование,"Дизайн интерфейса",Дизайн-контроль}	https://uxpro.ru/images/profibonus/preview-image.png	Сервис управления продажами в реальном времени	https://uxpro.ru/images/profibonus/app-image.png	{Web,App,Mobile,Desktop,Лояльность,SaaS,Платформа,Продажи}	2024-12-25 18:45:37.624012	2024-12-25 18:45:37.624012
\.


--
-- Name: blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blocks_id_seq', 20, false);


--
-- Name: last_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: artem
--

SELECT pg_catalog.setval('public.last_projects_id_seq', 6, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 5, false);


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);


--
-- Name: last_projects last_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: artem
--

ALTER TABLE ONLY public.last_projects
    ADD CONSTRAINT last_projects_pkey PRIMARY KEY (id);


--
-- Name: last_projects last_projects_position_key; Type: CONSTRAINT; Schema: public; Owner: artem
--

ALTER TABLE ONLY public.last_projects
    ADD CONSTRAINT last_projects_position_key UNIQUE ("position");


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: blocks blocks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: TABLE projects; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.projects TO PUBLIC;


--
-- PostgreSQL database dump complete
--

