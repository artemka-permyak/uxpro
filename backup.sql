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
    images jsonb,
    ordinary_title character varying(255),
    ordinary_content jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    images_mosaic character varying(10),
    description text,
    "order" integer DEFAULT 0 NOT NULL,
    review text[],
    reviewer_name text,
    reviewer_photo text,
    reviewer_job_title text,
    CONSTRAINT blocks_images_mosaic_check CHECK (((images_mosaic)::text = ANY (ARRAY[('left'::character varying)::text, ('top'::character varying)::text])))
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
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blocks (id, project_id, type, title, content, images, ordinary_title, ordinary_content, created_at, updated_at, images_mosaic, description, "order", review, reviewer_name, reviewer_photo, reviewer_job_title) FROM stdin;
2	1	splitBlock	Сбор требований	\N	\N	\N	\N	2024-12-18 17:22:59.098137	2024-12-18 17:56:28.305134	\N	Встретились с заказчиком для обсуждения концепции. Определили самые важные требования, договорились о сроках, зафиксировали базовый набор фич для MVP	1	\N	\N	\N	\N
4	1	splitBlock	Проектирование	\N	["http://uxpro.ru/images/digital-profile/design-1.png", "http://uxpro.ru/images/digital-profile/design-2.png"]	\N	\N	2024-12-18 18:20:22.202733	2024-12-18 18:20:22.202733	\N	Интерфейс проектировали, исходя из потребностей родителей. Чтобы, посмотрев на экран, они сразу получили понятный и развёрнутый ответ на вопрос, как дела у ребёнка в школе	3	\N	\N	\N	\N
1	1	splitBlockDivided	Этапы работы	[{"title": "Сбор требований", "dedicatedDescription": "Интервью с заказчиком, анализ концепции, стейкхолдеры, функциональные требования"}, {"title": "Исследование", "dedicatedDescription": "Конкурентный анализ, поиск респондентов, анализ, дизайн исследования"}, {"title": "Проектирование", "dedicatedDescription": "Информационная архитектура, прототипы, UX–тексты"}, {"title": "Дизайн", "dedicatedDescription": "Концепция, макеты, UI–кит, контроль"}]	["http://uxpro.ru/images/digital-profile/stages-of-work-1.png", "http://uxpro.ru/images/digital-profile/stages-of-work-2.png", "http://uxpro.ru/images/digital-profile/stages-of-work-3.png"]	\N	\N	2024-12-18 16:36:39.720666	2024-12-18 17:46:49.669853	top	\N	0	\N	\N	\N	\N
6	1	splitBlock	Дизайн профиля ученика	\N	["http://uxpro.ru/images/digital-profile/student-profile-design-1.png", "http://uxpro.ru/images/digital-profile/student-profile-design-2.png", "http://uxpro.ru/images/digital-profile/student-profile-design-3.png"]	\N	\N	2024-12-18 19:21:40.030083	2024-12-18 19:21:40.030083	top	Мы показали успеваемость ребёнка так, чтобы родителю не пришлось что-то высчитывать или анализировать. Оценки, рейтинги, графики и цифры — все понятно с первого взгляда	5	\N	\N	\N	\N
9	1	author	Авторы	[{"name": "Сергей Мерзлов", "job_title": "Проектирование, UX/UI"}, {"name": "Артур Хестанов", "job_title": "Оформление кейса"}]	\N	\N	\N	2024-12-18 20:18:08.995136	2024-12-18 20:20:03.850504	\N	\N	8	\N	\N	\N	\N
3	1	splitBlock	Исследование	[{"smallTitle": "#интервью", "dedicatedDescription": ["«У меня из-за сильной занятости на работе нет времени особо вникать, какая успеваемость в школе. Хорошо, что у дочери не возникает проблем в учёбе»", "«Мы хотим поступить в МГУ, поэтому к образованию относимся серьёзно. Если где‑то появляются четвёрки, начинаем более усиленно заниматься с ребёнком»", "«Не следила, пока не узнала, что сын прогуливает уроки! Пропустил, перестал понимать темы, из-за этого стал пропускать ещё больше. Пришлось в итоге платить репетиторам, чтобы он хоть как‑то нагнал»", "«Была слишком занята личной жизнью, чтобы уделять достаточно внимания учёбе сына. Когда я наконец обратила внимание, оказалось, что он весь погряз в тройках»", "«У меня из-за сильной занятости на работе нет времени особо вникать, какая успеваемость в школе. Хорошо, что у дочери не возникает проблем в учёбе»", "«Текущие оценки не смотрю, но мне важно, как Алиса справляется с контрольными»"]}]	["http://uxpro.ru/images/digital-profile/study-1.png", "http://uxpro.ru/images/digital-profile/study-3.png", "http://uxpro.ru/images/digital-profile/study-2.png"]	\N	\N	2024-12-18 17:43:04.837064	2024-12-18 18:13:26.420377	left	Провели интервью с родителями школьников. Получили ответы на главные вопросы: как относятся к процессу школьного образования, на что обращают внимание, следят ли за успеваемостью	2	\N	\N	\N	\N
5	1	centeredBlock	В чём уникальность сервиса?	[{"title": "Метрики, которых больше нигде нет", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-1-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-1-4.png"], "description": "Из исследований мы выбрали показатели успеваемости, которые больше всего интересны родителям: средние баллы, количество пропущенных уроков, активность на занятиях и вовлечённость в учебный процесс"}, {"title": "Акцент на оценках за контрольные", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-2-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-2-4.png"], "description": "Родители также отмечали, что чаще смотрят на оценки за контрольные, чем на текущие"}, {"title": "Наглядность оценок за четверть", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-3-1.png"], "description": "Представлены в виде диаграмм. Сразу видна общая картина, легко определить, какие предметы нужно «подтянуть»"}, {"title": "Информирование о школьных мероприятиях", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-4-1.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-2.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-3.png", "http://uxpro.ru/images/digital-profile/uniqueness-4-4.png"], "description": "Родителям не нужно состоять в родительских чатах, чтобы узнавать о событиях в классе и школе"}, {"title": "Подсказки по учёбе", "images": ["http://uxpro.ru/images/digital-profile/uniqueness-5-1.png"], "description": "Полезная фича, которую мы предложили — «Помощник». Он анализирует успеваемость ребёнка, определяет его сильные стороны и подбирает курсы и мероприятия для их развития. Родителю останется только выбрать"}]	["http://uxpro.ru/images/digital-profile/uniqueness-footer.png"]	\N	\N	2024-12-18 18:53:45.807527	2024-12-18 19:16:13.102153	\N	\N	4	\N	\N	\N	\N
7	1	splitBlock	Дизайн профиля педагога	\N	\N	\N	\N	2024-12-18 19:26:36.860805	2024-12-18 19:26:36.860805	\N	Для педагогов продумали удобную систему электронных дневников с разбивкой по успеваемости каждого ученика, возможность вести профессиональное портфолио и загружать методические материалы для комфортной и продуктивной работы	6	\N	\N	\N	\N
8	1	review	\N	\N	\N	\N	\N	2024-12-18 19:36:43.557069	2024-12-18 19:36:43.557069	\N	\N	7	{"В процессе работы мы обсуждали концепцию профиля и дизайн-макетов интерфейса системы. Все наши пожелания были учтены, и результат нас полностью удовлетворил. Кроме того, Сергей со своей комадой работал быстро и качественно"}	Сергей Чернышев	http://uxpro.ru/images/digital-profile/reviewer-photo.png	Генеральный директор
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, title, description, publish_year, completed_works_titles, preview_image, preview_description, app_image, tags, created_at, updated_at) FROM stdin;
1	Цифровой профиль	{"Цифровой профиль снимает нагрузку с родителей школьников. Больше не нужно проверять тетради и дневники, высчитывать вероятные оценки за четверть — достаточно просто зайти в профиль","В нём собрана вся информация — успеваемость, посещаемость, статистика, достижения, события"}	2024	{Исследования,Проектирование,"Дизайн интерфейса",Дизайн-контроль}	https://uxpro.ru/images/digital-profile/app-image.png	Разработка личного кабинета	https://uxpro.ru/images/digital-profile/app-image.png	{Web,Mobile,Desktop,Образование,Платформа,Ученик,Учитель,Школа}	2024-12-12 21:25:32.21398	2024-12-12 21:25:32.21398
2	Profibonus	{"Разработка личного кабинета"}	2024	{Исследования}	https://uxpro.ru/images/profibonus/app-image.png	Разработка личного кабинета	https://uxpro.ru/images/profibonus/app-image.png	{Web}	2024-12-25 18:45:37.624012	2024-12-25 18:45:37.624012
3	Programmatica	{"Разработка личного кабинета"}	2024	{Исследования}	https://uxpro.ru/images/programmatica/app-image.png	Разработка личного кабинета	https://uxpro.ru/images/programmatica/app-image.png	{Web}	2024-12-25 18:45:39.425885	2024-12-25 18:45:39.425885
4	Jarvis	{"Разработка личного кабинета"}	2024	{Исследования}	https://uxpro.ru/images/jarvis/app-image.png	Разработка личного кабинета	https://uxpro.ru/images/jarvis/app-image.png	{Web}	2024-12-25 18:45:39.837841	2024-12-25 18:45:39.837841
\.


--
-- Name: blocks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blocks_id_seq', 9, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);


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

